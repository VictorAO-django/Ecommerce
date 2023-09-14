from django.contrib import admin

from .models import userDetail,orders

class UserDetail(admin.ModelAdmin):
    search_fields = ('Firstname','Username')
    list_display = ('Firstname','Lastname','Username','Gender')
    list_filter = ('Gender','Username')
    ordering = ('id',)
    readonly = ('Username',)

class orderAdmin(admin.ModelAdmin):
    search_fields = ('status','relation')
    list_display = ('relation','unique_id','checkout_price','status')
    list_filter = ('date','status','relation')
    ordering = ('status',)
    readonly = ('checkout_price','date','items','address')

admin.site.register(userDetail,UserDetail)
admin.site.register(orders,orderAdmin)
# Register your models here.
