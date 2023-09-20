import uuid

from django.db import models
from django.contrib.auth.models import User


class userDetail(models.Model):
    genderChoice = (
        ("M","Male"),
        ("F","Female"),
    )
    relation = models.ForeignKey(User,on_delete=models.CASCADE,default="1")
    Firstname = models.CharField(max_length=20,blank=True)
    Lastname = models.CharField(max_length=20,blank=True)
    Username = models.CharField(max_length=20,blank=True)
    Gender = models.CharField(max_length=6,blank=True,choices=genderChoice)
    Email = models.EmailField(blank=True)
    Phonenumber = models.CharField(max_length=15,blank=True)
    Address = models.TextField(blank=True)
    Saved = models.TextField(blank = True)

    def __str__(self):
        return self.Firstname


class orders(models.Model):
    status = (
        ("S","Successfully delivered"),
        ("P"," Delivery in progress"),
        ("F","Failed to process checkout")
    )
    relation = models.ForeignKey(User,on_delete=models.CASCADE)
    username = models.CharField(max_length=30,default='uwuwuwu')
    phone_number = models.CharField(max_length=14,default='07063475466')
    unique_id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    items = models.TextField(max_length=500)
    checkout_price = models.IntegerField()
    status = models.CharField(choices=status, max_length=35, default='P')
    address = models.TextField(blank=True, max_length=255)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.username

# Create your models here.
