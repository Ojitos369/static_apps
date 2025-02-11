from django.urls import path

from .api import (
    Codificar, Decodificar, 
)

app_name = 'apis_codec'
urlpatterns = [
    path('codificar/', Codificar.as_view(), name=f'{app_name}_codificar'),
    path('decodificar/', Decodificar.as_view(), name=f'{app_name}_decodificar'),
]

# https://sa.ojitos369.com/api/base/