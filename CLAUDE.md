# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Product context

**TimeMatch** is an AI-driven class-scheduling product for universities (B2B/B2G EdTech, site: time-match.tech). The pitch is up to 5× lower operating cost for scheduling vs in-house ERPs / Excel, plus flexibility for student-teacher constraints. HSE University is the anchor partner. Six-person founding team; this repo is the engineering track.

The repository is the **technical demo** that backs the sales pitch deck — not a production system. MVP-first, prototype over PRD.

## Repository scope

One Django project, three deliverables sharing models, auth, and database:

1. **Landing** (`apps/landing`) — public marketing site + lead-capture form for universities. Routes a `LeadRequest` row plus a notification to the sales contact.
2. **Demo client cabinet** (`apps/directory`, `apps/scheduler`, `apps/ai_chat`) — tenant-scoped product instance shown to prospective university clients. Reference data + scheduling UI + AI assistant.
3. **Scheduler POC + AI chat** — see "Hard invariants" below.

See `docs/architecture.md` for the canonical layout.

## Hard invariants (do not regress)

- **Multi-tenancy from day one.** Every domain model (`Group`, `Teacher`, `Room`, `Course`, `Schedule`, …) carries an `Organization` FK. Querysets always filter by the request user's organization. Never introduce a model that is "global by default" without explicit discussion.
- **AI chat is read-only and tool-mediated.** The LLM never executes raw SQL. It calls a whitelisted set of Python functions (`get_schedule`, `get_room_availability`, `get_teacher_load`, …) which apply tenant filters internally. This is a security boundary the demo will be judged on.
- **Scheduler ships in phases.** Phase 1 = data model + manual entry + conflict detection. Phase 2 = rule-based mutations ("move class X to day Y, validate"). Phase 3 = constraint-solver optimisation (OR-Tools or similar). Do not promise Phase 3 features in earlier phases.

## Toolchain

- **Language / runtime:** Python 3.13 (from `.idea/misc.xml`)
- **Framework (planned):** Django 5.x
- **IDE:** JetBrains PyCharm

**Design system (landed).** Bundle from Claude Design lives in `design/` (Daniel Popov). Source of truth:

- `design/project/README.md` — brand voice, content rules, visual foundations, motion, iconography
- `design/project/colors_and_type.css` — all color + type tokens as CSS custom properties; import into any built HTML
- `design/project/assets/` — logos, favicon, grid pattern SVGs
- `design/project/preview/` — one HTML preview per concept (colors, type, spacing, buttons, cards, schedule cells, motion, …)
- `design/project/ui_kits/marketing/` — high-fidelity landing recreation (`index.html` + React JSX components)

Do not invent new colors, type scales, or hand-roll a CSS framework — extend from these tokens. The fonts (Instrument Serif, Geist, Geist Mono) load from Google Fonts at runtime via the CSS `@import`.

Pending choices (confirm with user before scaffolding):

- Package manager: `uv` vs `poetry` vs `pip` + `requirements.txt`
- Landing implementation: port the JSX components to Django templates (keep single-stack), or serve `ui_kits/marketing/index-standalone.html` as a static page from Django, or split a Next.js front-end. The design system was authored in React JSX — this is the main trade-off
- LLM provider for the AI chat: Anthropic vs OpenAI vs local

## Commands

To be added once `pyproject.toml` / `requirements.txt` lands. Expected categories: env setup, install/sync, run, test (full + single), lint/format/type-check.

## Notes for future Claude sessions

- The pitch-deck context (team, problem stats, B2B model) lives in memory under `project-timematch-overview` and `user-role-timematch`. Read those if missing context on TimeMatch the company.
- This is a startup repo, not a class project — treat scope decisions accordingly, but remember the code itself is MVP / demo grade.
- When in doubt about scope of a new feature, ask which of the three deliverables it belongs to.
- `.idea/` is partially tracked (project SDK config); leave it that way unless asked.
- For TZ / spec-shaped documents inside `docs/`, use the user's spec convention (dashes + linebreaks, no headers/bullets/bold). Regular docs files (this one, README, architecture.md) use proper markdown.
