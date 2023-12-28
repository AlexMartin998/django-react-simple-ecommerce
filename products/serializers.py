from rest_framework import serializers

# ### Serializers based on Existing Models
from .models import Product, Reviews



# ### Serializer: Python to JSON  &  Deserialize: JSON to Python
class ProductSerializer(serializers.ModelSerializer):
    # traer las reviews d c/product
    reviews = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = Product
        # fields tuple q podran ser consultados (se enviaran en la response del view)
        fields = '__all__' # all fields

    def get_reviews(self, obj):
        reviews = obj.reviews_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data




class ReviewSerializer(serializers.ModelSerializer):
    # ## agregar mas cosas al serializer basado en las Relaciones
    avatar = serializers.SerializerMethodField(
        source = 'user.avatar.url'
    )
    user = serializers.ReadOnlyField(
        source = 'user.email'
    )

    class Meta:
        model = Reviews
        # fields tuple q podran ser consultados (se enviaran en la response del view)
        fields = '__all__' # all fields

    def get_avatar(self, obj):
        return obj.user.avatar.url

