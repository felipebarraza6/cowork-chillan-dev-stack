"""Services Views."""

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

from crm.users.permissions import IsAccountOwner

# Serializers
from crm.services.serializers.services import (CategoryModelSerializer, 
                                               ServiceModelSerializer, 
                                               ValorationModelSerializer,
                                               ListServiceModelSerializer)
# Models
from crm.services.models import Category, Service, Valoration
from django_filters import rest_framework as filters


class CategoryViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):

    def get_permissions(self):
        """Assign permissions based on action."""        
        if self.action in ['list', 'retrieve']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    queryset = Category.objects.all()
    serializer_class = CategoryModelSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'

class ServiceViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):

    def get_permissions(self):
        """Assign permissions based on action."""        
        if self.action in ['list']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]
    
    class CustomPagination(pagination.PageNumberPagination):
        page_size = 20

    pagination_class = CustomPagination
    queryset = Service.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.action == 'list':
            return ListServiceModelSerializer
        if self.action == 'retrieve':
            return ListServiceModelSerializer
        else:
            return ServiceModelSerializer


class ValorationViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):

    def get_permissions(self):
        """Assign permissions based on action."""        
        if self.action in ['list']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    queryset = Valoration.objects.filter(is_avaible=True)
    serializer_class = ValorationModelSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'
