"""Clients serializers."""

# Django
from django.conf import settings
from django.core.validators import RegexValidator

# Django Rest Framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.mail import send_mail



# Serializers
from crm.clients.serializers.business import BusinessModelSerializer
from crm.clients.serializers.profile_certb import ProfileCertbModelSerializer

# Models 
from crm.clients.models import Client, Business, ProfileCertb, SignedUp
from crm.users.models import User

class SignedUpModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignedUp
        fields = '__all__'
    
    def validate(self, validated_data):
        #send_mail('Pensando en nuestro ecosistema de emprendimiento ',
        #    ('¡Hola! {}, tu inscripcion fue realizada exitosamente!').
        #        format(validated_data['name']), settings.DEFAULT_FROM_EMAIL, [validated_data['email']])
        return validated_data
    
class ReportLegalRepresentSrializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = (
            'first_name',
            'surname',
            'second_surname',
            'dni',
            'phone_number',
            'email',
            'region',
            'province',
            'commune',
            'address',
            'gender',
            'enterprise_represent'
        )


class ReportNaturalPersonSerializer(serializers.ModelSerializer):


    class Meta:
        model = Client
        fields = (
            'business_heading',
            'turn',
            'dni',
            'region',
            'commune',
            'province',
            'address',
            'webpage',
            'email',
            'phone_number',
            'is_client_str',
            'first_name',
            'surname',
            'second_surname',
            'gender',
            'is_recive_mentories_str',
            'work_area',
            )


class ClientModelSerializer(serializers.ModelSerializer):
    """Client serializer."""
    business = serializers.SerializerMethodField('get_business')
    profile_b = serializers.SerializerMethodField('cert_b')

    def get_business(self, client):
        qs = Business.objects.filter(is_active=True, represent_legal=client)
        serializer = BusinessModelSerializer(instance=qs, many=True)
        return serializer.data

    def cert_b(self, client):
        qs = ProfileCertb.objects.filter(client=client.id)
        serializer = ProfileCertbModelSerializer(instance=qs, many=False)
        return serializer.data
    
    class Meta:

        model = Client
        fields = (
            'id',
            'first_name',
            'surname',
            'second_surname',
            'dni',
            'address',
            'phone_number',
            'email',
            'region',
            'province',
            'commune',
            'is_natural_person',
            'is_legal_represent',
            'is_active',
            'business',
            'profile_b',

            'business_heading',
            'turn',

            'work_area',
            'gender',
            'webpage',
            'is_recive_mentories'

        )
        
        def create(self, data):
            """Handle user and profileb creation."""        
            client = Client.objects.create(**data, is_active=True)
            ProfileCertb.objects.create(client=client)
            User.objects.create_user(
                username=data['dni'], 
                first_name='Cliente', 
                last_name=data['first_name'], 
                email=data['email'],
                phone_number=data['phone_number'],
                password=data['dni'],
                is_client=True            
            )
            return client
    
