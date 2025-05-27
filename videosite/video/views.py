from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.utils import timezone
import random

from .models import *
from .forms import VideoUpload




class VideoViews(ListView):
    model = Video
    context_object_name = 'videos'
    template_name = 'feed.html'

    def get_queryset(self):
        qs = list(Video.objects.all())
        random.shuffle(qs)
        return qs
    



class FilteredFeedView(ListView):
    model = Video
    template_name = 'filtered_feed.html'
    context_object_name = 'videos'

    def get_queryset(self):
        qs = Video.objects.all()
        emotion = self.request.GET.get('emotion')
        date = self.request.GET.get('date')
        location = self.request.GET.get('location')

        if emotion:
            qs = qs.filter(emotion=emotion)
        if date == 'today':
            qs = qs.filter(uploaded_at__date=timezone.now().date())
        elif date == 'week':
            week_ago = timezone.now() - timezone.timedelta(days=7)
            qs = qs.filter(uploaded_at__gte=week_ago)
        if location:
            qs = qs.filter(location__icontains=location)

        return qs.order_by('-uploaded_at')
    
    


class Profile(LoginRequiredMixin, DetailView):
    model = Profile
    
    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    



class Search():
    model = Video
    def get_queryset(self):
        query = self.request.GET.get('q')
        if query:
            return Video.objects.filter(Q(video_file__icontains=query))





class UploadMoment(CreateView):
    model = Video
    form = VideoUpload

    def form_valid(self, form):
        return super().form_valid(form)



