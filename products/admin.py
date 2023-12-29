from django.contrib import admin

from .models import Product, Reviews


# ### Register your MODELS here.
admin.site.register(Product)
admin.site.register(Reviews)
