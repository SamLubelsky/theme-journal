from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User

# class CreateAccountForm(forms.Form):
#     email = forms.EmailField()
#     username = forms.CharField(max_length=30, min_length=5)
#     password = forms.CharField(min_length = 10, max_length = 100)
#     if user 

class UserModelForm(ModelForm):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']