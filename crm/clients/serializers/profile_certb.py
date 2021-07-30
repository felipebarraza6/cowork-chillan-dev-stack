# Django Rest Framework
from rest_framework import serializers

# Models 
from crm.clients.models import ProfileCertb


class ProfileCertbModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileCertb
        fields = '__all__'