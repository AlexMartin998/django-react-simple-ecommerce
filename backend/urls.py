from django.contrib import admin
from django.urls import path, include

# ## static files
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),

    # ## custom paths
    path('users/', include('users.urls')),
    path('products/', include('products.urls')),
    path('orders/', include('orders.urls')),
]


# static files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
