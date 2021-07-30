"""Profile Certb."""

# Django
from django.db import models
from .clients import Client
from .business import Business

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
    purpose = models.TextField(max_length=400, blank=True, null=True)
    vision = models.TextField(max_length=400, blank=True, null=True)
    values = models.TextField(max_length=400, blank=True, null=True)
    socio_environmental_benefits = models.TextField(max_length=400, blank=True, null=True)
    how_help_you = models.TextField(max_length=400, blank=True, null=True)

    #encuesta_pendiente
    weaknesses = models.TextField(max_length=400, blank=True, null=True)
    
    # Economic Impact
    accumulated_sales = models.IntegerField(blank=True, null=True)
    percentage_variation = models.FloatField(blank=True, null=True)
    vat_payment = models.IntegerField(blank=True, null=True)
    only_family_income = models.BooleanField(default=False, blank=True, null=True)    

    # Social Impact
    total_workers = models.IntegerField(blank=True, null=True)
    total_woman = models.IntegerField(blank=True, null=True)
    total_immigrants = models.IntegerField(blank=True, null=True)
    suppliers_region = models.CharField(max_length=250, blank=True, null=True)
    suppliers_province = models.CharField(max_length=250, blank=True, null=True)
    suppliers_commune = models.CharField(max_length=250, blank=True, null=True)

    # Environmental Impact
    waste_management_plan = models.BooleanField(default=False, blank=True, null=True)
    waste_site = models.TextField(max_length=250, blank=True, null=True)
    uses_renewable_energy = models.CharField(max_length=250, blank=True, null=True)

    # Needs
    strategic_advice = models.BooleanField(default=False, blank=True, null=True)
    finance_accounting_consulting = models.BooleanField(default=False, blank=True, null=True)
    legal_advice = models.BooleanField(default=False, blank=True, null=True)
    international_trade_advice = models.BooleanField(default=False, blank=True, null=True)
    constructions_infrastructure_qualification = models.BooleanField(default=False, blank=True, null=True)
    company_digitization = models.BooleanField(default=False, blank=True, null=True)
    marketing_advice = models.BooleanField(default=False, blank=True, null=True)
    community_manager = models.BooleanField(default=False, blank=True, null=True)
    branding_packaging = models.BooleanField(default=False, blank=True, null=True)
    access_financing = models.BooleanField(default=False, blank=True, null=True)
    impact_innovation_projects = models.BooleanField(default=False, blank=True, null=True)
    certifications = models.BooleanField(default=False, blank=True, null=True)
    organizational_activities = models.BooleanField(default=False, blank=True, null=True)
    circular_economy_advice = models.BooleanField(default=False, blank=True, null=True)
    territorial_sustainability_studies = models.BooleanField(default=False, blank=True, null=True)


    def __str__(self):
        return str(self.id)

