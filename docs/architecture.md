# Architecture

This document captures the **intended shape** of the TimeMatchAI repo. The repo is currently a scaffold — most of what is described below has yet to be implemented. The architecture is held intentionally lightweight so MVP iteration stays fast.

## Goal

One Django project that ships three deliverables in a shared codebase, shared database, and shared auth:

1. Public landing for universities (marketing + lead capture).
2. Tenant-scoped product cabinet (demo for prospective university clients).
3. Scheduler engine + AI chat with read-only DB access.

A single project is chosen over per-deliverable services because: the deliverables share a user/organization model, the demo lives inside the product surface (not a separate app), and "ощутимый бэкенд" is part of the engineering goal.

## Apps layout

```
TimeMatchAI/
├── manage.py
├── config/                     # Django project (settings/urls/wsgi/asgi)
│   └── settings/{base,dev,prod}.py
├── apps/
│   ├── core/                   # User, Organization, multi-tenancy mixins, base templates
│   ├── landing/                # public site, LeadRequest, contact form
│   ├── directory/              # reference data: Group, Teacher, Room, Course, Department
│   ├── scheduler/              # Schedule, ScheduleEntry, conflict detection, mutations, (later) solver
│   └── ai_chat/                # LLM session, message log, tool registry
├── templates/                  # shared base templates
├── static/                     # tokens + assets pulled / copied from design/
├── design/                     # Claude Design handoff bundle — read-only source of truth
│   ├── README.md               # how to read the bundle
│   ├── chats/                  # transcripts that show intent behind the system
│   └── project/                # tokens, assets, previews, ui_kits/marketing/
├── tests/
└── docs/
    ├── architecture.md         # this file
    └── decisions/              # ADRs (added when non-trivial choices are made)
```

App responsibilities are summarised in the next section. Cross-app imports go through `core` for shared models; no scheduler→landing or directory→ai_chat imports.

### App responsibilities

- **core** — `User` (custom), `Organization`, `Membership` (user↔org with role), tenant-scoping mixin/middleware, shared base templates and layout chrome.
- **landing** — anonymous-facing pages (home, product, team, contact), `LeadRequest` model, contact form view. No tenant context; not part of the product cabinet.
- **directory** — reference data inside an `Organization`: `Department`, `Group`, `Teacher`, `Room`, `Course`. All FK to `Organization`. Plain CRUD via Django admin + a few custom views.
- **scheduler** — the actual product. See "Scheduler in phases" below.
- **ai_chat** — chat UI, `ChatSession` and `ChatMessage` models, a tool registry. The LLM is given a small set of read-only Python functions (the tools); function-calling resolves user questions like "Как построено расписание для второго потока 3 курса в ноябре?".

## Hard invariants

Three things that are easy to skip in an MVP and painful to retrofit:

### 1. Multi-tenancy from day one

Every domain model (anything in `directory`, `scheduler`, `ai_chat`) carries `organization = ForeignKey(Organization, on_delete=CASCADE)`. A custom manager / queryset mixin in `core` filters by the request user's organization automatically. Tenant leakage is the worst failure mode for a B2B EdTech product — universities will not trust a tool that has ever shown the wrong data to the wrong school.

### 2. AI chat is read-only and tool-mediated

The LLM never sees the database directly and never executes raw SQL. It is given a registry of Python functions (`get_schedule(group_id, date_range)`, `get_room_availability(room_id, date)`, `get_teacher_load(teacher_id, week)`, …). Each tool function:

- enforces the caller's `organization` filter,
- returns serialisable data only,
- is unit-testable in isolation from the LLM.

This is both a security and a demoability claim — "the assistant can only see your own data, and only what you'd see in the UI".

### 3. Scheduler ships in phases

Do not promise solver-grade optimisation in the first iteration. Three phases, each a usable demo:

- Phase 1 — data model, manual entry, conflict detection (room double-booking, teacher overlap, student group clash).
- Phase 2 — rule-based mutations: "move class X from Mon 10:00 to Tue 14:00" → validate, list conflicts, commit or reject. This is the operationally most useful surface for administrators.
- Phase 3 — constraint-solver generation (OR-Tools or similar) with soft preferences (teacher availability, no-windows-for-students, room capacity).

Each phase has visible deliverable value; the AI chat from `ai_chat` can already cover Phase 1 data the moment Phase 1 is in.

## Open decisions

Tracked here until resolved; ADRs land in `docs/decisions/` when decided. Style of this section per user spec convention.

- design system (LANDED)
- `design/` from Claude Design (Daniel Popov) — tokens, brand guide, JSX UI kit, preview HTML
- source of truth: `design/project/colors_and_type.css` (tokens) + `design/project/README.md` (brand)
- do not invent new colors / type scales — extend from tokens
- landing implementation (OPEN — main trade-off)
- option A: port JSX components in `design/project/ui_kits/marketing/` to Django templates (single stack, keeps "ощутимый бэкенд" intact, requires re-implementation)
- option B: serve `design/project/ui_kits/marketing/index-standalone.html` directly via Django staticfiles + a Django-rendered lead form mounted in (fastest path, lowest port effort)
- option C: split a Next.js front-end for landing only, Django for product cabinet (matches the JSX source 1:1, but multi-stack)
- recommendation: start with B, escalate to A if the lead form / dynamic blocks grow
- package manager
- uv vs poetry vs pip + requirements.txt
- defer until first dependency lands; `uv` is the leading candidate (speed, lockfile)
- LLM provider for ai_chat
- candidates: Anthropic (Claude), OpenAI, a local LLaMA the user already runs
- selection criteria: function-calling quality, Russian-language grounding, demo cost
- deployment target
- not yet decided; out of scope until Phase 1 of scheduler ships
- database
- SQLite for very early iterations, PostgreSQL once we cross multi-tenancy boundaries

## Phase plan

Rough sequencing. Not commitments — re-ordered as priorities shift.

```
[bootstrap]      pyproject + Django project + apps skeleton + base auth
       │
       ├─► [landing]   pages + LeadRequest + admin email notification
       │
       ├─► [core]      Organization + Membership + tenant middleware
       │
       ├─► [directory] models + admin + minimal forms
       │
       ├─► [scheduler] Phase 1: models + conflict detection
       │       │
       │       └─► Phase 2: rule-based mutations
       │
       └─► [ai_chat]   chat surface + 3-4 read-only tools wired to directory + scheduler
```

After Phase 1 of scheduler + Phase 0 of ai_chat is in, the demo is presentable to a prospective university client.

## Things this architecture deliberately is NOT

- not a microservice split (one Django project, one DB)
- not a SaaS billing engine — universities pay via contract, not self-serve checkout
- not a student-facing app (this repo is admin/operator UX, students are downstream consumers of the generated schedule)
- not the production codebase — once a paying pilot is signed, a hardened fork or rewrite is expected
