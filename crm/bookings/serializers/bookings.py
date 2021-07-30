from rest_framework import serializers


from crm.bookings.models import Book, Calendar, Task

class BookModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class CalendarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = '__all__'

class TaskModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
