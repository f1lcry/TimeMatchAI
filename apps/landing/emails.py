"""Sales-team notification for new leads."""
from django.conf import settings
from django.core.mail import EmailMessage


def notify_sales(lead) -> None:
    subject = f"[TimeMatch] Новая заявка · {lead.university} · {lead.name}"
    body = (
        f"Имя: {lead.name}\n"
        f"Email: {lead.email}\n"
        f"Университет: {lead.university}\n"
        f"Роль: {lead.get_role_display()}\n"
        f"Сообщение:\n{lead.message or '—'}\n"
        f"\nЗарегистрирована: {lead.created_at:%Y-%m-%d %H:%M %Z}"
    )
    EmailMessage(
        subject=subject,
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.SALES_EMAIL],
        reply_to=[lead.email],
    ).send(fail_silently=True)
