from django.contrib import admin
from .models import Comment, Image


class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'image', 'image_url')


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'created_at', 'image')

# Register your models here

admin.site.register(Image, ImageAdmin)
admin.site.register(Comment, CommentAdmin)