from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView # refresh token

from . import views


urlpatterns = [
    # retorna: fields del RegisterUserSerializer xq eso retorna el register views.py method
    path('register/', views.register),

    # retorna: refresh and access token
    path('login/', views.LoginView.as_view()),

    # enviamos 1 refreshToken para q nos d otro AccessToken y RefreshToken y asi vamos jugnado con el refreshtoken (cuando los usams o vencen, van a la blacklist)
    path('refresh/', TokenRefreshView.as_view()),


    #
    path('', views.get_users),
    path('delete/<int:id>/', views.delete_user),
    path('edit/<int:id>/', views.edit_profile),


    # search by URL Params: ?query=something
    path('search/', views.search),

]

