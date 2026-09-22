"""Emergent managed email (Resend) — send owner notifications for contact submissions.
Recipients and templates are server-side only; caller never supplies markup or address (G4).
"""
import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

logger = logging.getLogger(__name__)

# Emergent managed email proxy. CONSTANT — never read from env so it survives deployment.
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "FORTIA SYSTEMS")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    email_key = os.environ.get("EMERGENT_EMAIL_KEY")
    from_name = os.environ.get("EMAIL_FROM_NAME", "FORTIA SYSTEMS")
    reply = reply_to or os.environ.get("EMAIL_REPLY_TO")
    if not email_key:
        raise RuntimeError("EMERGENT_EMAIL_KEY not configured")
    payload = {"to": [to], "subject": subject, "html": html, "from_name": from_name}
    if reply:
        payload["contact_email"] = reply
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": email_key},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def build_contact_notification(*, name: str, company: str, email: str, reason: str, message: str) -> str:
    company_row = (
        f'<tr><td style="padding:4px 0;color:#71717a;font-size:13px">Empresa</td>'
        f'<td style="padding:4px 0;color:#ffffff;font-size:13px">{escape(company)}</td></tr>'
        if company else ""
    )
    return (
        f'<table role="presentation" width="100%" style="background:#050505;padding:0;margin:0">'
        f'<tr><td align="center" style="padding:24px">'
        f'<table role="presentation" width="600" style="max-width:600px;background:#0f0f11;'
        f'border:1px solid rgba(255,255,255,0.1)">'
        f'<tr><td style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.1)">'
        f'<span style="color:#ff3b30;font-family:Arial,sans-serif;font-size:12px;'
        f'letter-spacing:2px;text-transform:uppercase">FORTIA SYSTEMS</span>'
        f'<div style="color:#ffffff;font-family:Arial,sans-serif;font-size:22px;'
        f'font-weight:bold;margin-top:8px">Nuevo mensaje de contacto</div></td></tr>'
        f'<tr><td style="padding:28px 32px;font-family:Arial,sans-serif">'
        f'<table role="presentation" width="100%">'
        f'<tr><td style="padding:4px 0;color:#71717a;font-size:13px;width:110px">Nombre</td>'
        f'<td style="padding:4px 0;color:#ffffff;font-size:13px">{escape(name)}</td></tr>'
        f'{company_row}'
        f'<tr><td style="padding:4px 0;color:#71717a;font-size:13px">Email</td>'
        f'<td style="padding:4px 0;color:#ffffff;font-size:13px">{escape(email)}</td></tr>'
        f'<tr><td style="padding:4px 0;color:#71717a;font-size:13px">Motivo</td>'
        f'<td style="padding:4px 0;color:#ffffff;font-size:13px">{escape(reason)}</td></tr>'
        f'</table>'
        f'<div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1)">'
        f'<div style="color:#71717a;font-size:13px;margin-bottom:8px">Mensaje</div>'
        f'<div style="color:#e4e4e7;font-size:14px;line-height:1.6;white-space:pre-wrap">'
        f'{escape(message)}</div></div></td></tr>'
        f'<tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.1)">'
        f'<span style="color:#52525b;font-family:Arial,sans-serif;font-size:12px">'
        f'Enviado desde el formulario de contacto de FORTIA SYSTEMS. '
        f'Nunca pedimos contraseñas ni datos de tarjeta por email.</span></td></tr>'
        f'</table></td></tr></table>'
    )
