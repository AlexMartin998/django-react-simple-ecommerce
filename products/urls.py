from django.urls import path

from . import views


urlpatterns = [

    path('', views.get_products),
    path('get/<int:id>/', views.get_product),
    path('post/', views.create_product),
    path('edit/<int:id>/', views.edit_product),
    path('delete/<int:id>/', views.delete_product),

    path('search/', views.search),
    
]

