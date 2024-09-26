import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from asgiref.sync import sync_to_async
from django.http import HttpRequest
from django.contrib.auth.models import User
from rest_framework.request import Request

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            "chat",
            self.channel_name
        )
        await self.accept()
        
        print(f"Connected to {self.channel_name}")
    
    async def disconnect(self, close_code):
        print(f"Disconnected from {self.channel_name}, code: {close_code}")

        await self.channel_layer.group_discard(
            "chat",
            self.channel_name
        )
        
        print(f"Disconnected from {self.channel_name}")
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        
        await self.channel_layer.group_send(
            "chat",
            {
                "type": "chat.message",
                "message": message
            }
        )
        
        print(f"Received message: {message}")
        
    async def chat_message(self, event):
        message = event['message']
        
        await self.send(text_data=json.dumps({
            'message': message
        }))
        
        print(f"Sent message: {message}")