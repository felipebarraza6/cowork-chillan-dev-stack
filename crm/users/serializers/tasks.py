from rest_framework import serializers
from crm.users.models import Task
from crm.users.serializers.users import UserModelSerializer


class TaskModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = '__all__'


class TaskListSerializer(serializers.ModelSerializer):
    operator = UserModelSerializer()
    user = UserModelSerializer()
    
    class Meta:
        model = Task
        fields = '__all__'