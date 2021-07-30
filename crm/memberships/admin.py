"""Admin Services."""

# Django
from django.contrib import admin

# Models
from crm.memberships.models import Membership, Payment, BankAccount

class MembershipAdmin(admin.ModelAdmin):
    list_display=(
                    'created',
                    'uuid',
                    'client_business', 
                    'client_person',
                    'valoration',
                    'date_initial', 
                    'payment_amount',
                    'is_active', 
                    'paid_out',
                    'is_finish',
                    'is_finish_date',
                    'is_cancel',
                    'is_renovation'
                )


    

admin.site.register(Membership, MembershipAdmin)
admin.site.register(Payment)
admin.site.register(BankAccount)


