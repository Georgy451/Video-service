from django.db import models
from django.contrib.auth.models import User

class Video(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    video_file = models.FileField(upload_to='video/',)
    uploaded_at = models.DateTimeField(auto_now_add=True) 

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,)
    bio = models.TextField(blank=True, default='')
    status = models.CharField(max_length=100,)
    avatar = models.ImageField(upload_to='avatars/') 


