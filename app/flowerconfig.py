from app.settings import prod_mode
# RabbitMQ management api
# broker_api = 'http://guest:guest@rabbit:15672/api/'
broker_api = 'pyamqp://guest@rabbitsa//' if (prod_mode and True) else 'pyamqp://guest@localhost//'
# Enable debug logging
logging = 'DEBUG'