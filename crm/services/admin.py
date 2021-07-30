"""Admin Services."""

# Django
from django.contrib import admin

# Models
from crm.services.models import Service, Category, Valoration

class ValorationAdmin(admin.ModelAdmin):
    list_display=('id','service', 'duration', 'price', 'get_duration')
    

admin.site.register(Service)
admin.site.register(Category)
admin.site.register(Valoration, ValorationAdmin)
