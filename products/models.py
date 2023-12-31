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
    slug = models.SlugField(unique=True, max_length=50, null=True, blank=True)

    # ## Relations (User 1:N Products)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['slug']) # create index for slug field
        ]



class Reviews(models.Model):
    description = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True) # createdAt x default

    # ## Relations
    # (Product 1:N Reviews)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

