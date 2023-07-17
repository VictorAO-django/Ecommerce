from django.contrib import admin

from .models import userDetail,orders

class UserDetail(admin.ModelAdmin):
    search_fields = ('Firstname','Username')
    list_display = ('Firstname','Lastname','Username','Gender')
    list_filter = ('Gender','Username')
    ordering = ('id',)
    readonly = ('Username',)

class orderAdmin(admin.ModelAdmin):
    search_fields = ('status',)
    list_display = ('Username','date','checkoutprice','status')
    list_filter = ('date','status')
    ordering = ('status',)
    readonly = ('checkoutprice','date','items','Username','Address')

admin.site.register(userDetail,UserDetail)
admin.site.register(orders,orderAdmin)
# Register your models here.
