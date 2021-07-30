"""Category Model."""
 
# Django
from django.db import models

# Utils
from crm.utils.models import ApiModel

class Category(ApiModel, models.Model):
    # Fiels category model

    name = models.CharField(max_length=20, blank=False, null=False)

    description = models.TextField(max_length=250, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


