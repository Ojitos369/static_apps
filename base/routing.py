from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/commands/', consumers.CommandConsumer.as_asgi()),
]