from django.shortcuts import render
from .models import *
from django.views import View

def base(request):
    return render(request,)


class VideoViews(View):
    form = Video()


