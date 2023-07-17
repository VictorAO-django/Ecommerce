from django.forms import ModelForm
from registration.models import userDetail

class userInfo(ModelForm):
    class Meta:
        model = userDetail
        fields = ['Firstname','Lastname','Username','Gender','Email','Phonenumber']