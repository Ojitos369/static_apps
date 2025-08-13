from core.bases.apis import BaseApi, pln

# Python
import unicodedata
import base64
import os

# User
from core.conf.settings import prod_mode

# try:
#     from core.utils.compress import Compresor
# except:
#     print("No se encontro el Compresor")
#     class Compresor: pass
class Compresor: pass

class Codificar(BaseApi):
    def main(self):
        entrada = self.data["text"]          # texto o base64 de archivo
        modo    = self.data.get("mode", "text")
        comp    = Compresor()
        codigo  = comp.comprimir(entrada, tipo=modo, vueltas=1)
        if not codigo:
            raise self.MYE("No se pudo comprimir.")
        self.response = {"text": codigo}

class Decodificar(BaseApi):
    def main(self):
        codigo = self.data["text"]
        modo   = self.data.get("mode", "text")
        comp   = Compresor()
        res    = comp.descomprimir(codigo, tipo=modo)
        if res is None:
            raise self.MYE("No se pudo descomprimir.")
        self.response = {"text": res}
