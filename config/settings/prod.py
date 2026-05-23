"""Production settings — placeholder, hardened when first deployment lands."""
from .base import *  # noqa: F401,F403

DEBUG = False

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
