from django.urls import path, include

from apis.api import HelloWorld

app_name = 'apis'
urlpatterns = [
    path('hello_world/', HelloWorld.as_view(), name=f'{app_name}_hello_world'),
    path('gpt_con/', include('apis.gpt_con.urls'), name=f'{app_name}_gpt_con'),
    path('codec/', include('apis.codec.urls'), name=f'{app_name}_gpt_con'),
    path('base/', include('apis.base.urls'), name=f'{app_name}_base'),
    path('test/', include('apis.test.urls'), name=f'{app_name}_test'),
    path('llama/', include('apis.llama.urls'), name=f'{app_name}_llama'),
]