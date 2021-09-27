"""Banks and payments Serializers."""

from crm.memberships.serializers import memberships
from rest_framework import serializers
from crm.memberships.models import BankAccount, Payment, Membership


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = '__all__'


class PaymentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'

class ListPaymentModelSerializer(serializers.ModelSerializer):
    membership = MembershipSerializer()
    bank_account = BankAccountSerializer()
    class Meta:
        model = Payment
        fields = '__all__'
