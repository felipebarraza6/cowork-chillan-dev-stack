from rest_framework import mixins, viewsets, pagination

from rest_framework.permissions import (
    IsAuthenticated
)

from crm.bookings.serializers import BookModelSerializer, CalendarModelSerializer, TaskModelSerializer
from crm.bookings.models import Book, Calendar, Task
from django_filters import rest_framework as filters


class BookViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):

    permission_classes = [IsAuthenticated]
    
    class CustomPagination(pagination.PageNumberPagination):
        page_size = 1000

    pagination_class = CustomPagination
    queryset = Book.objects.all().order_by('date_reservation')
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'
    serializer_class = BookModelSerializer


class CalendarViewSet(viewsets.GenericViewSet,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.ListModelMixin,
                      mixins.DestroyModelMixin):

    permission_classes = [IsAuthenticated]

    class CustomPagination(pagination.PageNumberPagination):
        page_size = 1000

    pagination_class = CustomPagination
    queryset = Calendar.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'
    serializer_class = CalendarModelSerializer


class TaskViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):
    
    permission_classes = [IsAuthenticated]

    class CustomPagination(pagination.PageNumberPagination):
        page_size = 1000

    pagination_class = CustomPagination
    queryset = Task.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    lookup_field = 'id'
    serializer_class = TaskModelSerializer

