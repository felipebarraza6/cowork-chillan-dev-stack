"""User models admin."""

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from crm.users.models import User, Profile, Task

class CustomUserAdmin(UserAdmin):
    """User model admin."""

    list_display = ('id','email', 'username', 'first_name', 'is_client')
    fieldsets = UserAdmin.fieldsets + (
            ('Extra Fields', {'fields': ('is_client', 'is_business', 'type_user')}),
    )

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """Profile model admin."""
    list_display = ('user', 'dni','picture')

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('user',)

admin.site.register(User, CustomUserAdmin)
