from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.http import JsonResponse,HttpResponseRedirect

from .models import SupermarketModel,FashionModel,PhoneDeviceModel,MugModel,CakeModel,ApplianceModel,WineModel,UtensilModel,BookModel
from registration.models import userDetail,orders
from .forms import userInfo,buyerOrder

# Create your views here.

#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#+++++++THIS IS THE VIEW FOR THE ROOT PAGE OF THE WEBSITE [URL-'/']
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
def rootPage(request):
    template = 'subTemplate/root.html' #Template to provide
    context = {} #Contect to deliver to the template

    if request.user.is_authenticated:
        currentUser = User.objects.get(username=request.user.username)
        DETAIL = userDetail.objects.get(relation=currentUser)
        previousSave = DETAIL.Saved
        context['saveditems'] = previousSave

    pre_context = { #THIS IS TO PROVIDE ACCESS TO EACH STORE IN THE DATABASE
        'SupermarketModel' : SupermarketModel,
        'FashionModel' : FashionModel,
        'PhoneDeviceModel' : PhoneDeviceModel,
        'MugModel' : MugModel,
        'CakeModel' : CakeModel,
        'ApplianceModel' : ApplianceModel,
        'WineModel' : WineModel,
        'UtensilModel' : UtensilModel,
        'BookModel' : BookModel,
    }
        
    for i in pre_context.keys(): #loop throught the pre_context keys()
        productToSend = [] #create an empty list 
        for u in pre_context[i].objects.all(): #loop through the certain model
            if len(productToSend) < 11: 
                productToSend.append(u) #append to the 'productToSend' list if the length is <11. i.e we only need 5 items from each store on the template
                continue
            else:
                break
        context[i] = productToSend


    return render(request,template,context)


def productStore(request,store,pk):
    template = 'subTemplate/productStore.html'
    context = {
        'Itemexist':True,
    }

    if request.user.is_authenticated:
        currentUser = User.objects.get(username=request.user.username)
        DETAIL = userDetail.objects.get(relation=currentUser)
        previousSave = DETAIL.Saved
        context['saveditems'] = previousSave

    pre_context = {
        'supermarket' : SupermarketModel,
        'fashion' : FashionModel,
        'phonedevice' : PhoneDeviceModel,
        'mug' : MugModel,
        'cake' : CakeModel,
        'appliance' : ApplianceModel,
        'wine' : WineModel,
        'utensil' : UtensilModel,
        'book' : BookModel,
    }

    context['store'] = store
    context['storeItem'] = pre_context[store].objects.all()
    context['class'] = store

    return render(request,template,context)


def shoppingCart(request):
    template = 'subTemplate/cart.html'
    CartItem = request.COOKIES['cart']
    Cart = []
    newCart = []
    Exist = True
    
    pre_context = {
        'supermarket' : SupermarketModel,
        'fashion' : FashionModel,
        'phonedevice' : PhoneDeviceModel,
        'mug' : MugModel,
        'cake' : CakeModel,
        'appliance' : ApplianceModel,
        'wine' : WineModel,
        'utensil' : UtensilModel,
        'book' : BookModel,
    }
    
    if CartItem != '':
        CartItem = CartItem.split(',')
    
        for i in CartItem:
            item = i.split('(')
            Cart.append((item[0],item[1][:-1]))

        for i in Cart:
            modelTrail = i[0].split('-')
            newCart.append((pre_context[modelTrail[0]].objects.get(product_code=i[0]),i[1]))
    else:
        Exist = False

    context = {
        'Cart':newCart,
        'Cartexist':Exist,
    }

    if request.user.is_authenticated:
        currentUser = User.objects.get(username=request.user.username)

        if request.method == 'POST':
            new_order = orders.objects.create(
                relation=currentUser,
                username=request.user.username,
                phone_number = request.POST['Phonenumber'],
                items=request.POST['items'],
                checkout_price = request.POST['checkout_price'],
                address=request.POST['address'],
            )
            return HttpResponseRedirect('/history/')
        else:
            form = buyerOrder()
            context['orderForm'] = form

            stations = userDetail.objects.get(relation=currentUser).Address
            Phonenumber = userDetail.objects.get(relation=currentUser).Phonenumber
            if stations != "":
                context['station'] = stations.split('#')
            if Phonenumber != "":
                context['phone'] = Phonenumber

    return render(request,template,context)



def accountSettings(request):
    template = 'subTemplate/settings.html'
    context =  {}
    check = False

    if request.method == "POST":
        if request.user.is_authenticated:
            currentUser = User.objects.get(username=request.user.username)
            DETAIL = userDetail.objects.get(relation=currentUser)
            if DETAIL:
                DETAIL.Firstname = request.POST['Firstname']
                DETAIL.Lastname = request.POST['Lastname']
                DETAIL.Gender = request.POST['Gender']
                DETAIL.Email = request.POST['Email']
                DETAIL.Phonenumber = request.POST['Phonenumber']
                DETAIL.save()
                return HttpResponseRedirect('/')
            else:
                settingForm = userInfo(request.POST)
                if settingForm.is_valid():
                    settingForm.save()
                return HttpResponseRedirect('/')
    else:
        settingForm = userInfo()
        if request.user.is_authenticated:
            currentUser = User.objects.get(username=request.user.username)
            DETAIL = userDetail.objects.get(relation=currentUser)
            if DETAIL:
                context['detail'] = DETAIL
            context['settingForm'] = settingForm

    return render(request,template,context)



