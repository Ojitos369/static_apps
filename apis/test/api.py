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
        image_b64 = self.data["image_bs4"]
        imagen_bytes = base64.b64decode(image_b64)
        np_arr = np.frombuffer(imagen_bytes, np.uint8)
        imagen = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
        _, binarizada = cv2.threshold(gris, 100, 255, cv2.THRESH_BINARY)
        codigos = pyzbar.decode(binarizada)
        resultados = []

        for codigo in codigos:
            numero = codigo.data.decode('utf-8')
            print(numero)
            resultados.append(numero)

        self.response = {
            "codigos": resultados if resultados else None,
            "mensaje": "Códigos encontrados" if resultados else "No se detectaron códigos"
        }


    
""" 
"""