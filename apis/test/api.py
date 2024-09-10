# Python
import os

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode


class Test(GetApi):
    def main(self):
        self.show_me()
        
        PIXEL_ID = os.environ.get('FACEBOOK_PIXEL_ID')
        CLIENT_KEY = os.environ.get('FACEBOOK_CLIENT_KEY')

        self.response = {
            'message': 'Hola desde test'
        }

