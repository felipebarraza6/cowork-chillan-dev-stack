"""Service urls."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import services as services_views


router = DefaultRouter()
router.register(r'services', services_views.ServiceViewSet, basename='services')
router.register(r'services_category', services_views.CategoryViewSet, basename='categories')
router.register(r'services_valoration', services_views.ValorationViewSet, basename='valorations')


urlpatterns = [
	path('', include(router.urls)),	
]

