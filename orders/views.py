from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer
from products.models import Product



@api_view(['GET'])
@permission_classes([IsAdminUser]) # isAdmin 2nd way
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

