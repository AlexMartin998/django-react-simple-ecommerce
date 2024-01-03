from django.db import models
from users.models import User
from products.models import Product


class Order(models.Model):
    total_price = models.CharField(max_length=250, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True) # createdAt

    # ## Relations (User 1:N Orders), crea aqui la FK
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)



class OrderItem(models.Model):
    quantity = models.IntegerField(null=True, blank=True, default=0)
    price = models.CharField(max_length=250, blank=True)

    # ## Relations (Order 1:N OrderItem), crea aqui el order_id
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    # ## Relations (Products 1:N OrderItem)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)



class ShippingAddress(models.Model):
    address = models.CharField(max_length=250, blank=True)
    city = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=100, blank=True)

    # ## Relations (Order 1:N ShippingAddress), crea aqui la FK
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)

