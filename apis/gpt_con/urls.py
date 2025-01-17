from django.urls import path

from .api import HelloWorld, Chat

app_name = 'apis_gpt_con'
urlpatterns = [
    path('', HelloWorld.as_view(), name=f'{app_name}_hello_world'),
    path('chat/', Chat.as_view(), name=f'{app_name}_chat'),
]
# https://sa.ojitos369.com/api/gpt_con/ejecutar/
""" 
./ddp.sh --name "sa" --repo "git@github.com:Ojitos369/static_apps.git" --py "python3.11" --url "sa.ojitos369.com"
"""