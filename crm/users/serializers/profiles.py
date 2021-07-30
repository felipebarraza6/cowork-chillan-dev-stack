"""Profile serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from crm.users.models import Profile

class ProfileModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    class Meta:
        """Meta class."""

        model = Profile
        fields = (   
            'user',         
            'dni',
            'birthday',
            'picture',
            'biography',
            'workload',
            'address',
            'is_employee',
            'is_internal'
        )
        

