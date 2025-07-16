from __future__ import absolute_import, unicode_literals
import os
from app.settings import prod_mode

from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

broker = 'pyamqp://guest@rabbit//' if prod_mode else 'pyamqp://guest@localhost//'
celery_app = Celery('task', include = ['app.task'], broker=broker)

#   should have a `CELERY_` prefix.
celery_app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
celery_app.autodiscover_tasks()

from celery.schedules import crontab


