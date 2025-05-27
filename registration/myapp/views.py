from django.shortcuts import render
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView , CreateView
from .forms import TrackUploadForm, RegisterUserForm, LoginUserForm, ProfileAvatarForm
from django.shortcuts import render, redirect

class RegisterUser(CreateView):
    form_class = RegisterUserForm
  

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "Регистрация"
        return context

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
    
class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'song/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "Авторизация"
        return context



