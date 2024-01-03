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



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order(request, id):
    user = request.user # auth
    try:
        order = Order.objects.get(pk = id)
        # only admin & owner
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many = False)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    except:
        return Response(
            {'error': f'Order with ID {id} does not exist'},
            status = status.HTTP_404_NOT_FOUND
        )


