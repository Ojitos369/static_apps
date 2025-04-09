# Python
import datetime
import base64
import cv2
import numpy as np
from pyzbar import pyzbar
import datetime

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


class TestImage(GetApi, PostApi):
    def main(self):
        self.show_me()
        print(datetime.datetime.now())
        # Obtener la imagen en base64 desde self.data
        image_b64 = self.data["image_bs4"]

        # Decodificar el base64 a binario
        imagen_bytes = base64.b64decode(image_b64)

        # Convertir los bytes a un arreglo de NumPy
        np_arr = np.frombuffer(imagen_bytes, np.uint8)

        # Decodificar la imagen como si fuera leída por imread
        imagen = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Convertir a escala de grises
        gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)

        # Aplicar un umbral para binarizar la imagen
        _, binarizada = cv2.threshold(gris, 100, 255, cv2.THRESH_BINARY)

        # Saltamos el inpainting porque no se tiene la información de obstrucción

        # Decodificar el código de barras o QR
        codigos = pyzbar.decode(binarizada)
        resultados = []

        for codigo in codigos:
            numero = codigo.data.decode('utf-8')
            resultados.append(numero)

        self.response = {
            "codigos": resultados if resultados else None,
            "mensaje": "Códigos encontrados" if resultados else "No se detectaron códigos"
        }


    
""" 
"""