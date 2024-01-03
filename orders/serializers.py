from rest_framework import serializers

# ### Serializers based on Existing Models
from .models import Order, OrderItem, ShippingAddress



# ### Serializer: Python to JSON  &  Deserialize: JSON to Python
class OrderItemSerializer(serializers.ModelSerializer):
    # ### Agregar cosas al serializer basado en las Relaciones/Associations tables
    product = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = '__all__'



class OrderSerializer(serializers.ModelSerializer):
    # ### Agregar cosas al serializer basado en las Relaciones/Associations tables
    user = serializers.ReadOnlyField(source='user.email') # retorna solo el email
    # # obtener x methods especificos d esta class/model (get_order_items)
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model: Order
        fields = '__all__'

    # # Methods para el   SerializerMethodField
    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shipping_address(self, obj):
        try:
            address = ShippingSerializer(
                obj.shippingaddress, many=False
            ).data
        except:
            address = False
        return address



class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model: ShippingAddress
        fields = '__all__'


