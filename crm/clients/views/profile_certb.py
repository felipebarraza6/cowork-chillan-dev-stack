"""ProfileCertB views."""

# Django REST Framework
from rest_framework import mixins, status, viewsets
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
from crm.clients.serializers import (ProfileCertbModelSerializer, 
                                     ServiceRequestModelSerializer)

# Models
from crm.clients.models import ProfileCertb, ServiceRequests


class ProfileCertbViewSet(viewsets.GenericViewSet,                  
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin ):

    
    def get_permissions(self):
        """Assign permissions based on action."""        
        if self.action in ['create']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    queryset = ProfileCertb.objects.all()
    serializer_class = ProfileCertbModelSerializer
    lookup_field = 'id'
    filter_backends = (filters.DjangoFilterBackend,)


class ServiceRequestViewSet(viewsets.GenericViewSet,                  
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin):
    
    def get_permissions(self):
        """Assign permissions based on action."""        
        if self.action in ['create']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    queryset = ServiceRequests.objects.all()
    serializer_class = ServiceRequestModelSerializer
    lookup_field = 'id'
    filter_backends = (filters.DjangoFilterBackend,)   