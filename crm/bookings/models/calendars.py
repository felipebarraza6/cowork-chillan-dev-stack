"""Calendars Model."""

# Django
from django.db import models

# Utils
from crm.utils.models import ApiModel

class Calendar(ApiModel):

    name = models.CharField(max_length=30)

    service = models.ForeignKey("services.Service", verbose_name=("calendar_service"), on_delete=models.CASCADE)

    descripcion = models.TextField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.name

