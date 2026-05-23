"""Landing routes."""
from django.urls import path

from . import views

app_name = "landing"

urlpatterns = [
    path("", views.home, name="home"),
    path("lead/", views.lead_create, name="lead_create"),
    path("lead/thanks/", views.lead_success, name="lead_success"),
    path("privacy/", views.privacy, name="privacy"),
]
