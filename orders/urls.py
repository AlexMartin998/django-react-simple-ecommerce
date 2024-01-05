from django.urls import path
from . import views



urlpatterns = [

    path('', views.get_orders),
    path('my/', views.get_my_orders),
    path('get/<int:id>/', views.get_order),
    path('create/', views.create_order),
    path('deliver/<int:id>/', views.delivered),

    # search by URL Params: ?query=something
    path('search/', views.search),

]
