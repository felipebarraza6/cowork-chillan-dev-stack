"""Profile model."""

#Django
from django.db import models

#Utilities
from crm.utils.models import ApiModel

class Profile(ApiModel):
    """

        Modelo de perfil

        El modelo de perfil extendera la informacion de usuario,
        como biografia, cargo de trabjo, imagen de perfil y estadisticas

    """

    user = models.OneToOneField('users.User', on_delete=models.CASCADE)

    dni = models.CharField(max_length=12, blank=True, null=True)

    birthday = models.DateField(blank=True, null=True)

    picture = models.ImageField(
        'profile picture',
        upload_to='users/pictures',
        blank=True,
        null=True
    )
    
    biography = models.TextField(max_length=500, blank=True, null=True)

    workload = models.CharField(max_length=50, blank=True, null=True)

    address = models.CharField(max_length=200, blank=True, null=True)

    is_employee = models.BooleanField(
        'employee',
         default=True,
         
    )

    is_internal = models.BooleanField(
        'internal',
         default=False,
    )

    def __str__(self):
        return("{}{}".format("@", str(self.user)))


