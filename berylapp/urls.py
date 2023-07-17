"""beryl URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import rootPage,shoppingCart,accountSettings,accountAddress,cartDetail,productStore,saveItem,savedItems,recentlyViewed
from registration.views import accountHistory

urlpatterns = [
    path('',rootPage,name='root'),
    path('cart',shoppingCart),
    path('settings',accountSettings),
    path('address',accountAddress),
    path('getdetail',cartDetail),
    path('saveditems',savedItems),
    path('saveItem/<str:code>',saveItem),
    path('recentlyViewed',recentlyViewed),
]
