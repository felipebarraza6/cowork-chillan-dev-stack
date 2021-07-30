"""Admin Bookings."""

# Django
from django.contrib import admin

# Models
from .models import Book, Calendar, Task

class BookAdmin(admin.ModelAdmin):
    list_display=('id', 'client', 'business', 'calendar', 'date_reservation', 'date_out', 'created', 'modified')

class TaskAdmin(admin.ModelAdmin):
    list_display=('id', 'user', 'date', 'task', 'is_warning', 'is_notification', 'is_alert')
    



admin.site.register(Book, BookAdmin)
admin.site.register(Calendar)
admin.site.register(Task, TaskAdmin)
