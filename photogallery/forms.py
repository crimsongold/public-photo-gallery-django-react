from django import forms
from .models import Comment, Image


class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ('title', 'image', 'image_url')


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('text',)