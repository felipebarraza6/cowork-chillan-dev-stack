""" Utilidades para los modelos que se crearan en el proyecto."""

#Django 
from django.db import models

class ApiModel(models.Model):
    """
        Modelo abastracto que se utilizara en todos los modelos para 
        utilizare los siguientes atributos:
        + created(DateTime): Creacion en nuestro Store
        + modified(DateTime): Modificacion en nuestro Store

    """

    created = models.DateTimeField(
        'created at',
        auto_now_add=True,
        help_text='Date time on wich the object was created.'
    )

    modified = models.DateTimeField(
        'modified at',
        auto_now_add=True,
        help_text='Date time on wich the object was last modified.'
    )

    class Meta:
        """Abstraccion del modelo"""
        abstract=True,
        get_latest_by='created',
        ordering=['-created', '-modified']