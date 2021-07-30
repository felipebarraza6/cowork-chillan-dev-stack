from django.contrib import admin
from django.urls import include,path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('crm.users.urls', 'users'), namespace='users')),
    path('', include(('crm.clients.urls', 'clients'), namespace='clients')),
    path('', include(('crm.services.urls', 'services'), namespace='services')),
    path('', include(('crm.memberships.urls', 'memberships'), namespace='memberships')),
    path('', include(('crm.bookings.urls', 'bookings'), namespace='bookings'))

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
