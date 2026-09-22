"""Backend tests for FORTIA SYSTEMS contact API."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Read frontend .env fallback
    from pathlib import Path
    env = Path("/app/frontend/.env").read_text()
    for line in env.splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip()
            break
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
def test_root_online(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "online" in data["message"].lower()


# ---------- Contact CREATE ----------
def test_create_contact_success(client):
    payload = {
        "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
        "company": "Fortia Test Co",
        "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
        "reason": "Cotizar proyecto",
        "message": "Hola, este es un mensaje de prueba con contenido suficiente.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "created_at" in data
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["reason"] == payload["reason"]
    assert data["message"] == payload["message"]
    assert data["company"] == payload["company"]


def test_create_contact_empty_company_allowed(client):
    payload = {
        "name": f"TEST_NoCo_{uuid.uuid4().hex[:6]}",
        "company": "",
        "email": f"noco_{uuid.uuid4().hex[:6]}@example.com",
        "reason": "Información general",
        "message": "Mensaje sin empresa.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    assert r.json()["company"] == ""


# ---------- Validation ----------
def test_create_contact_invalid_email(client):
    payload = {
        "name": "TEST_BadEmail",
        "email": "not-an-email",
        "reason": "Consultoría técnica",
        "message": "Mensaje suficiente aquí.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_create_contact_missing_email(client):
    payload = {
        "name": "TEST_NoEmail",
        "reason": "Consultoría técnica",
        "message": "Mensaje suficiente aquí.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_create_contact_short_message(client):
    payload = {
        "name": "TEST_Short",
        "email": "short@example.com",
        "reason": "Soporte técnico",
        "message": "hi",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_create_contact_missing_name(client):
    payload = {
        "email": "noname@example.com",
        "reason": "Soporte técnico",
        "message": "Mensaje válido aquí.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


def test_create_contact_missing_reason(client):
    payload = {
        "name": "TEST_NoReason",
        "email": "noreason@example.com",
        "message": "Mensaje válido aquí.",
    }
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


# ---------- LIST ----------
def test_list_contacts_includes_new_and_sorted(client):
    unique_name = f"TEST_Sorted_{uuid.uuid4().hex[:8]}"
    payload = {
        "name": unique_name,
        "company": "SortCo",
        "email": f"sort_{uuid.uuid4().hex[:6]}@example.com",
        "reason": "Alianzas estratégicas",
        "message": "Verificar orden de listados.",
    }
    create = client.post(f"{API}/contact", json=payload)
    assert create.status_code == 200
    created_id = create.json()["id"]

    r = client.get(f"{API}/contact")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list) and len(items) > 0

    # Newly created should be present
    ids = [it["id"] for it in items]
    assert created_id in ids

    # Newest first: our created should be at or near top; verify first item is >= others by created_at
    from datetime import datetime
    parsed = []
    for it in items[:5]:
        ca = it["created_at"]
        try:
            parsed.append(datetime.fromisoformat(ca.replace("Z", "+00:00")))
        except Exception:
            parsed.append(datetime.fromisoformat(ca))
    for i in range(len(parsed) - 1):
        assert parsed[i] >= parsed[i + 1], "list_contacts is not sorted newest first"
