"""Landing models — lead capture only.

No `organization` FK: leads exist before tenant onboarding. The product cabinet
(`apps.directory`, `apps.scheduler`) carries the multi-tenancy invariant; the
landing is intentionally global.
"""
from django.db import models
from django.utils.translation import gettext_lazy as _


class LeadRequest(models.Model):
    class Role(models.TextChoices):
        REGISTRAR = "registrar", _("Регистратор / учебный офис")
        DEAN = "dean", _("Декан / проректор")
        IT = "it", _("ИТ / интеграции")
        OTHER = "other", _("Другое")

    name = models.CharField(_("Имя"), max_length=120)
    email = models.EmailField(_("Email"))
    university = models.CharField(_("Университет"), max_length=200)
    role = models.CharField(_("Роль"), max_length=32, choices=Role.choices, default=Role.OTHER)
    message = models.TextField(_("Сообщение"), blank=True)
    created_at = models.DateTimeField(_("Дата заявки"), auto_now_add=True)

    class Meta:
        verbose_name = _("Заявка с лендинга")
        verbose_name_plural = _("Заявки с лендинга")
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} · {self.university} ({self.email})"
