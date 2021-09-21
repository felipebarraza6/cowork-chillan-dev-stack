"""Admin Clients."""

# Django
from django.contrib import admin

# Models
from crm.clients.models import (Business, Client, ProfileCertb,
                            Poll, QuestionPoll, AlternativeQuestionPoll, 
                            AnswerQuestionPoll, ContestPoll, SignedUp, ServiceRequests)

from import_export.admin import ExportActionMixin


@admin.register(SignedUp)
class CustomClientsSignupEvent(ExportActionMixin, admin.ModelAdmin):
    list_display = ('id','email', 'name', 'age', 'ocupation', 'commune', 'enterprise', 'turn', 'participation', 'phone')

admin.site.register(Business)
admin.site.register(Client)
admin.site.register(ProfileCertb)

admin.site.register(Poll)
admin.site.register(QuestionPoll)
admin.site.register(AlternativeQuestionPoll)
admin.site.register(AnswerQuestionPoll)
admin.site.register(ContestPoll)
admin.site.register(ServiceRequests)
    
    



