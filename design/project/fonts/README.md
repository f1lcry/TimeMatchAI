# Fonts

This system loads fonts from **Google Fonts** at runtime via the `@import` at the top of `colors_and_type.css`. No font files are stored locally.

| Role | Family | Source | Substitution? |
|------|--------|--------|--------------|
| Display | **Instrument Serif** | Google Fonts | — chosen as primary |
| Body / UI | **Geist** | Google Fonts | — chosen as primary |
| Mono / data | **Geist Mono** | Google Fonts | — chosen as primary |

> **Note to client:** these families were selected from scratch as no existing brand fonts were supplied. If TimeMatch has licensed brand fonts (e.g. a custom grotesk, an academic serif), please share the files and we will swap them in here — both the `@import` in `colors_and_type.css` and the `--tm-font-*` variables would update.
