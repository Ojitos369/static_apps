# Python
import os
import json

# Ojitos369
from ojitos369.utils import print_json as pj

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
        pj(data)
        query = get_d(data, "query")
        parametros = get_d(data, "parametros")
        if not self.conexion.ejecutar(query, parametros):
            self.conexion.rollback()
            self.conexion.commit()
            raise self.MYE("Error al ejecutar el comando")
        self.conexion.commit()
        self.response = {
            "message": "Comando ejecutado correctamente"
        }


class Consulta(PostApi, GetApi):
    def main(self):
        pln("Consulta")
        data = {}
        try:
            data = self.data
        except:
            pass
        pln(f"data:")
        
        pj(data)
        query = get_d(data, "query")
        parametros = get_d(data, "parametros")

        r = self.conexion.consulta_asociativa(query, parametros)

        self.response = {
            "data": r
        }

