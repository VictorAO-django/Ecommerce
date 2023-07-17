from django.contrib import admin

from .models import SupermarketModel,FashionModel,PhoneDeviceModel,MugModel,CakeModel,ApplianceModel,WineModel,UtensilModel,BookModel

class ModelMutant(admin.ModelAdmin):
    search_fields = ('product_code','price')
    list_display = ('product_code','price','price_to_sell')
    list_filter = ('product_code','date_added')
    ordering = ('product_code',)
    readonly_fields = ('date_added',)


admin.site.register(SupermarketModel,ModelMutant)
admin.site.register(FashionModel,ModelMutant)
admin.site.register(PhoneDeviceModel,ModelMutant)
admin.site.register(MugModel,ModelMutant)
admin.site.register(CakeModel,ModelMutant)
admin.site.register(ApplianceModel,ModelMutant)
admin.site.register(WineModel,ModelMutant)
admin.site.register(UtensilModel,ModelMutant)
admin.site.register(BookModel,ModelMutant)

# Register your models here.
