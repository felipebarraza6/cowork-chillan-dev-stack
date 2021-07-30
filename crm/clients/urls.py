"""Client urls."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import clients as client_views
from .views import business as business_views
from .views import reports as report_views
from .views import profile_certb as certb_views


router = DefaultRouter()
router.register(r'clients', client_views.ClientViewSet, basename='clients')
router.register(r'signup_event', client_views.SignedUpViewSet, basename='signup')
router.register(r'business', business_views.BusinessViewSet, basename='business')

# Clients
router.register(r'report/natural-persons', report_views.ReportNaturalPerson, basename='report-natural')
router.register(r'report/legal-represents', report_views.ReportLegalRepresent, basename='report-lrepresent')
router.register(r'report/business', report_views.ReportBusiness, basename='report-business')

router.register(r'profile_certb', certb_views.ProfileCertbViewSet, basename='profile-certb')


urlpatterns = [
	path('', include(router.urls)),	
]

