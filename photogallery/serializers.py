from rest_framework import serializers

from .models import Comment, Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'title', 'image_url']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'created_at', 'image']
        read_only_fields = ['created_at']
    
    def to_representation(self, instance):
        self.fields['image'] = ImageSerializer(read_only=True)
        return super(CommentSerializer, self).to_representation(instance)