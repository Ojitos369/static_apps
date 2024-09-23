from django.urls import path

from .api import (
    Llama, 
)

app_name = 'apis_llama'
urlpatterns = [
    path('llama/', Llama.as_view(), name=f'{app_name}_llama'),
]
# https://sa.ojitos369.com/api/llama/