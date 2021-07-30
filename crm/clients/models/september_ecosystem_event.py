from django.db import models
from crm.utils.models import ApiModel


class SignedUp(ApiModel):

    age = models.IntegerField()
    commune = models.CharField(max_length=400)
    email = models.CharField(max_length=600)
    enterprise = models.CharField(max_length=600)
    gender = models.CharField(max_length=600)
    name = models.CharField(max_length=600)
    ocupation = models.CharField(max_length=600)
    participation = models.CharField(max_length=600)
    phone = models.CharField(max_length=600)
    turn = models.CharField(max_length=600)
    
    
    def __str__(self):
        return str(self.email)