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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    user = request.user
    orders = user.order_set.all() # trae las orders del user x relacion (JOIN)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)




# ## Esta confiando en el precio q le manda el front, fix it
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user # auth
    data = request.data # front
    order_items_client = data['order_items']
    total_price = data['total_price']

    # ## Calc actual price
    sum_of_prices = sum(
        int(float(item['price'])) * item['quantity'] for item in order_items_client
    )

    # ## create order: Improve, validate prices in back, no the front prices
    if total_price == sum_of_prices:
        order = Order.objects.create(
            user = user,
            total_price = total_price
        )
        
        ShippingAddress.objects.create(
            order = order,
            address = data['address'],
            city = data['city'],
            country = data['country'],
            postal_code = data['postal_code'],
        )
        
        for item_client in order_items_client:
            product = Product.objects.get(id=item_client['id'])
            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                quantity = item_client['quiantity'],
                price = item_client['price']
            )
            product.count_in_stock -= item.quantity
            product.save()

        # ## serialize created order
        serializer = OrderSerializer(order, many = False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    else:
        return Response(
            {'error': 'Unauthorized: Prices are manipulated'},
            status = status.HTTP_401_UNAUTHORIZED
        )



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def delivered(request, id):
    order = Order.objects.get(pk=id)
    order.is_delivered = True
    order.delivered_at = datetime.now()
    order.save()
    return Response('Order was delivered')



