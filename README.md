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

Early scaffold. Bootstrap decisions (package manager, design-system integration, LLM provider) are pending — see "Open decisions" in `docs/architecture.md`.

## Toolchain (current)

- **Language / runtime:** Python 3.13
- **Framework (planned):** Django 5.x
- **IDE:** JetBrains PyCharm (`.idea/` partially tracked)

Commands, dependency manifest, and CI to be added once the stack is confirmed.

## Team

TimeMatch is built by six co-founders: Daniel Potekhin, Daniel Popov, Andrey Frizen, Kira Nikitina, Mikhail Sheikin, Philipp Smirnov (engineering / web). This repo is owned by the engineering track.
