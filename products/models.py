from django.db import models
from users.models import User


class Product(models.Model):
    name = models.CharField(
        max_length=100,
        blank=True  # django admin (optional)
    )
    image = models.ImageField(default='placeholder.png')
    category = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    count_in_stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True) # createdAt x default

    # ## Relations (User 1:N Products)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)



class Reviews(models.Model):
    # ## Relations
    # (Product 1:N Reviews)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    description = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True) # createdAt x default

