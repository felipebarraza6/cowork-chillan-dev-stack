"""Users URLs."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import users as user_views
from .views import tasks as task_views

router = DefaultRouter()
router.register(r'users', user_views.UserViewSet, basename='users')
router.register(r'tasks_users', task_views.TaskViewSet, basename='tasks')
#router.register(r'user_details', user_views.UserDetail, basename='user')

urlpatterns = [
	path('', include(router.urls)),	
]

