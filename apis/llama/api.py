# Python
import os
import uuid
import json
import requests

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode
from app.settings import MEDIA_DIR


class Llama(GetApi):
    def main(self):
        msg = self.data["msg"]
        cid = get_d(self.data, "cid", default=None)
        self.path = f"{MEDIA_DIR}/json"
        # http://localhost:8369/api/llama/llama/?cid=550341&msg=hola%20que%20tal

        if not cid:
            cid = uuid.uuid4().hex[:6]
            self.file_name = f"cid_{cid}.json"
            self.c_data = {"hist": []}
            if not os.path.exists(self.path):
                os.makedirs(self.path)

            self.save_chat_data()
        else:
            self.file_name = f"cid_{cid}.json"
        
        self.load_chat_data()
        
        self.c_data["hist"].append({"role": "user", "content": msg})
        self.save_chat_data()

        respuesta = None

        link = "https://hlhxxj89-11434.usw3.devtunnels.ms/api/chat"
        
        data = {
            "model": "llama3.1",
            "messages": self.c_data["hist"],
            "stream": False,
            "options": {
                # "seed": 123,
                "temperature": 0
            }
        }

        timeout = 300
        r = requests.post(link, json=data, timeout=timeout)
        text = r.text
        print(text)
        respuesta = json.loads(text)
        pln(respuesta)
        
        message = respuesta["message"]
        self.c_data["hist"].append(message)
        self.save_chat_data()
        
        self.response = {
            "msg": message["content"],
            "cid": cid,
            "nota": "Pasar el cid en los parametros para conservar el historial",
            "cid_e": f"cid={cid}"
        }

    def save_chat_data(self):
        with open(f"{self.path}/{self.file_name}", "w") as f:
            json.dump(self.c_data, f, indent=4)
    
    def load_chat_data(self):
        with open(f"{self.path}/{self.file_name}", "r") as f:
            self.c_data = json.load(f)


""" 
Aprendizaje automático con Python de Aurélien Géron
Machine Learning de Tom Mitchell
"""