"""Clients Abstract Model."""

# Django
from django.db import models
from django.core.validators import RegexValidator
from django.template.defaultfilters import slugify

# Utitiles
from crm.utils.models import ApiModel

# Models
from .business import Business


class Client(ApiModel):

    first_name = models.CharField(max_length=20, blank=False)
    surname = models.CharField(max_length=20, blank=False)
    fantasy_name = models.CharField(max_length=120, blank=True, null= True)
    second_surname = models.CharField(max_length=20, blank=True, null=True)
    dni = models.CharField(max_length=12, blank=False, null=False, unique=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +9999999. Up to 15 digits allowed."
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)
    email = models.EmailField('email address', unique=True, blank=True, null=True)
    region = models.CharField(max_length=100, blank=True, null=True)
    commune = models.CharField(max_length=100, blank=True, null=True)
    province = models.CharField(max_length=100, blank=True, null=True)
    business_heading = models.CharField(max_length=40, blank=True, null=True)
    turn = models.TextField(max_length=200, blank=True, null=True)
    webpage = models.URLField(max_length=120, blank=True, null=True)
    work_area = models.CharField(max_length=130, blank=True, null=True)
    is_recive_mentories = models.BooleanField('Recive mentories', default=False)
    is_client = models.BooleanField(
        'client',
         default = True
    )
    is_active = models.BooleanField(
        'is active',
        default = True
    )
    is_natural_person = models.BooleanField(
        'natural person',
        default=False
    )
    is_legal_represent = models.BooleanField(
        'legal represent',
        default=False
    )

    def is_recive_mentories_str(self):
        is_recive_mentories = ''
        if(self.is_recive_mentories==True):
            is_recive_mentories = 'SI'
        else:
            is_recive_mentories = 'NO'

        return is_recive_mentories

    def is_client_str(self):
        is_client = ''
        if(self.is_client==True):
            is_client= 'SI'
        else:
            is_client= 'NO'

        return is_client

    def enterprise_represent(self):
        enterprise = Business.objects.filter(represent_legal=self.id)
        business_name = enterprise[0].business_name
        return business_name

    def __str__(self):
        return self.dni

    





