# TimeMatchAI

Engineering monorepo for **TimeMatch** — an AI-driven class-scheduling product for higher education (B2B/B2G EdTech). Public site: [time-match.tech](https://time-match.tech).

This repository is the technical counterpart to the sales pitch deck: where investors and pilot universities can click through what we actually build.

## Repository scope

Three deliverables sit in one Django project, sharing models, auth, and the database:

1. **Landing** — public marketing site for universities, with a lead-capture form that routes prospects to the TimeMatch sales contact.
2. **Demo client cabinet** — tenant-scoped admin product shown to prospective university clients. Reference-data modules (groups, teachers, rooms, courses) over a real Django backend.
3. **Scheduler POC + AI chat** — schedule data model with conflict detection, rule-based mutations, and (later) a constraint-solver. A read-only AI assistant lets users ask natural-language questions against their own organisation's data.

See [`docs/architecture.md`](docs/architecture.md) for the layout, hard invariants, and phased plan.

## Status

Landing scaffold landed: Django 5 + uv + esbuild bundle for React islands (Hero schedule, AI chat). Three pages live: `/` (RU landing), `/en/` (EN), `/privacy/`. Lead form posts to `LeadRequest`, sends a `console.EmailBackend` notification in dev.

## Toolchain

- **Runtime:** Python 3.13 (pinned via `.python-version`; package manager: `uv`)
- **Framework:** Django 5.2
- **Front-end:** vanilla CSS over design tokens + React islands bundled by `esbuild` (no Babel-in-browser)
- **IDE:** JetBrains PyCharm (`.idea/` partially tracked)

## Local development

Prereqs: `uv`, `node ≥ 20`, system GNU `gettext` for i18n (`sudo apt install gettext`).

```bash
# Python deps + venv
uv sync

# Front-end deps + initial bundle
npm install
npm run build           # one-off; or `npm run watch` while editing JSX

# DB + run
uv run python manage.py migrate
uv run python manage.py runserver
# → open http://localhost:8000/   (RU)
# → open http://localhost:8000/en/ (EN, once .po is compiled)
```

Translation workflow (after `gettext` is installed):

```bash
uv run python manage.py makemessages -l en -l ru --ignore static --ignore node_modules --ignore design --ignore .venv
# edit apps/landing/locale/{ru,en}/LC_MESSAGES/django.po
uv run python manage.py compilemessages
```

Admin: `uv run python manage.py createsuperuser`, then `http://localhost:8000/admin/landing/leadrequest/`.

## Team

TimeMatch is built by six co-founders: Daniel Potekhin, Daniel Popov, Andrey Frizen, Kira Nikitina, Mikhail Sheikin, Philipp Smirnov (engineering / web). This repo is owned by the engineering track.
