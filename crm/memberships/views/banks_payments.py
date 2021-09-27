from rest_framework import mixins, viewsets, pagination

from rest_framework.permissions import (
    IsAuthenticated
)

from crm.memberships.serializers import (BankAccountSerializer,
                                         PaymentModelSerializer,
                                         ListPaymentModelSerializer)

from crm.memberships.models import BankAccount, Payment
from django_filters import rest_framework as filters


class BankAccountViewSet(viewsets.GenericViewSet,
                         mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.ListModelMixin):

    permission_classes = [IsAuthenticated]

    class CustomPagination(pagination.PageNumberPagination):
        page_size = 10000
    
    pagination_class = CustomPagination
    queryset = BankAccount.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'
    serializer_class = BankAccountSerializer


class PaymentViewSet(viewsets.GenericViewSet,
                         mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.ListModelMixin):

    permission_classes = [IsAuthenticated]

    queryset = Payment.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'
    
    class PaymentFilter(filters.FilterSet):
        class Meta:
            model = Payment

            fields = {
                # crear filtros por rut
                'is_spending': ['exact'],                 
            }
    
    filterset_class = PaymentFilter    

    def get_serializer_class(self):
        if(self.action == 'list'):
            return ListPaymentModelSerializer
        else:
            PaymentModelSerializer
