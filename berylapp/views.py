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
    check = bool() #This is to check if the current user has provided his details on the account management.The value changes as the program flows, 'True' representing that the user has provided such details and 'False' representing otherwise.
    context = {} #Contect to deliver to the template

    for i in userDetail.objects.all(): #loop through 'userdetail' table in database
        if i.Username == request.user.username: #if the readonly field 'Username' is equal to the user username i.e the user has provided his details on account management
            check = True 
            break
        else: #if the user has never provided details on the account management.
            check = False

    if check: #if check is equal to True
        DETAIL = userDetail.objects.get(Username = request.user.username) #get the row details of the user
        previousSave = DETAIL.Saved # we track the user Saved items 
        context['saveditems'] = previousSave #then we pass the saveditem to the template 


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
                productToSend.append(u) #append to the 'productToSend' list if the length is <5. i.e we only need 5 items from each store on the template
                continue
            else:
                break
        context[i] = productToSend


    return render(request,template,context)


def productStore(request,store,pk):
    template = 'subTemplate/productStore.html'
    check = False
    context = {
        'Itemexist':True,
    }

    for i in userDetail.objects.all():
        if i.Username == request.user.username:
            check = True
            break
        else:
            check = False

    if check:
        DETAIL = userDetail.objects.get(Username = request.user.username)
        previousSave = DETAIL.Saved
        context['saveditems'] = previousSave

    pre_context = {
        'supermarket' : SupermarketModel,
        'fashion' : FashionModel,
        'phone_device' : PhoneDeviceModel,
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

    currentUser = User.objects.get(username=request.user.username)

    if request.method == 'POST':
        new_order = orders.objects.create(
            relation=currentUser,
            username=request.user.username,
            items=request.POST['items'],
            checkout_price = request.POST['checkout_price'],
            address=request.POST['address'],
        )
        return HttpResponseRedirect('/history/')
    else:
        form = buyerOrder()
        context['orderForm'] = form

        stations = userDetail.objects.get(relation=currentUser).Address
        if stations != "":
            context['station'] = stations.split('#')

    return render(request,template,context)



def accountSettings(request):
    template = 'subTemplate/settings.html'
    context =  {}
    check = False

    for i in userDetail.objects.all():
        if i.Username == request.user.username:
            check = True
            break
        else:
            check = False

    if(request.method == 'POST'):
        if check:
            DETAIL = userDetail.objects.get(Username = request.user.username)
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
        if check:
                DETAIL = userDetail.objects.get(Username = request.user.username)
                context['detail'] = DETAIL
        context['settingForm'] = settingForm

    return render(request,template,context)



def accountAddress(request):
    template = 'subTemplate/address.html'
    check = False
    Address = []
    AddressExist = True

    for i in userDetail.objects.all():
        if i.Username == request.user.username:
            check = True
            break
        else:
            check = False

    if(request.method == 'POST'):
        if check:
            DETAIL = userDetail.objects.get(Username = request.user.username)
            DETAIL.Address = request.POST['Address']
            DETAIL.save()
            return HttpResponseRedirect('/address')

        else:
            settingForm = userInfo(request.POST)
            settingForm.save()
            return HttpResponseRedirect('/address')
    else:
        if check:
            DETAIL = userDetail.objects.get(Username = request.user.username)
            ADDRESSLIST = DETAIL.Address
            if ADDRESSLIST == '':
                AddressExist = False
            else:
                ADDRESS = ADDRESSLIST.split('#')
                Address = ADDRESS

    context = {
        'Address':Address,
        'AddressExist' : AddressExist,
        'TotalAddress':ADDRESSLIST
    }    
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
        'SupermarketModel' : SupermarketModel,
        'fashion' : FashionModel,
        'PhoneDeviceModel' : PhoneDeviceModel,
        'MugModel' : MugModel,
        'cake' : CakeModel,
        'ApplianceModel' : ApplianceModel,
        'WineModel' : WineModel,
        'UtensilModel' : UtensilModel,
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
    for i in userDetail.objects.all():
        if i.Username == request.user.username:
            check = True
            break
        else:
            check = False

    if check:
        DETAIL = userDetail.objects.get(Username = request.user.username)
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
    check = False
    allSavedItem = []
    Exist = True
    
    for i in userDetail.objects.all():
        if i.Username == request.user.username:
            check = True
            break
        else:
            check = False

    if check:
        DETAIL = userDetail.objects.get(Username = request.user.username)
        savedItem = DETAIL.Saved    
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
    
        if savedItem != '':
            savedItem = savedItem.split(',')

            for i in savedItem:
                modelTrail = i.split('-')
                allSavedItem.append((pre_context[modelTrail[0]].objects.get(product_code=i)))
        else:
            Exist = False

    context = {
        'savedItem':allSavedItem,
        'itemExist':Exist,
        'saveditems':savedItem,
    }

    return render(request,template,context)


def recentlyViewed(request):
    template = 'subTemplate/productstore.html'
    RecentView = request.COOKIES['recentview']
    AllRecentView = []
    Exist = True
    check = False

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
        DETAIL = userDetail.objects.get(Username = request.user.username)
        previousSave = DETAIL.Saved
        context['saveditems'] = previousSave

    return render(request,template,context)