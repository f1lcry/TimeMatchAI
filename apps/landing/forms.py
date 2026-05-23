"""LeadRequest form — used in CTA + dedicated POST endpoint."""
from django import forms
from django.utils.translation import gettext_lazy as _

from .models import LeadRequest


class LeadRequestForm(forms.ModelForm):
    class Meta:
        model = LeadRequest
        fields = ["name", "email", "university", "role", "message"]
        widgets = {
            "name": forms.TextInput(attrs={
                "placeholder": _("Имя и фамилия"),
                "autocomplete": "name",
            }),
            "email": forms.EmailInput(attrs={
                "placeholder": _("you@university.edu"),
                "autocomplete": "email",
            }),
            "university": forms.TextInput(attrs={
                "placeholder": _("НИУ ВШЭ"),
                "autocomplete": "organization",
            }),
            "message": forms.Textarea(attrs={
                "placeholder": _("Кратко: масштаб (число студентов / факультетов), горизонт пилота"),
                "rows": 4,
            }),
        }
