"""Banks and payments Serializers."""

from rest_framework import serializers
from crm.memberships.models import BankAccount, Payment


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = '__all__'


class PaymentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


