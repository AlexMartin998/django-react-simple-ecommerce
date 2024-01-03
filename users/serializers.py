from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# ### Serializers based on Existing Models
from .models import User



# ### Serializer: Python to JSON  &  Deserialize: JSON to Python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields tuple q podran ser consultados (se enviaran en la response del view)
        fields = ('id', 'email', 'name', 'last_name') # specifying fields


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields tuple q podran ser consultados (se enviaran en la response del view)
        fields = ('id', 'email', 'name', 'last_name') # specifying fields
        # fields = '__all__' # all fields


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email # set email in JWT
        token['avatar'] = user.avatar.url
        token['is_staff'] = user.is_staff # isAdmin?
        return token


