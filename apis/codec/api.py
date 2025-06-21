# Python
import unicodedata

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode
from app.core.utils.compress import Compresor


class Codificar(GetApi, PostApi):
    def main(self):
        self.show_me()
        self.text = self.data["text"]
        comp = Compresor()
        vueltas = 1
        comp= comp.comprimir(self.text, vueltas=vueltas)
        self.response = {
            "text": comp,
        }


class Decodificar(GetApi, PostApi):
    def main(self):
        self.show_me()
        self.text = self.data["text"]
        comp = Compresor()
        text = comp.descomprimir(self.text)
        print("text:", text)
        if not text:
            raise self.MYE("No se pudo recuperar el texto")
        self.response = {
            "text": text,
        }

"""

"""
