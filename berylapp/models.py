from django.db import models

class SupermarketModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'Supermarket/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="supermarket-",unique=True)
    product_class = models.CharField(max_length=20,default='Supermarket')
    description = models.TextField(max_length = 100)
    notice = models.TextField(max_length = 100)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

class FashionModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'Fashion/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="fashion-",unique=True)
    product_class = models.CharField(max_length=20,default='Fashion')
    description = models.TextField(max_length = 100,blank=True)
    notice = models.TextField(max_length = 100, blank=True)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

class PhoneDeviceModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'PhoneDevice/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="phonedevice-",unique=True)
    product_class = models.CharField(max_length=20,default='PhoneDevice')
    description = models.TextField(max_length = 100, blank=True)
    notice = models.TextField(max_length = 100, blank=True)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

class MugModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'MugCup/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="mug-",unique=True)
    product_class = models.CharField(max_length=20,default='Mug')
    description = models.TextField(max_length = 100, blank=True)
    notice = models.TextField(max_length = 100, blank=True)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

class CakeModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'Cake/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="cake-",unique=True)
    product_class = models.CharField(max_length=20,default='Cake')
    description = models.TextField(max_length = 100, blank=True)
    notice = models.TextField(max_length = 100, blank=True)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

class ApplianceModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'Appliance/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="appliance-",unique=True)
    product_class = models.CharField(max_length=20,default='Appliance')
    description = models.TextField(max_length = 100, blank=True)
    notice = models.TextField(max_length = 100, blank=True)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

class WineModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'Wine/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="wine-",unique=True)
    product_class = models.CharField(max_length=20,default='Wine')
    description = models.TextField(max_length = 100, blank=True)
    notice = models.TextField(max_length = 100, blank=True)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

class UtensilModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'Utensil/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="utensil-",unique=True)
    product_class = models.CharField(max_length=20,default='Utensil')
    description = models.TextField(max_length = 100, blank=True)
    notice = models.TextField(max_length = 100, blank=True)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

class BookModel(models.Model):
    validityChoice = (
        ("Y","Available"),
        ("N","Not Available"),
    )
    picture = models.ImageField(upload_to = 'Book/')
    price = models.IntegerField()
    price_to_sell = models.IntegerField()
    product_code = models.CharField(max_length = 20,default="book-",unique=True)
    product_class = models.CharField(max_length=20,default='Book')
    description = models.TextField(max_length = 100, blank=True)
    notice = models.TextField(max_length = 100, blank=True)
    validity = models.CharField(max_length=15,choices=validityChoice)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_code

# Create your models here.
