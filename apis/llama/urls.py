from django.urls import path

from .api import (
    Chat, DelChat, LoadChat, 
)

app_name = 'apis_llama'
urlpatterns = [
    path('chat/', Chat.as_view(), name=f'{app_name}_chat'),
    path('del_chat/', DelChat.as_view(), name=f'{app_name}_del_chat'),
    path('load_chat/', LoadChat.as_view(), name=f'{app_name}_load_chat'),
]
# https://sa.ojitos369.com/api/llama/