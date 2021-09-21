"""Profile Certb."""

# Django
from django.db import models
from .clients import Client
from .business import Business
import json
# Utilities
from crm.utils.models import ApiModel


class Poll(ApiModel):
    title = models.CharField(max_length=120)
    description = models.TextField(max_length=250, blank=True, null=True)

    def __str__(self):
        return str(self.title)


class QuestionPoll(ApiModel):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)

    def __str__(self):
        return str(self.title)


class AlternativeQuestionPoll(ApiModel):
    question = models.ForeignKey(QuestionPoll, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    has_score = models.BooleanField(default=False)
    points = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return str(self.title)


class AnswerQuestionPoll(ApiModel):
    question = models.ForeignKey(QuestionPoll, on_delete=models.CASCADE)
    answer = models.ForeignKey(AlternativeQuestionPoll, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)


class ContestPoll(ApiModel):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    answers = models.ManyToManyField(AnswerQuestionPoll, related_name="answers_user")
    total_points = models.IntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return str(self.user)


class ProfileCertb(ApiModel):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, blank=True, null=True)
    satisfaction_test = models.OneToOneField(ContestPoll, on_delete=models.CASCADE, null=True, blank=True)
    
    # Sustainability
    purpose = models.TextField(max_length=800, blank=True, null=True)
    vision = models.TextField(max_length=800, blank=True, null=True)
    your_values = models.TextField(max_length=800, blank=True, null=True)
    socio_environmental_benefits = models.TextField(max_length=800, blank=True, null=True)
    how_help_you = models.TextField(max_length=800, blank=True, null=True)
    link_to_you = models.TextField(max_length=800, blank=True, null=True)

    # Economic Impact
    accumulated_sales = models.CharField(max_length=800, blank=True, null=True)
    previust_costs = models.CharField(max_length=800, blank=True, null=True)
    mypyme_single_entry = models.BooleanField(default=False)
    workers_subsidy = models.TextField(max_length=800, blank=True, null=True)
    workers_employment_law = models.TextField(max_length=800, blank=True, null=True)
    benefits_financial_aid = models.TextField(max_length=800, blank=True, null=True)
    linked_entrepreneur = models.TextField(max_length=800, blank=True, null=True)
    years_payment_vat = models.JSONField(blank=True, null=True)

    # Social Impact
    total_partners = models.IntegerField(blank=True, null=True)
    woman_partners = models.IntegerField(blank=True, null=True)
    inmigrant_partners = models.IntegerField(blank=True, null=True)
    marginal_partners = models.IntegerField(blank=True, null=True)
    partners_etnia = models.JSONField(blank=True, null=True)
    total_workers = models.IntegerField(blank=True, null=True)
    woman_workers = models.IntegerField(blank=True, null=True)
    marginal_workers = models.IntegerField(blank=True, null=True)
    workers_etnia = models.JSONField(blank=True, null=True)    
    workers_inmigrant = models.JSONField(blank=True, null=True) 
    workers_diferent = models.JSONField(blank=True, null=True)
    vendors_list = models.JSONField(blank=True, null=True)
    vendors_description = models.TextField(max_length=800, blank=True, null=True)
    performed_activities = models.TextField(blank=True, null=True, max_length=800)

    # Environmental Impact
    management_plan_accounts = models.TextField(blank=True, null=True, max_length=800)
    renewable_energy = models.TextField(blank=True, null=True, max_length=800)
    carbon_footprint = models.TextField(blank=True, null=True, max_length=800)
    hydrica_footprint = models.TextField(blank=True, null=True, max_length=800)
    impact_activities = models.TextField(blank=True, null=True, max_length=800)
    waste_ends = models.TextField(max_length=800, blank=True, null=True)

    
    def __str__(self):
        return str(self.id)

class ServiceRequests(ApiModel):
    profile = models.ForeignKey(ProfileCertb, on_delete=models.CASCADE, blank=True, null=True)
    services_list = models.TextField(blank=True, null=True, max_length=1800)
    username = models.CharField(blank=True, null=True, max_length=1800)
    name = models.CharField(blank=True, null=True, max_length=1800) 
    email = models.CharField(blank=True, null=True, max_length=1800)
    phone = models.CharField(blank=True, null=True, max_length=1800)
    message = models.TextField(blank=True, null=True, max_length=1800)
            
    def __str__(self):
        return str(self.id) 
    
    
    
