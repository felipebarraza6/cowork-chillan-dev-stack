from rest_framework import serializers
from crm.users.models import Task


class TaskModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
