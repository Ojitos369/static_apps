from app.settings import prod_mode
CELERY_IMPORTS = ("tasks", )
CELERY_RESULT_BACKEND = "amqp"
BROKER_URL = "amqp://guest:guest@rabbit:5672//" if prod_mode else "amqp://guest:guest@localhost:5672//"
CELERY_TASK_RESULT_EXPIRES = 300
