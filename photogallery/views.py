from django.shortcuts import render
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response

from .serializers import CommentSerializer, ImageSerializer
from .models import Comment, Image


class ImageView(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

class CommentView(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def create(self, request, image_pk=None):
        data = request.data
        image = Image.objects.all().filter(id=image_pk).first()
        serializer = self.get_serializer(data=data)
        if not serializer.is_valid():
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, image_pk=None):
        list = Comment.objects.all().filter(image=image_pk)
        serializer = self.get_serializer(list, many=True)
        return Response(serializer.data)
