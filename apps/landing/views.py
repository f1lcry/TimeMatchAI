"""Landing views — home, lead form, success, privacy."""
from django.http import HttpResponse
from django.shortcuts import redirect, render

from .forms import LeadRequestForm
from .emails import notify_sales


def home(request):
    form = LeadRequestForm()
    return render(request, "landing/home.html", {"form": form})


def lead_create(request):
    if request.method != "POST":
        return redirect("landing:home")
    form = LeadRequestForm(request.POST)
    if not form.is_valid():
        return render(request, "landing/home.html", {"form": form, "form_errors": True}, status=400)
    lead = form.save()
    notify_sales(lead)
    return redirect("landing:lead_success")


def lead_success(request):
    return render(request, "landing/lead_success.html")


def privacy(request):
    return render(request, "landing/privacy.html")
