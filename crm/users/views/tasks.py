from rest_framework import mixins, status, viewsets

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

from crm.users.serializers import TaskModelSerializer, TaskListSerializer
from crm.users.models import Task
from django_filters import rest_framework as filters


class TaskViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin):

    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    
    class TaskFilter(filters.FilterSet):
        class Meta:
            model = Task
            fields = {
                'user': ['exact'],
                'operator': ['exact']
                }
            
    filterset_class = TaskFilter
    queryset = Task.objects.all()
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.action == 'list':
            return TaskListSerializer
        else:
            return TaskModelSerializer
