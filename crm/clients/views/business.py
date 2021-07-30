"""Profile Business views."""

from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)
from crm.users.permissions import IsAccountOwner
from crm.clients.serializers import BusinessModelSerializer, BusinessRetrieveSerializer,BusinessListSerializer
from crm.clients.models import Client, Business
from django_filters import rest_framework as filters


class BusinessViewSet(viewsets.GenericViewSet,
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

    queryset = Business.objects.all()
    lookup_field = 'dni_business'

    filter_backends = (filters.DjangoFilterBackend,)

    class BusinessFilter(filters.FilterSet):
        class Meta:
            model = Business
            fields = {
                'business_name': ['contains'],
                'dni_business': ['contains']                
                }

         
    
    filterset_class = BusinessFilter

    def get_serializer_class(self):
        if self.action == 'list':
            return BusinessListSerializer
        if self.action == 'retrieve':
            return BusinessRetrieveSerializer
        else:
            return BusinessModelSerializer
    


