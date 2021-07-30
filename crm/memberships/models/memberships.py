"""Membership Model."""

import uuid
from django.db import models
from crm.utils.models import ApiModel
from crm.clients.models import *
from crm.services.models.valorations import Valoration


class Membership(ApiModel):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    client_business = models.ForeignKey('clients.Business', 
                                        related_name='business_mambership', 
                                        on_delete=models.CASCADE, 
                                        blank=True, null=True)
    client_person = models.ForeignKey('clients.Client', 
                                      related_name='client_mambership', 
                                      on_delete=models.CASCADE, 
                                      blank=True, null=True)
    valoration = models.ForeignKey('services.Valoration', 
                                   related_name='valoration_membership',
                                   on_delete=models.CASCADE)    
    discount_import = models.IntegerField(default=0, blank=False, null=False)
    discount_porcent = models.IntegerField(default=0, blank=False, null=False)
    
    note_internal = models.TextField(max_length=200, blank=True, null=True)
    note_client = models.TextField(max_length=200, blank=True, null=True)
        
    date_initial = models.DateTimeField(blank=False,  null=False)
    date_finish = models.DateTimeField(blank=True,  null=True)
    payment_fees = models.IntegerField(default=1, blank=False, null=False)
    amount_per_fees = models.IntegerField(default=0, blank=False, null=False)
    payment_final = models.IntegerField(default=0, blank=False, null=False)
    payment_amount = models.IntegerField(default=0, blank=False, null=False)
    
    file_contract = models.FileField(upload_to='contracts/%Y/%m/%d/', blank=True, null=True)
    copy_file_contract = models.FileField(upload_to='contracts_copy/%Y/%m/%d/', blank=True, null=True)
    file_cancel = models.FileField(upload_to='cancelations/%Y/%m/%d/', blank=True, null=True)    
    reason_cancel = models.TextField(blank=True, null=True, max_length=650)
    
    is_person = models.BooleanField(default=False)
    is_enterprise = models.BooleanField(default=False)

    is_active = models.BooleanField(default=False)
    paid_out = models.BooleanField(default=False)
    is_finish = models.BooleanField(default=False)
    is_finish_date = models.BooleanField(default=False)
    is_cancel = models.BooleanField(default=False)
    is_renovation = models.BooleanField(default=False)
    renovation_uuid = models.CharField(max_length=320, blank=True, null=True)
        

    def __str__(self):
        return str(self.uuid)
        

class BankAccount(ApiModel):
    name = models.CharField(max_length=300)
    bank = models.CharField(max_length=300)
    number_account = models.CharField(max_length=300, null=True, blank=True)
    description = models.TextField(blank=True, null=True, max_length=600)
    initial_amount = models.IntegerField(default=0)
    amount_money = models.IntegerField(default=0)

    def __str__(self):
        return str(self.name)


class Payment(ApiModel):
    bank_account = models.ForeignKey(BankAccount, on_delete=models.CASCADE)
    membership = models.ForeignKey('memberships.Membership', on_delete=models.CASCADE, blank=True, null=True)
    book = models.ForeignKey('bookings.Book', on_delete=models.CASCADE, blank=True, null=True)
    description = models.TextField(blank=True, null=True, max_length=600)
    
    amount = models.IntegerField(default=0)
    method = models.CharField(max_length=300, null=True, blank=True)

    is_pay = models.BooleanField(default=False)
    is_spending = models.BooleanField(default=False)
    
    comprobant_file = models.FileField(upload_to='invoices/', max_length=1000, blank=True, null=True) 
    
    is_invoice = models.BooleanField(default=False)
    is_ticket = models.BooleanField(default=False)

    pay_for_service = models.BooleanField(default=True)
    is_null = models.BooleanField(default=False)

    def __str__(self):
        return str(self.amount)
