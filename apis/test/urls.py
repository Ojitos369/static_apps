from django.urls import path

from .api import (
    Test, TestImage
)

app_name = 'apis_test'
urlpatterns = [
    path('test/', Test.as_view(), name=f'{app_name}_test'),
    path('test_image/', TestImage.as_view(), name=f'{app_name}_test_image'),
]
# https://sa.ojitos369.com/api/test/