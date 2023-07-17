from django.db import models

class userDetail(models.Model):
    genderChoice = (
        ("M","Male"),
        ("F","Female"),
    )
    Firstname = models.CharField(max_length=20,blank=True)
    Lastname = models.CharField(max_length=20,blank=True)
    Username = models.CharField(max_length=20,blank=True)
    Gender = models.CharField(max_length=6,blank=True,choices=genderChoice)
    Email = models.EmailField(blank=True)
    Phonenumber = models.CharField(max_length=15,blank=True)
    Address = models.TextField(blank=True,default='wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')

    History = models.TextField(blank=True)
    Saved = models.TextField(blank = True)

    def __str__(self):
        return self.Firstname


class orders(models.Model):
    status = (
        ("S","Successfully delivered"),
        ("P"," Delivery in progress"),
        ("F","Failed to process checkout")
    )
    Username = models.CharField(max_length=20,blank=True)
    items = models.TextField(max_length=500)
    checkoutprice = models.IntegerField()
    status = models.CharField(choices=status, max_length=35)
    Address = models.TextField(blank=True, max_length=255)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.Username

# Create your models here.
