"""Client urls."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import clients as client_views
from .views import business as business_views
from .views import profile_certb as certb_views


router = DefaultRouter()
router.register(r'clients', client_views.ClientViewSet, basename='clients')
router.register(r'signup_event', client_views.SignedUpViewSet, basename='signup')
router.register(r'business', business_views.BusinessViewSet, basename='business')
#router.register(r'service_request', certb_views.ServiceRequests, basename='service-request')

router.register(r'profile_certb', certb_views.ProfileCertbViewSet, basename='profile-certb')
router.register(r'services_request', certb_views.ServiceRequestViewSet, basename='services-request')


urlpatterns = [
	path('', include(router.urls)),	
]

