# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode


class Test(GetApi):
    def main(self):
        self.show_me()

        self.response = {
            'message': 'Hola desde test'
        }

