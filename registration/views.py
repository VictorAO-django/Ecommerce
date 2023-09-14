from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect

from berylapp.forms import userInfo
from berylapp.models import SupermarketModel,FashionModel,PhoneDeviceModel,MugModel,CakeModel,ApplianceModel,WineModel,UtensilModel,BookModel

from .models import userDetail,orders
# Create your views here.

class Register(CreateView):
    template_name = 'registration/register.html'
    form_class = UserCreationForm
    def form_valid(self,form):
        form.save()
        return HttpResponseRedirect('/login/?next=/personaldetail')



def personalSetting(request):
    template = 'registration/personaldetails.html'

    context = {}

    if request.method == 'POST':
        form = userInfo(request.POST)
        if form.is_valid():
            newUser = userDetail.objects.create(
                relation=User.objects.get(username=request.user.username),
                Firstname=request.POST['Firstname'],
                Lastname=request.POST['Lastname'],
                Username=request.user.username,
                Gender=request.POST['Gender'],
                Email=request.POST['Email'],
                Phonenumber=request.POST['Phonenumber'],
            )
            return HttpResponseRedirect('/')
    else:
        form = userInfo()
        context['form'] = form

    return render(request,template,context)


def accountHistory(request):
    template = 'subTemplate/history.html'
    context = {}
    orderItems = []
    Exist = False

    pre_context = {
        'SupermarketModel' : SupermarketModel,
        'fashion' : FashionModel,
        'PhoneDeviceModel' : PhoneDeviceModel,
        'MugModel' : MugModel.objects.all(),
        'cake' : CakeModel,
        'ApplianceModel' : ApplianceModel,
        'WineModel' : WineModel,
        'UtensilModel' : UtensilModel,
        'book' : BookModel,
    }

    currentUser = User.objects.get(username=request.user.username)

    orders_by_user = orders.objects.filter(relation=currentUser)

    if orders_by_user:
        Exist = True
        context['exist'] = Exist

    for order in orders_by_user:
        currentItems = []
        for item in order.items.split(','):
            modelTrail = item.split('-')
            productCode = item.split('(')
            currentItems.append(pre_context[modelTrail[0]].objects.get(product_code=productCode[0]))

        orderItems.append(currentItems)

    context['orderHistory'] = zip(orders_by_user,orderItems)

    return render(request,template,context)