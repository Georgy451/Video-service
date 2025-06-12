from rest_framework import serializers
from .models import Profile, Moment

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moment
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class MomentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  
    class Meta:
        model = Moment
        fields = '__all__' 