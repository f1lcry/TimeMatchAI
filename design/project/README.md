# TimeMatch Design System

> Visual system, brand guidelines and UI kit for **TimeMatch** — the AI-powered class scheduling platform for universities.

---

## 1. Company context

**TimeMatch** (time-match.tech) is an AI-powered class scheduling platform built for higher education. It ingests teacher availability, classroom capacity, curriculum requirements and student preferences, and automatically produces an optimized, conflict-free timetable. Universities save up to **5× on the administrative cost** of scheduling and gain a living, re-solvable timetable that adapts as constraints change.

- **Category:** EdTech, B2B / B2G SaaS
- **Buyers:** University administrators, deans, provosts, registrars, IT decision-makers
- **Users:** Schedulers, department coordinators (operators); faculty + students (consumers of the output)
- **Product surface in scope for this system:** the **marketing landing page** at time-match.tech

### Sources

No design files, codebase or brand assets were supplied with this project. The system below was authored from a written brief:

> *TimeMatch — AI-powered class scheduling platform for universities. It analyzes teacher availability, classrooms, curriculum and student preferences to build optimized, flexible timetables automatically, cutting administrative scheduling costs by up to 5×. B2B/B2G EdTech product. This design system is for our marketing landing page (time-match.tech).*

The visual direction, colors, typography and components are original work. If the company has any existing logo, brand assets or color preferences, this system should be reconciled against them as a next step.

---

## 2. Brand at a glance

**Personality.** Considered, calm, quietly impressive. The product runs on AI but the brand doesn't shout about it — it shows competence the way an established institution does. A peer to enterprise infrastructure brands (Stripe, Linear, Vercel) and academic publishers (university presses, JSTOR) — *not* a SaaS startup wearing a cape.

**One-line voice promise.** *Scheduling, solved.* The grid does the talking.

**Visual hook.** The timetable grid is the hero motif. Hairline columns and rows, occasional cells filled with the **Citron** accent — like a highlighter swept across a printed schedule. Everything else recedes.

---

## 3. Index

This is the manifest of the system. Each path is relative to the project root.

| Path | What it is |
|------|-----------|
| `README.md` | This file. Brand context, content + visual + iconography rules. |
| `SKILL.md` | Cross-compatible skill entry point — use this when this folder is dropped into Claude Code. |
| `colors_and_type.css` | All color + type tokens as CSS custom properties. Import this into any HTML you build. |
| `fonts/` | Webfont link references. Fonts load from Google Fonts at runtime; see notes below. |
| `assets/` | Logos (full mark, monogram), favicon, brand patterns. |
| `preview/` | Design-system preview cards rendered in the Design System tab. One concept per file. |
| `ui_kits/marketing/` | High-fidelity recreation of the time-match.tech landing page. `index.html` is the demo, `*.jsx` are the components. |

---

## 4. Content fundamentals

### Voice

Calm, declarative, evidence-led. TimeMatch is a serious instrument for a serious problem. We don't oversell, we don't hype, we don't gush about AI. We **state the outcome**, then show the work.

- **Confident, not loud.** "Scheduling, solved." beats "Revolutionize your timetable!"
- **Specific over vague.** "Cuts scheduling administration by up to 5×" beats "Save tons of time."
- **Plain English over jargon.** No "synergy", no "leverage", no "robust solution". Say what it does.
- **Composed, not casual.** This is enterprise B2B/B2G. No "Hey there 👋", no winking, no exclamation marks (one per page, max, and only if earned).
- **Academic register, lightly worn.** We can use words like *cohort, registrar, provost, term, schedule* — the buyer's vocabulary.

### Pronouns and address

- **"You"** for the customer / the institution. ("Your timetable, ready before the term begins.")
- **"We"** for TimeMatch sparingly, when explaining the company itself. The product is the subject of most sentences, not the company.
- Avoid "our". Prefer "the platform", "TimeMatch", or naming the feature.

### Casing

- **Sentence case** everywhere. Buttons, nav items, headings, eyebrows.
  - ✅ `Request a demo`  ✅ `How it works`
  - ❌ `Request A Demo`  ❌ `HOW IT WORKS`
- **One exception:** mono-set **eyebrow labels** above sections are UPPERCASE with wide tracking. They are a typographic device, not a heading. (`PLATFORM`, `FOR REGISTRARS`.)
- The brand is **TimeMatch** (one word, camel-cased). Never *Time Match*, *Timematch* or *TIMEMATCH*.

### Numerals

- **Always numerals for measurable claims.** "5×", "98%", "12 weeks", "300 rooms". Not "five times".
- **Tabular figures** wherever numbers compare (stat blocks, pricing tables) — `font-variant-numeric: tabular-nums`.
- Use the **multiplication sign** `×` not the letter "x". (`5×`, not `5x`.)

### Punctuation

