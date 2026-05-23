from django.contrib import admin

from .models import LeadRequest


@admin.register(LeadRequest)
class LeadRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "university", "role", "email", "created_at")
    list_filter = ("role", "created_at")
    search_fields = ("name", "email", "university", "message")
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)
