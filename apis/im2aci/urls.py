from django.urls import path

from .api import (
    Test, 
    SaveImage, Img2Ascii
)

app_name = 'apis_im2aci'
urlpatterns = [
    path('test', Test.as_view(), name=f'{app_name}_test'),
    path('save_image', SaveImage.as_view(), name=f'{app_name}_save_image'),
    path('img2ascii', Img2Ascii.as_view(), name=f'{app_name}_img2ascii'),
]
# https://sa.ojitos369.com/api/base/