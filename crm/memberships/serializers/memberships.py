"""Memberships Serializers."""

from typing import final
from rest_framework import serializers
from crm.memberships.models import Membership, Payment
from crm.clients.serializers import (ClientModelSerializer, 
                                     BusinessListSerializer)
from crm.services.serializers import ValorationModelSerializer
from .bankspayments import PaymentModelSerializer

class UpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Membership
        fields = (
            'payment_amount',
            'file_contract',
            'copy_file_contract',
            'file_cancel',
            'reason_cancel',
            'is_active',
            'paid_out',
            'is_finish',
            'is_cancel',
            'is_renovation',
            'renovation_uuid'
        )


class CreateSerializer(serializers.ModelSerializer):
    
    is_person = serializers.BooleanField()
    is_enterprise = serializers.BooleanField()
    discount_import = serializers.IntegerField()
    discount_porcent = serializers.IntegerField()
    date_initial = serializers.DateTimeField()
    payment_fees = serializers.IntegerField()

    class Meta:
        model = Membership
        fields = (
            'is_enterprise', 
            'client_business', 
            'is_person', 
            'client_person',
            'valoration',
            'discount_import',
            'is_renovation',
            'renovation_uuid',
            'discount_porcent',
            'note_internal',
            'note_client',
            'date_initial',
            'payment_fees'
        )

    def create(self, data):
        
        finish_date = data['date_initial'] + data['valoration'].duration
        final_price = int(0)
        pay_per_fees = int(0)

        if data['discount_porcent'] > 0:
            final_price = int(data['valoration'].price - 
                              (data['discount_porcent'] * 
                               data['valoration'].price / 100))

        elif data['discount_import'] > 0:
            final_price = int(data['valoration'].price - data['discount_import'])

        else:
            final_price = int(data['valoration'].price)

        if data['payment_fees'] > 1:
            pay_per_fees = int(data['valoration'].price / data['payment_fees'])

        else:
            pay_per_fees = int(data['valoration'].price)
            
        Membership.objects.create(**data, 
                                  date_finish=finish_date, 
                                  payment_final=final_price,
                                  amount_per_fees=pay_per_fees)
        return data

    def validate(self, data):
        if data['is_enterprise'] and data['is_person']:
            raise serializers.ValidationError('Debes seleccionar un tipo de cliente')
        if data['discount_import'] > 0 and data['discount_porcent'] > 0:
            raise serializers.ValidationError('Debes ocupar solo un tipo de descuento')
        
        return data

class ListRetrieveMembershipModelSerializer(serializers.ModelSerializer):
    client_business = BusinessListSerializer()
    client_person = ClientModelSerializer()
    valoration = ValorationModelSerializer() 

    payments_memberships = serializers.SerializerMethodField(('get_payments'))
    
    def get_payments(self, membership):
        qs = Payment.objects.filter(is_pay=True, membership=membership)
        serializer = PaymentModelSerializer(instance=qs, many=True)
        return serializer.data


    class Meta:
        model = Membership
        fields = '__all__'



