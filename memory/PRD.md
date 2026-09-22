# FORTIA SYSTEMS — PRD

## Problem statement
FORTIA SYSTEMS es la entidad legal registrada, matriz/administradora de la marca comercial acxor.com y de todo su portafolio de marcas de software. Se requiere un sitio corporativo multi-página premium con formulario de contacto.

## Architecture / tasks done (2026-06)
- Stack: React (CRA) + FastAPI + MongoDB.
- Multi-page site: Inicio (/), Nosotros (/nosotros), Marcas (/marcas), Contacto (/contacto).
- Motion stack: framer-motion (scroll reveals, masked hero, layout nav underline), lenis (smooth scroll), react-fast-marquee (editorial ribbon).
- Design: Dark Swiss/brutalist tech, Outfit/Manrope/JetBrains Mono, accent #ff3b30, grain overlay, bento portfolio grid, numbered manifesto.
- Backend: POST /api/contact (validated, EmailStr, stored in `contacts`), GET /api/contact (list newest-first). Legacy /api/status retained.
- Contact email across site: contact@fortiasystems.com.mx.

## User personas
- Founders/operadores buscando socio de ingeniería senior.
- Prospectos evaluando el portafolio (FlexPei, CallMarket, Mastiket, FluxiPay, MasMesa, MisTrámites, ActivMedios, Masaldo).

## Core requirements (static)
- Corporate presence, brand portfolio showcase, working contact form.

## Implemented (grows over time)
- 2026-06: Full MVP — 4 pages, animated hero, stats, capabilities, manifesto, marquee, 8-brand bento portfolio, contact form (persisted). Tested 100% (backend 9/9, frontend core flows).

## Backlog / remaining
- P1: Email notification on contact submission (Resend integration).
- P2: Admin view to read submissions; per-brand detail pages; blog/insights; i18n EN.
