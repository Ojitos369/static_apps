# Python
import os
import uuid
import json
import requests
import datetime
import hashlib

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode


class Test(GetApi, PostApi):
    def main(self):
        self.show_me()
        from ojitos369.utils import print_json as pj
        pj(self.data)
        self.response = {
            'message': 'Test',
            'data': self.data
        }
        
""" 
"""