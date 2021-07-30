"""Membership urls."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import memberships as memberships_views
from .views import banks_payments as bankpayments_views 

router = DefaultRouter()
router.register(r'memberships', memberships_views.MembershipViewSet, basename='memberships')
router.register(r'banks', bankpayments_views.BankAccountViewSet, basename='banks')
router.register(r'payments', bankpayments_views.PaymentViewSet, basename='payments')

urlpatterns = [
	path('', include(router.urls)),	
]
