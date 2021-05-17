import json
import os
import requests

from django.db import models
from base64 import b64encode


class Image(models.Model):
    title = models.CharField(max_length=64)
    image = models.ImageField(upload_to='post_images')
    image_url = models.TextField(default="")

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        print(self)
        encodedString = b64encode(self.image.file.read())
        data = {"key": os.environ.get("IMG_BB"), "image": encodedString.decode("utf-8")}
        uploadedImageInfo = requests.post("https://api.imgbb.com/1/upload", data=data)
        jsonResponse = json.loads(uploadedImageInfo.text)
        self.image_url = jsonResponse["data"]["display_url"]
        super().save(*args, **kwargs)


class Comment(models.Model):
    text = models.CharField(max_length=240)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)

    def __str__(self):
        return self.text