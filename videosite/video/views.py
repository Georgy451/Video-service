from django.shortcuts import render
from rest_framework import viewsets
from .models import Moment, Profile as ProfileModel
from .serializers import MomentSerializer, ProfileSerializer, VideoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Profile
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action




class VideoViewSet(viewsets.ModelViewSet):
    queryset = Moment.objects.all()
    serializer_class = VideoSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = ProfileModel.objects.all()
    serializer_class = ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        user_id = kwargs.get('pk')
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        profile, created = ProfileModel.objects.get_or_create(user=user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

class MomentViewSet(viewsets.ModelViewSet):
    queryset = Moment.objects.all().order_by('-created_at')
    serializer_class = MomentSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user')
        if user_id:
            return Moment.objects.filter(user_id=user_id).order_by('-created_at')
        return Moment.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        user_id = self.request.data.get('user_id')
        if user_id:
            serializer.save(user_id=user_id)
        else:
            serializer.save()

    @action(detail=True, methods=['post'], url_path='like')
    def add_like(self, request, pk=None):
        moment = self.get_object()
        moment.likes += 1
        moment.save()
        return Response({"likes": moment.likes}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='comment')
    def add_comment(self, request, pk=None):
        moment = self.get_object()
        new_comment = request.data.get("comment")
        if new_comment:
            moment.comments = f"{moment.comments}\n{new_comment}" if moment.comments else new_comment
            moment.save()
            return Response({"comments": moment.comments.split("\n")}, status=status.HTTP_200_OK)
        return Response({"detail": "Комментарий обязателен"}, status=status.HTTP_400_BAD_REQUEST)


class AvatarUploadAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)  

    def patch(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        avatar = request.FILES.get("avatar")

        if not user_id or not avatar:
            return Response({"detail": "user_id и avatar обязательны"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            profile, created = Profile.objects.get_or_create(user=user)
            profile.avatar = avatar
            profile.save()
            return Response({"detail": "Аватар успешно обновлен", "avatar_url": profile.avatar.url}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "Пользователь не найден"}, status=status.HTTP_404_NOT_FOUND)