def accountAddress(request):
    template = 'subTemplate/address.html'
    Address = []
    AddressExist = True

    context = {}

    if(request.method == 'POST'):
        if request.user.is_authenticated:
            currentUser = User.objects.get(username=request.user.username)
            DETAIL = userDetail.objects.get(relation=currentUser)
            DETAIL.Address = request.POST['Address']
            DETAIL.save()
            return HttpResponseRedirect('/address')

    else:
        if request.user.is_authenticated:
            currentUser = User.objects.get(username=request.user.username)
            DETAIL = userDetail.objects.get(relation=currentUser)
            ADDRESSLIST = DETAIL.Address
            if ADDRESSLIST == '':
                AddressExist = False
            else:
                ADDRESS = ADDRESSLIST.split('#')
                Address = ADDRESS
            context['TotalAddress'] = ADDRESSLIST

    context['Address'] = Address
    context['AddressExist'] = AddressExist

    return render(request,template,context)



def cartDetail(request):
    CartItem = ''
    if request.COOKIES['cart']:
        CartItem = request.COOKIES['cart']
    Cart = []
    totalPrice = int()
    totalIndex = int()
    result = int(0)
    
    pre_context = {
        'supermarket' : SupermarketModel,
        'fashion' : FashionModel,
        'phonedevice' : PhoneDeviceModel,
        'mug' : MugModel,
        'cake' : CakeModel,
        'appliance' : ApplianceModel,
        'wine' : WineModel,
        'utensil' : UtensilModel,
        'book' : BookModel,
    }

    if CartItem != '':
        CartItem = CartItem.split(',')
    for i in CartItem:
            item = i.split('(')
            Cart.append((item[0],item[1][:-1]))

    for i in Cart:
        if request.method == 'GET':
            modelTrail = i[0].split('-')
            totalIndex += int(i[1])
            totalPrice += (pre_context[modelTrail[0]].objects.get(product_code=i[0]).price_to_sell) * int(i[1])
            if 'cart_index' in  request.GET:
                result = totalIndex
            else:
                result = totalPrice       

    return JsonResponse(result,safe=False)


def saveItem(request,code):
    result = 'true'
    check = False

    if request.user.is_authenticated:
        currentUser = User.objects.get(username=request.user.username)
        DETAIL = userDetail.objects.get(relation=currentUser)
        previousSave = DETAIL.Saved

        if 'delete' in request.GET:
            newPreviousSave = ""
            for i in previousSave.split(','):
                if code == i:
                    continue
                else:
                    if newPreviousSave == '':
                        newPreviousSave += str(i)
                    else:
                        newPreviousSave += ',' + str(i)

        else:
            if previousSave == '':
                newPreviousSave = "{}".format(code)
            else:
                newPreviousSave = "{},{}".format(previousSave,code)

        DETAIL.Saved = newPreviousSave
        DETAIL.save()

    else:
        result = 'false'

    return JsonResponse(result,safe=False)



def savedItems(request):
    template = "subTemplate/savedItem.html"
    allSavedItem = []
    Exist = True

    context = {}
    
    if request.user.is_authenticated:
        currentUser = User.objects.get(username=request.user.username)
        DETAIL = userDetail.objects.get(relation=currentUser)
        if DETAIL:
            savedItem = DETAIL.Saved
            pre_context = {
            'supermarket' : SupermarketModel,
            'fashion' : FashionModel,
            'phonedevice' : PhoneDeviceModel,
            'mug' : MugModel,
            'cake' : CakeModel,
            'appliance' : ApplianceModel,
            'wine' : WineModel,
            'utensil' : UtensilModel,
            'book' : BookModel,
            }

            if savedItem != '':
                savedItem = savedItem.split(',')

            for i in savedItem:
                modelTrail = i.split('-')
                allSavedItem.append((pre_context[modelTrail[0]].objects.get(product_code=i)))

            context['saveditems'] = savedItem
        else:
            Exist = False
    if len(allSavedItem) > 1:
        context['savedItem'] = allSavedItem
    else:
        Exist = False
        
    context['itemExist'] = Exist

    return render(request,template,context)


def recentlyViewed(request):
    template = 'subTemplate/productStore.html'
    RecentView = request.COOKIES['recentview']
    AllRecentView = []
    Exist = True
    check = False

    pre_context = {
        'supermarket' : SupermarketModel,
        'fashion' : FashionModel,
        'phonedevice' : PhoneDeviceModel,
        'mug' : MugModel,
        'cake' : CakeModel,
        'appliance' : ApplianceModel,
        'wine' : WineModel,
        'utensil' : UtensilModel,
        'book' : BookModel,
    }
    
    if RecentView != '':
            RecentView = RecentView.split(',')
            for i in RecentView:
                modelTrail = i.split('-')
                AllRecentView.append((pre_context[modelTrail[0]].objects.get(product_code=i)))
    else:
        Exist = False

    context = {
        'storeItem':AllRecentView,
        'Itemexist':Exist,
        'class':'Recently Viewed'
    }

    for i in userDetail.objects.all():
        if i.Username == request.user.username:
            check = True
            break
        else:
            check = False

    if check:
        DETAIL = userDetail.objects.get(username = request.user.username)
        previousSave = DETAIL.Saved
        context['saveditems'] = previousSave

    return render(request,template,context)