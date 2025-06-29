from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VideoViewSet, ProfileViewSet, MomentViewSet, AvatarUploadAPI

router = DefaultRouter()
router.register(r'videos', VideoViewSet, basename='video')  
router.register(r'profiles', ProfileViewSet, basename='profile')  
router.register(r'moments', MomentViewSet, basename='moment') 

urlpatterns = [
    path('', include(router.urls)),
    path('upload-avatar/', AvatarUploadAPI.as_view(), name='upload_avatar'), 
]