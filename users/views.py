from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password # hashear password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import IntegrityError
from rest_framework import status


from .models import User
from .serializers import RegisterUserSerializer, MyTokenObtainPairSerializer, UserSerializer


@api_view(['POST'])
def register(request):
    try:
        data = request.data
        user = User.objects.create(
            email=data['email'],
            name=data['name'],
            last_name=data['last_name'],
            password=make_password(data['password']),
        )
        serializer = RegisterUserSerializer(user, many = False)
        return Response(serializer.data, status=201)
    except IntegrityError:
        return Response({'error': 'Email already registered'}, status=400)



@api_view(['GET'])
def get_users(request):
    if request.user.is_staff: # isAdmin - Authorization
        users = User.objects.exclude(email='admin@admin.com')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    else:
        return Response({'error': 'Unauthorized'} ,status=status.HTTP_401_UNAUTHORIZED)
        






# ## esta view permite hacer login: returns access & refresh token
class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

