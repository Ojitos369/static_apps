from django.urls import path

from .api import (
    ProcessVideo, CheckStatus, GetImagesPage, ScheduleCleanup
)

app_name = 'apis_vitim'
urlpatterns = [
    path('process_video/', ProcessVideo.as_view(), name=f'{app_name}_process_video'),
    path('check_status/', CheckStatus.as_view(), name=f'{app_name}_check_status'),
    path('get_images_page/', GetImagesPage.as_view(), name=f'{app_name}_get_images_page'),
    path('schedule_cleanup/', ScheduleCleanup.as_view(), name=f'{app_name}_schedule_cleanup'),
]
