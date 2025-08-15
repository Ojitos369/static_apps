# Python
import os
import base64
from uuid import uuid4

# User
from . import Im2Aci
from core.bases.apis import BaseApi, pln
from core.conf.settings import MEDIA_DIR


class SaveImage(BaseApi):
    def main(self):
        self.show_me()
        img_b64 = self.data["img_b64"]
        path_to_save = os.path.join(MEDIA_DIR, f"image_temp")
        file_name = uuid4()
        ext = self.data.get("ext", "png")
        file_path = os.path.join(path_to_save, f"{file_name}.{ext}")
        os.makedirs(path_to_save, exist_ok=True)
        with open(file_path, "wb") as f:
            f.write(base64.b64decode(img_b64))
        new_file_name = f"{file_name}.{ext}"
        self.response = {
            "file_name": new_file_name,
        }


class Img2Ascii(BaseApi):
    def main(self):
        self.show_me()
        path_to_save = os.path.join(MEDIA_DIR, f"image_temp")
        file_name = self.data["file_name"]
        ancho = int(self.data.get("ancho", '100'))
        save_text = self.data.get("save_text", "false")
        save_text = save_text.lower() == "true"
        rmbg = self.data.get("rmbg", "true")
        rmbg = rmbg.lower() == "true"

        i2a = Im2Aci(
            ruta=os.path.join(path_to_save, file_name),
            nuevo_ancho=ancho,
            save_text=save_text,
            rmbg=rmbg
        )
        i2a.run()
        self.response = {
            "arte_ascii": i2a.arte_ascii
        }