"""
`{% c "key" %}` — pull a string from apps.landing.copy.COPY for the active locale.

We bypass Django gettext deliberately:
- The landing has ~150 hand-authored strings; a Python dict is more readable
  than two .po files for that scale.
- It works without a system `gettext` binary (msguniq/msgfmt).
- Lets technical terms (CRM, AI, API, LMS, SIS) stay in English on both
  locales by hard-coding them in each string variant.

`{% c %}` returns HTML-safe text — the source dict is trusted (no user input).
"""
from django import template
from django.utils.safestring import mark_safe

from apps.landing.copy import COPY

register = template.Library()


@register.simple_tag(takes_context=True)
def c(context, key, **kwargs):
    locale = (context.get("LANGUAGE_CODE") or "ru").split("-")[0]
    entry = COPY.get(key)
    if entry is None:
        return mark_safe(f"<mark style='background:#ffb;color:#900'>⟨missing: {key}⟩</mark>")
    text = entry.get(locale) or entry.get("en") or entry.get("ru") or ""
    if kwargs:
        try:
            text = text.format(**kwargs)
        except (KeyError, IndexError):
            pass
    return mark_safe(text)
