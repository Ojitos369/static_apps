from django.urls import path

from .api import (
    ProcessVideo,
)

app_name = 'apis_vitim'
urlpatterns = [
    path('process_video/', ProcessVideo.as_view(), name=f'{app_name}_process_video'),
]
