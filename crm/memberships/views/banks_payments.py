from rest_framework import mixins, viewsets, pagination

from rest_framework.permissions import (
    IsAuthenticated
)

from crm.memberships.serializers import (BankAccountSerializer,
                                         PaymentModelSerializer)

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

    class CustomPagination(pagination.PageNumberPagination):
        page_size = 10000

    pagination_class = CustomPagination
    queryset = Payment.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'
    serializer_class = PaymentModelSerializer

