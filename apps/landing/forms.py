"""LeadRequest form — validation only.

Labels and placeholders are rendered by the template via `{% c "form.*" %}`,
so the form itself stays minimal. Server-side errors fall back to Django's
default validator messages.
"""
from django import forms

from .models import LeadRequest


class LeadRequestForm(forms.ModelForm):
    class Meta:
        model = LeadRequest
        fields = ["name", "email", "university", "role", "message"]
