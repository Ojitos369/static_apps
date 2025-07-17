from app.settings import docker_mode
# RabbitMQ management api
# broker_api = 'http://guest:guest@rabbit:15672/api/'
broker_api = 'pyamqp://guest@rabbit//' if (docker_mode and True) else 'pyamqp://guest@localhost//'
# Enable debug logging
logging = 'DEBUG'