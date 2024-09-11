from django.urls import path

from .api import (
    Test, 
)

app_name = 'apis_test'
urlpatterns = [
    path('test/', Test.as_view(), name=f'{app_name}_test'),
]
# https://sa.ojitos369.com/api/test/