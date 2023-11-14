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


"""
si te dicen consulta, haras una consulta a la tabla tickets
si te dicen agregar, agregaras los datos
para esta prueba inventaras los datos al momento de agregar
tickets (id_ticket(auto), nombre(opt), usuario(req), correo(req), telefono(opt), asunto(tu_lo_generas), mensaje(tu_lo_generas), status('P'), fecha(now))
* la db es mariadb
* se debe pasar el query y los parametros del query, en lo posible procura utilizar los parametros en lugar de valores directos en el query
{
  "openapi": "3.1.0",
  "info": {
    "title": "API de Interacción con GPT",
    "description": "Permite ejecutar y consultar comandos con GPT.",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://sa.ojitos369.com"
    }
  ],
  "paths": {
    "/api/gpt_con/ejecutar/": {
      "post": {
        "description": "Para ejecutar querys, guardar, actualizar, eliminar",
        "operationId": "EjecutarComando",
        "parameters": [
          {
            "name": "query",
            "in": "body",
            "description": "El comando a ejecutar.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "parametros",
            "in": "body",
            "description": "Lista de parámetros adicionales para el comando.",
            "required": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        ],
        "deprecated": false
      }
    },
    "/api/gpt_con/consulta/": {
      "post": {
        "description": "Para consulta de informacion con querys, leer, buscar, filtrar",
        "operationId": "ConsultarComando",
        "parameters": [
          {
            "name": "query",
            "in": "body",
            "description": "El comando a consultar.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "parametros",
            "in": "body",
            "description": "Lista de parámetros adicionales para la consulta.",
            "required": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        ],
        "deprecated": false
      }
    }
  },
  "components": {
    "schemas": {}
  }
}
"""