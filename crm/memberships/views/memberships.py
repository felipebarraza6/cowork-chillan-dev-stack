"""Memberships Views."""

from rest_framework import mixins, status, viewsets, pagination
from rest_framework.decorators import action
from rest_framework.response import Response 
from rest_framework.views import APIView

from rest_framework.permissions import (
    IsAuthenticated
)
from crm.memberships.serializers import (CreateSerializer,
                                         ListRetrieveMembershipModelSerializer,
                                         UpdateSerializer)
from crm.memberships.models import Membership, Payment, BankAccount
from django_filters import rest_framework as filters


class MembershipViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin): 

    class CustomPagination(pagination.PageNumberPagination):
        page_size = 1000
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination 
    queryset = Membership.objects.all().order_by('date_initial')    
    filter_backends = (filters.DjangoFilterBackend,)
    

    class MembershipFilter(filters.FilterSet):
        class Meta:
            model = Membership

            fields = {
                # crear filtros por rut
                'client_business__dni_business': ['contains'], 
                'client_person__dni': ['contains'], 
                'valoration': ['exact'],                 
                'date_initial': ['contains', 'gte', 'lte', 'year', 
                                 'month', 'day', 'year__range', 'month__range',
                            'day__range', 'date__range', 'hour', 'minute', 'second', 
                                 'hour__range', 'minute__range', 'minute__range'], 
                'date_finish': ['contains', 'gte', 'lte', 'year', 'month', 'day', 
                                'year__range', 'month__range','day__range', 'date__range', 
                                'hour', 'minute', 'second', 'hour__range', 'minute__range', 
                                'minute__range'],             
                'is_active': ['exact'], 
                'paid_out': ['exact'], 
                'is_finish': ['exact'],
                'is_finish_date': ['exact'],
                'is_cancel': ['exact'],
                'is_renovation': ['exact']
            }
    
    filterset_class = MembershipFilter
    lookup_field = 'uuid'

    def get_serializer_class(self):
        if self.action == 'add_payment':
            return AddPaymentSerializer
        if self.action == 'create':
            return CreateSerializer
        if self.action == 'partial_update':
            return UpdateSerializer
        if self.action == 'list' or 'retrieve':
            return ListRetrieveMembershipModelSerializer

    @action(detail=True, methods=['post'])
    def add_payment(self, request, *args, **kwargs):
         membership = self.get_object()
         instaince_bank = BankAccount.objects.filter(id=request.data['bank']).first()

         Payment.objects.create(bank_account=instaince_bank, 
                                membership=membership, 
                                amount=request.data['amount'], 
                                method=request.data['method'],
                                is_ticket=request.data['is_ticket'],
                                is_invoice=request.data['is_invoice'])
         return Response('ok', status=status.HTTP_201_CREATED)

