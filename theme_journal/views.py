from django.contrib.auth.models import User
from django.views.generic.edit import CreateView
from .forms import UserModelForm
from django.http import HttpResponseRedirect
from django.shortcuts import render
# class UserCreate(CreateView):
#     model = User
#     fields = ['email', 'username', 'password']
#     success_url="/accounts/login"

def UserCreate(request):
    if request.method == 'POST':
        form = UserModelForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            email = form.cleaned_data['email']
            User.objects.create_user(username, email, password)
            return HttpResponseRedirect('/')
        else:
            context = {
                'form':form
            }
            return render(request, 'registration/user_form.html', context)
    else:
        form = UserModelForm()
        
        context = {
            'form': form
        }

        return render(request, 'registration/user_form.html', context)