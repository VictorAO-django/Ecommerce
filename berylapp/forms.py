from django.forms import ModelForm
from registration.models import userDetail, orders

class userInfo(ModelForm):
    class Meta:
        model = userDetail
        fields = ['Firstname','Lastname','Gender','Email','Phonenumber']

class buyerOrder(ModelForm):
    class Meta:
        model = orders
        fields = ['checkout_price','items','address']