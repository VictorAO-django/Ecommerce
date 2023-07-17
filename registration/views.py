from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect

from berylapp.forms import userInfo
# Create your views here.

class Register(CreateView):
    template_name = 'registration/register.html'
    form_class = UserCreationForm
    def form_valid(self,form):
        form.save()
        return HttpResponseRedirect('/login/?next=/personaldetail')



def personalSetting(request):
    template = 'registration/personaldetails.html'

    if request.method == 'POST':
        form = userInfo(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
    else:
        form = userInfo()

    return render(request,template)


def accountHistory(request):
    template = 'subTemplate/history.html'

    return render(request,template)