"""Businnes Model."""

# Django
from django.db import models
from django.core.validators import RegexValidator
# Utlities
from crm.utils.models import ApiModel


class Business(ApiModel):    
    
    business_name = models.CharField(max_length=70, blank=False, null=False)
    dni_business = models.CharField(max_length=12, blank=False, null=False, unique=True)
    business_heading = models.CharField(max_length=120, blank=True, null=True)
    turn = models.TextField(max_length=500, blank=True, null=True)

    address = models.CharField(max_length=200, blank=True, null=True)

    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +9999999. Up to 15 digits allowed."
    )

    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True, null=True)

    email = models.EmailField('email address', unique=True, null=True, blank=True)

    region = models.CharField(max_length=100, blank=True, null=True)
    commune = models.CharField(max_length=100, blank=True, null=True)
    province = models.CharField(max_length=100, blank=True, null=True)

    webpage = models.URLField(max_length=120, blank=True, null=True)

    work_area = models.CharField(max_length=130, blank=True, null=True)

    represent_legal = models.ManyToManyField('clients.Client',
            related_name='client_represent',blank=True)

    is_recive_mentories = models.BooleanField('Recive mentories', default=False)

    is_digital = models.BooleanField('Digital', default=False)

    is_active = models.BooleanField('Active', default=True)        
    
    def name_represent(self):

        full_name = '{} {} {}'.format(
            self.represent_legal.first_name,
            self.represent_legal.surname, 
            self.represent_legal.second_surname
        )

        return full_name

    def dni_represent(self):
        dni = self.represent_legal.dni
        return dni

    def gender_represent(self):
        gender = self.represent_legal.gender
        return gender

    def region_represent(self):
        region = self.represent_legal.region
        return region
    
    def province_represent(self):
        province = self.represent_legal.province
        return province

    def email_represent(self):
        email = self.represent_legal.email
        return email
    
    def phone_represent(self):
        phone = self.phone_number
        return phone
    

    def is_recive_mentories_str(self):
        is_recive_mentories=''

        if(self.is_recive_mentories==True):
            is_recive_mentories= 'SI'
        else:
            is_recive_mentories= 'NO'
        
        return is_recive_mentories

    def is_active_str(self):
        is_active=''

        if(self.is_active==True):
            is_active='SI'
        else:
            is_active='NO'
        
        return is_active

    def __str__(self):
        return self.dni_business


    class Meta:        
        verbose_name = 'Business'
        verbose_name_plural = 'Business'
        ordering = ['-id']
    
class BusinessClients(models.Model):
    client = models.ForeignKey('clients.Client', on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
