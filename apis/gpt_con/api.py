# Python
import os
import json

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln

class HelloWorld(GetApi):
    def main(self):
        self.response = {
            'message': 'Hola desde gpt'
        }


class Ejecutar(PostApi, GetApi):
    def main(self):
        pln("Ejecutar")
        self.response = {
            "message": "upps no hay datos..."
        }


class Consulta(PostApi, GetApi):
    def main(self):
        data = {}
        try:
            data = self.data
        except:
            pass
        query = get_d(data, "query", default="no se encontro query")
        parametros = get_d(data, "parametros", default="no se encontro parametros")
        
        pln(f"query: {query}")
        pln(f"parametros: {parametros}")
        pln("Consulta")
        self.response = {
            "message": "upps no hay datos..."
        }
