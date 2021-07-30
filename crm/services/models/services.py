"""Services Models."""

# Django
from django.db import models

# Utils
from crm.utils.models import ApiModel

# Models
from .categories import Category

class Service(ApiModel, models.Model):

    name = models.CharField(max_length=25, blank=False, null=False)
    
    description = models.TextField(max_length=200, blank=True, null=True)    
    category = models.ForeignKey('Category', verbose_name="service_category", on_delete=models.PROTECT, null=True, blank=True)
    

    is_active = models.BooleanField(
        'active',
        default=True
    )

    def __str__(self):
        return self.name

