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
        data = self.data
        pln(f"data:")
        from ojitos369.utils import print_json as pj
        pj(data)
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
        pln(f"data:")
        from ojitos369.utils import print_json as pj
        pj(data)
        query = get_d(data, "query", default="no se encontro query")
        parametros = get_d(data, "parametros", default="no se encontro parametros")
        
        pln(f"query: {query}")
        pln(f"parametros: {parametros}")
        pln("Consulta")
        self.response = {
            "message": "upps no hay datos..."
        }

