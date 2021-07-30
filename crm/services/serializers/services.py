"""Categories Serializer."""

import timedelta
import datetime


# Django
from django.conf import settings

# Django Rest Framework
from rest_framework import serializers

# Models
from crm.services.models import Category, Service, Valoration


class ServiceModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = '__all__'

class CategoryModelSerializer(serializers.ModelSerializer):
    """Category Serializer."""

    class Meta:

        model = Category
        fields = (
            'id',
            'name',
            'description'
        )

class ListServiceModelSerializer(serializers.ModelSerializer):

    valorations = serializers.SerializerMethodField('get_valorations')
    category = CategoryModelSerializer(many=False)
    def get_valorations(self, service):
        qs = Valoration.objects.filter(is_avaible=True, service=service)
        serializer = ValorationModelSerializer(instance=qs, many=True)
        return serializer.data    

    class Meta:

        model = Service
        fields = (
            'id',
            'name',
            'description',
            'category',
            'is_active', 
            'valorations'
        )


class ValorationModelSerializer(serializers.ModelSerializer):
   
    duration = serializers.DurationField()  

    class Meta:
        model = Valoration
        fields = (
            'id',
            'service',
            'get_service',            
            'note',
            'price',
            'duration',
            'is_avaible',
            'is_contract',
            'used_by_membership'
        )

    
