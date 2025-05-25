from django import forms
from django import Video


class VideoUpload(forms.ModelForm):
    class Meta:
        model = Video
        fields = ['title', 'audio_file']




