"""Client views."""

# Django REST Framework
from rest_framework import mixins, status, viewsets, pagination
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

# Filters
from django_filters import rest_framework as filters

# Serializers
from crm.clients.serializers import ClientModelSerializer, SignedUpModelSerializer 

# Models
from crm.clients.models import Client, Business, ProfileCertb, SignedUp
from crm.users.models import User

class SignedUpViewSet(viewsets.GenericViewSet,
                      mixins.CreateModelMixin,
                      mixins.ListModelMixin):
    
    def get_permissions(self):
        """Assign permissions based on action."""        
        if self.action in ['create']:
            permissions = [AllowAny]
        else:
            permissions = [AllowAny]
        return [p() for p in permissions]

    class CustomPagination(pagination.PageNumberPagination):
        page_size = 1000
        
    pagination_class = CustomPagination
    queryset = SignedUp.objects.all()
    serializer_class = SignedUpModelSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'
    

class ClientViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):

    def get_permissions(self):
        """Assign permissions based on action."""        
        if self.action in ['create']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    queryset = Client.objects.filter(is_client=True)
    serializer_class = ClientModelSerializer
    lookup_field = 'dni'

    filter_backends = (filters.DjangoFilterBackend,)

    class ClientFilter(filters.FilterSet):
        class Meta:
            model = Client
            fields = {
                'is_active': ['exact'],
                'is_natural_person': ['exact'],
                'is_legal_represent': ['exact'],
                'first_name': ['contains'],
                'surname': ['contains'],
                'dni': ['contains'],
                'second_surname': ['contains'],
                }
         
    filterset_class = ClientFilter

    # Completar perfil de persona natural
    #Completar Perfil
    @action(detail=True, methods=['put', 'patch'])
    def natural_person(self, request, *arg, **kwargs):
        """Update profile data."""
        client = self.get_object()
        person = client.profile_person
        partial = request.method == 'PATCH'
        serializer = ProfilePersonModelSerializer(
            person,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = ClientModelSerializer(client).data
        return Response(data)

  
    def create(self, request):
        serializer = ClientModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        client = serializer.save()
        data = ClientModelSerializer(client).data        
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

       
        return Response(data, status=status.HTTP_201_CREATED)
