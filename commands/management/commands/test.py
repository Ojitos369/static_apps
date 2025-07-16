import os
from app.core.bases.commands import MyBaseCommand, pj, pln, TF, get_d

class Command(MyBaseCommand):
    def main(self, *args, **options):
        print('Running command testing')

""" 
* * * * * python /usr/src/app/app/manage.py testing > /usr/src/logs/testing.log 2>>&1
"""