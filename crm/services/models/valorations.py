"""Prices Models."""

# Django 
from django.db import models
import timedelta
import datetime

# Utils
from crm.utils.models import ApiModel

# Models 
from crm.services.models.services import Service

class Valoration(ApiModel, models.Model):

    service = models.ForeignKey('Service', related_name='service_prices', on_delete=models.CASCADE)
    
    price = models.IntegerField(default=0, blank=False, null=False)

    note = models.TextField(max_length=200, blank=True, null=True)

    # Duration One
    oneYear = datetime.timedelta(days=365)
    oneHour = datetime.timedelta(hours=1)
    oneDay = datetime.timedelta(days=1)
    oneMonth = datetime.timedelta(days=30)
    
    # Semestral and Trimestral
    sixMonth = datetime.timedelta(days=182.5)
    trheeMonth = datetime.timedelta(days=90)

    choices =  [     
        (oneYear, 'year'),
        (oneHour, 'hour'),
        (oneDay, 'day'),
        (oneMonth, 'month'),
        (sixMonth, 'semestral'),
        (trheeMonth, 'trimestral'),
    ]
 
    duration = models.DurationField(choices=choices)
    

    is_avaible = models.BooleanField(
        'avaible',
        default=True
    )

    is_contract = models.BooleanField(
        'contract',
        default=True
    )

    used_by_membership = models.BooleanField(
        'used membership',
        default=False
    )

    def __str__(self):
        return str(self.id)

    def get_duration(self):
        return str(self.duration)

    def get_format_valoration(self):        
        return ('{}{}').format(self.service, self.duration)

    def get_service(self):
        return self.service.name

    
