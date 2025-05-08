# Python
import os
import base64
from uuid import uuid4
# User
from . import Im2Aci
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode
from app.settings import MEDIA_DIR, STATIC_URL


class Test(GetApi):
    def main(self):
        self.show_me()

        self.response = {
            'message': 'Hola desde test'
        }


class SaveImage(PostApi):
    def main(self):
        self.show_me()
        img_b64 = self.data["img_b64"]
        path_to_save = os.path.join(STATIC_URL, f"image_temp")
        file_name = uuid4()
        # ext = get_d(self.data, "ext", "png")
        ext = self.data.get("ext", "png")
        file_path = os.path.join(path_to_save, f"{file_name}.{ext}")
        with open(file_path, "wb") as f:
            f.write(base64.b64decode(img_b64))
        self.response = {
            "file_name": f"{file_name}.{ext}",
        }


class Img2Ascii(GetApi):
    def main(self):
        self.show_me()
        path_to_save = os.path.join(STATIC_URL, f"image_temp")
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

