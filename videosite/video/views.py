from django.shortcuts import render
from rest_framework import viewsets
from .models import Moment, Profile as ProfileModel
from .serializers import MomentSerializer, ProfileSerializer, VideoSerializer




class VideoViewSet(viewsets.ModelViewSet):
    queryset = Moment.objects.all()
    serializer_class = VideoSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = ProfileModel.objects.all()
    serializer_class = ProfileSerializer


class MomentViewSet(viewsets.ModelViewSet):
    queryset = Moment.objects.all().order_by('-created_at')
    serializer_class = MomentSerializer

    def perform_create(self, serializer):
        user_id = self.request.data.get('user_id')
        if user_id:
            serializer.save(user_id=user_id)
        else:
            serializer.save()



