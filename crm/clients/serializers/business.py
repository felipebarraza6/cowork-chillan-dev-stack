"""Profile Business Serializer."""

# Django
from rest_framework import serializers
# Models
from crm.clients.models import Business, Client, ProfileCertb
from crm.users.models import User
from crm.clients.serializers.profile_certb import ProfileCertbModelSerializer

class ClientForBusiness(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ReportBusinessSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = (
            'business_name',
            'dni_business',
            'business_heading',
            'turn',
            'region',
            'commune',
            'province',
            'address',
            'webpage',
            'email',
            'phone_number',
            'is_active_str',
            'is_recive_mentories_str',                                    
            'work_area',
            # represent legal info
            'dni_represent',
            'gender_represent',
            'region_represent',
            'province_represent',
            'email_represent',
            'phone_represent',            
            
        )
    
class BusinessModelSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Business
        fields = '__all__'
    
    def create(self, data):
        """Handle user and profile creation."""        
        business = Business.objects.create(**data, is_active=True)
        ProfileCertb.objects.create(business=business)
        User.objects.create_user(
            username=data['dni_business'], 
            first_name='Empresa', 
            last_name=data['business_name'], 
            email=data['email'],
            phone_number=data['phone_number'],
            password=data['dni_business'],
            is_client=True            
        )
        return business


class BusinessRetrieveSerializer(serializers.ModelSerializer):
    represent_legal = ClientForBusiness(many=True)
    profile_b = serializers.SerializerMethodField('cert_b')

    def cert_b(self, business):
        qs = ProfileCertb.objects.filter(business=business.id)
        serializer = ProfileCertbModelSerializer(instance=qs, many=False)
        return serializer.data
    

    class Meta:
        model = Business
        fields = '__all__'


class BusinessListSerializer(serializers.ModelSerializer):    
    represent_legal = ClientForBusiness(many=True)
    profile_b = serializers.SerializerMethodField('cert_b')

    def cert_b(self, business):
        qs = ProfileCertb.objects.filter(business=business.id)
        serializer = ProfileCertbModelSerializer(instance=qs, many=False)
        return serializer.data

    class Meta:

        model = Business
        fields = (
            'id',                             
            'business_name',
            'dni_business',
            'business_heading',
            'turn',

            'phone_number',
            'email',
            'address',

            'region',
            'commune',
            'province',
            'represent_legal',

            'is_digital',
            'is_active',

            'work_area',
            'webpage',
            'is_recive_mentories', 
            'profile_b'
              
        )