- **No exclamation marks.**
- **En dashes** for ranges (`9 – 17`), **em dashes** for parenthetical asides — set with spaces on both sides, like this.
- **Curly quotes** in prose (`"`, `"`), **straight quotes** in code.
- **Oxford comma**.

### Specimen copy

> **Hero (good):** *Scheduling, solved.* TimeMatch builds optimized university timetables in hours, not months — across every department, room and constraint.
>
> **Hero (avoid):** *Revolutionize your scheduling with AI! 🚀* The world's most powerful timetabling solution, built for the future of education.

> **Feature copy (good):** *Re-solves overnight.* When a room closes or a faculty member's availability changes, the timetable adapts before morning.
>
> **Feature copy (avoid):** *Lightning-fast & flexible!* Our cutting-edge engine handles any change instantly.

### Emoji

**Not used.** Anywhere. The brand is editorial-academic; emoji read as marketing slop in this register.

### Things we don't say

- "AI-powered" as a tagline (we *show* the AI; we don't lead with the buzzword)
- "Game-changer", "revolutionary", "next-gen", "world-class"
- "Empower", "unlock", "supercharge"
- "Solution" as a noun for the product (it's a *platform*)

---

## 5. Visual foundations

### Color

A three-anchor system:

1. **Ink** (`#0B1426`) — near-black navy. Primary text, dark surfaces, the wordmark. Not pure black — it reads as **printed ink on paper**, the right reference for an academic brand.
2. **Paper** (`#F6F2EA`) — warm ivory. Primary surface. Crucially **not pure white** — the warmth is what separates this brand from generic SaaS.
3. **Citron** (`#D9F23E`) — electric chartreuse. The signature accent: **the "match" in TimeMatch.** A highlighter swept across a printed schedule. Use **sparingly** — one CTA per view, one highlight per diagram. If citron is everywhere it stops meaning anything.

Supporting accents (**Lilac, Coral, Sage, Sky**) are *not* brand colors. They exist so a schedule UI can render *Chemistry 101* in one color and *Linear Algebra* in another. Don't reach for them for buttons, links or borders.

### Typography

A two-family pairing — chosen to evoke a university press combined with a precision instrument:

- **Instrument Serif** for hero display type. Editorial, warm, slightly literary. Used at large sizes only (≥ 40 px). Set tightly: `letter-spacing: -0.02em`, leading 1.05–1.1.
- **Geist** for everything else — headings, body, UI. Modern technical grotesk, narrow, even color on the page. Body at 16 px, leading 1.45–1.6.
- **Geist Mono** for numerical data, schedule cells, eyebrows, code. Tabular figures by default.

Hierarchy lives in **size and weight**, not color. Never set headings in citron. Headings are ink. Period.

### Spacing & layout

- **4 px base unit.** Tokens go `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- **The timetable grid is the layout system.** Sections snap to a 12-column grid; max content width is 1200 px; full-bleed only for the grid pattern itself.
- **Hairline rules do the work of separators.** 1 px borders in `--tm-paper-300`. Avoid background fill changes to separate sections — let the hairline carry it.
- **Generous vertical rhythm.** Section padding is `var(--tm-space-9)` (96 px) on desktop. Density is for the schedule UI, not the landing page.

### Backgrounds

- **Default:** flat paper (`--tm-paper-50`). No gradient.
- **Brand pattern:** the **grid pattern** (`assets/grid-pattern.svg`) — 56 px square tile, 1 px hairline. Use behind the hero, behind diagrams, as a quiet substrate. **Not** behind body copy (it interferes with reading).
- **Dark sections** invert to `--tm-ink-900` with `grid-pattern-dark.svg`. Use at most one dark section per page.
- **No mesh gradients, no animated gradients, no purple-to-pink AI clichés, no glassmorphism, no bokeh.** The brand reads as ink on paper.

### Imagery

- **Photography (if used):** color-corrected to a warm, slightly desaturated key. Architectural photos of university campuses, library interiors, lecture halls — *the buildings*, not stock photos of "diverse students smiling at laptops". Subtle film grain optional, never glossy.
- **No illustrations.** No mascots, no isometric scenes, no spot illos. The product UI itself is the illustration.
- **Product screenshots are heroes.** Frame them in `--tm-border` (1 px hairline) with `--tm-shadow-md`. Never tilt at perspective angles, never float in space with a glow.

### Borders & radii

- **Hairline-first.** A 1 px `--tm-border` solves 90% of separator and container needs.
- **Restrained radii.** `--tm-radius-sm: 4px` for inputs/buttons, `--tm-radius-md: 6px` for cards, `--tm-radius-lg: 10px` for hero containers. Never above 12 px. Pills only for status badges. No fully-rounded "soft" UI.
- **The grid is square.** Schedule cells have **no radius**. The grid itself never softens.

### Shadows / elevation

Whisper-quiet, layered. Hairlines do most of the structural work; shadows only lift things that genuinely float (popovers, modals, the floating product screenshot in the hero).

- `--tm-shadow-xs` / `-sm` — cards on paper
- `--tm-shadow-md` — hovering product UI
- `--tm-shadow-lg` — modals, command palette overlay
- **No colored shadows. No glows.** All shadows are tinted ink with low alpha.

### Hover, press & focus

- **Hover (primary buttons):** background → `--tm-accent-hover` (darker citron). No translate, no scale.
- **Hover (secondary / ghost):** border darkens to `--tm-fg`, background tint of `--tm-paper-200`.
- **Hover (links):** underline darkens from `--tm-border-strong` to `--tm-fg`. No color change.
- **Press:** `transform: translateY(1px)` and a slight darken. Never shrink — buttons aren't soft.
- **Focus:** a 2 px `--tm-ink-900` outline at 2 px offset. Always visible, never `outline: none`.

### Transparency & blur

Used **only** in two places:
1. The **sticky header** when scrolled: `backdrop-filter: blur(12px) saturate(140%)` over `rgba(251, 249, 244, 0.85)`.
2. The **command palette overlay** scrim: `rgba(11, 20, 38, 0.4)` with `backdrop-filter: blur(2px)`.

Otherwise — opaque. We're not a frosted-glass brand.

### Motion

Restrained, purposeful, quick.

- **Durations:** `--tm-dur-fast` 120 ms (hover, focus), `--tm-dur-base` 200 ms (state changes), `--tm-dur-slow` 360 ms (entry of large elements).
- **Easing:** `--tm-ease-out` for entry, `--tm-ease` for symmetric transitions. Never linear, never bouncy, never overshoot.
- **No bounces. No springs. No floating particles. No looping animations.** A timetable doesn't wiggle.
- The **one signature motion** is the *schedule re-solve*: cells gently transpose from one column to another on a 360 ms ease-out. Used on the hero diagram, sparingly.

### Cards

- 1 px `--tm-border` hairline
- `--tm-radius-md` (6 px)
- `--tm-paper-100` surface (a half-step warmer than the page background)
- `--tm-shadow-xs` resting; `--tm-shadow-sm` on hover (if interactive)
- Padding: `var(--tm-space-5)` (24 px) minimum, `var(--tm-space-6)` (32 px) for hero cards

### Layout rules

- **Sticky:** the global header (top), with backdrop blur when scrolled past 8 px.
- **Fixed:** nothing else. No floating chat widgets, no "we use cookies" banners with shadows.
- **Container:** `max-width: 1200px`, horizontal padding `var(--tm-space-6)` on desktop, `var(--tm-space-5)` on tablet, `var(--tm-space-4)` on mobile.

---

## 6. Iconography

### Approach

**Single sourced, single weight, single stroke.** Icons are a typographic supporting element — they read as part of the type, not as illustrations.

- **Library:** [**Lucide**](https://lucide.dev) — open-source, MIT, 1.5 px stroke, 24 px viewBox. Used via CDN: `<script src="https://unpkg.com/lucide@latest"></script>` then `<i data-lucide="calendar"></i>` + `lucide.createIcons()`.
- **Why Lucide:** straight, geometric, no flourishes. Pairs with Geist precisely.
- **Substitution note:** since no icon system was supplied with the brief, Lucide is a *default*. If the engineering team prefers Heroicons (also 1.5 px, also free) or a paid set, the swap is straightforward — only `ui_kits/marketing/index.html` references icons.
- **Sizing:** `16 px` inline with body, `20 px` in buttons, `24 px` in feature blocks. Stroke stays 1.5 px at all sizes (don't scale stroke).
- **Color:** matches the surrounding text color (`currentColor`). **Never** colored fills, never gradient, never duotone.

### Reserved uses

- Icons appear in **navigation**, **buttons** (preceding the label, 8 px gap), **feature lists**, and **inline status indicators** in the schedule UI.
- Icons do **not** appear in **headings** or **body prose**. The serif display does not pair with iconography.

### Emoji

**Never.** Not in product, not in copy, not in error messages, not in marketing.

### Unicode glyphs

- **Math symbols are welcome** when semantically right: `×` (multiplication, used in claims like "5×"), `→` (in CTAs and inline arrows), `·` (separator). Set in Geist, not in an emoji font.
- **Currency, percentages, degrees:** standard Unicode, no special treatment.

### Logo

Two assets in `assets/`:

- **`logo.svg`** — monogram + wordmark, ink on paper. The default.
- **`logo-inverse.svg`** — for use on `--tm-ink-900` surfaces. Identical layout, paper-colored stroke and text.
- **`monogram.svg`** — square 64 × 64 mark, used in tight spaces (favicon, app icons, social avatars).
- **`favicon.svg`** — monogram inverted on an ink-filled rounded square.

**Clear space:** at least the height of the monogram on every side.
**Minimum size:** 80 px wide for the full wordmark, 24 px for the monogram alone.
**Never:** rotate, recolor, gradient-fill, drop-shadow, stretch, place on a busy photo without a scrim.

