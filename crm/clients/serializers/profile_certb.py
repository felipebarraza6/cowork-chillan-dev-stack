# Django Rest Framework
from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
# Models 
from crm.clients.models import ProfileCertb, ServiceRequests


class ProfileCertbModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileCertb
        fields = '__all__'
        
class ServiceRequestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequests
        fields = '__all__'

    def validate(self, validated_data):        
        send_mail('Solicitud de servicios ',
            ('Usuario: {} \nNombre: {} \nEmail: {} \Telefono: {} \nMensaje: {} \nServicios: {}').
                format(validated_data['username'], validated_data['name'], 
                       validated_data['email'], validated_data['phone'],
                       validated_data['message'], validated_data['services_list']), settings.DEFAULT_FROM_EMAIL, (settings.DEFAULT_FROM_EMAIL,))
        return validated_data
