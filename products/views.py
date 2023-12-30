from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Product
from .serializers import ProductSerializer

from backend.pagination import CustomPagination



@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    pagination = CustomPagination()
    paginated_products = pagination.paginate_queryset(products, request)
    serializer = ProductSerializer(paginated_products, many=True) # todos
    return pagination.get_paginated_response(serializer.data) # resp pagination


@api_view(['GET'])
def get_product(request, id):
    # product = Product.objects.get(pk=id)
    product = get_object_or_404(Product, pk=id)
    serializer = ProductSerializer(product, many=False) # solo 1
    return Response(serializer.data)


# ## Search
@api_view(['GET'])
def search(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    product = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(product, many=True)
    return Response({'products': serializer.data})



@api_view(['POST'])
def create_product(request):
    if request.user.is_staff: # solo si es Admin
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['PUT'])
def edit_product(request, id):
    product = get_object_or_404(Product, pk=id)
    if request.user.is_staff: # solo si es Admin
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def delete_product(request, id):
    product = get_object_or_404(Product, pk=id)
    if request.user.is_staff: # solo si es Admin
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

