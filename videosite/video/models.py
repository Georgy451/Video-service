from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/')

class Moment(models.Model):
    video = models.FileField(upload_to='video/')
    emotion = models.CharField(max_length=10, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Связь с пользователем
    location = models.CharField(max_length=255, blank=True, null=True)
    likes = models.PositiveIntegerField(default=0)  # Поле для хранения количества лайков
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.created_at}"


