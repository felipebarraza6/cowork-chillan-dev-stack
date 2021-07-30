"""Booking urls."""


from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import bookings as bookings_views

router = DefaultRouter()
router.register(r'bookings', bookings_views.BookViewSet, basename='bookings')
router.register(r'calendars ', bookings_views.CalendarViewSet, basename='calendars')
router.register(r'tasks_bookings', bookings_views.TaskViewSet, basename='tasks')

urlpatterns = [
    path('', include(router.urls))
]
