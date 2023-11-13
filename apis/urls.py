from django.urls import path

from apis.api import HelloWorld

app_name = 'apis'
urlpatterns = [
    path('hello_world/', HelloWorld.as_view(), name=f'{app_name}_hello_world'),
]