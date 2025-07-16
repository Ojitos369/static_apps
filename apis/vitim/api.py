import os
import uuid
import json
from app.core.bases.apis import PostApi, GetApi
from app.task import vitim_celery, schedule_cleanup
from app.settings import MEDIA_DIR, STATIC_URL
from django.http import Http404
from django.conf import settings

class ProcessVideo(PostApi):
    def main(self):
        video_b64 = self.data.get('video')
        options = self.data.get('options', {})
        key = str(uuid.uuid4())
        args = {"options": options, "video_b64": video_b64, "key": key}
        vitim_celery.apply_async(args=[args])
        self.response = {
            "message": "Iniciando",
            "key": key
        }


class CheckStatus(GetApi):
    """
    API para consultar el estado de un proceso de extracción de frames.
    Busca por 'key' el estado del proceso y devuelve el JSON de estado
    junto con la cantidad de imágenes generadas.
    """
    def main(self):
        key = self.request.GET.get('key')
        if not key:
            self.status_code = 400
            self.response = {"error": "El parámetro 'key' es requerido."}
            return

        base_vitim_path = os.path.join(MEDIA_DIR, "vitim", key)
        status_file_path = os.path.join(base_vitim_path, f"{key}.json")
        frames_path = os.path.join(settings.STATIC_ROOT, "vitim", key, "frames")

        if not os.path.exists(status_file_path):
            self.status_code = 404
            self.response = {"error": "Proceso no encontrado."}
            return

        with open(status_file_path, 'r') as f:
            status_data = json.load(f)

        image_count = 0
        if os.path.exists(frames_path) and os.path.isdir(frames_path):
            image_count = len(os.listdir(frames_path))

        self.response = {
            "status": status_data,
            "image_count": image_count
        }

class GetImagesPage(GetApi):
    """
    API para obtener una página de imágenes de un proceso.
    """
    def main(self):
        key = self.request.GET.get('key')
        page = int(self.request.GET.get('page', 1))
        limit = int(self.request.GET.get('limit', 20))

        if not key:
            self.status_code = 400
            self.response = {"error": "El parámetro 'key' es requerido."}
            return

        frames_path = os.path.join(settings.STATIC_ROOT, "vitim", key, "frames")
        if not os.path.exists(frames_path) or not os.path.isdir(frames_path):
            self.status_code = 404
            self.response = {"error": "Directorio de frames no encontrado."}
            return

        try:
            image_list = sorted(os.listdir(frames_path))
        except FileNotFoundError:
            self.status_code = 404
            self.response = {"error": "Proceso no encontrado o finalizado."}
            return

        start = (page - 1) * limit
        end = start + limit
        paginated_images = image_list[start:end]

        image_urls = [f"/static/vitim/{key}/frames/{img}" for img in paginated_images]

        self.response = {
            "images": image_urls,
            "total_images": len(image_list),
            "current_page": page,
            "has_next": end < len(image_list)
        }

class ScheduleCleanup(PostApi):
    """
    API para programar la eliminación de los archivos de un proceso.
    """
    def main(self):
        key = self.data.get('key')
        if not key:
            self.status_code = 400
            self.response = {"error": "El parámetro 'key' es requerido."}
            return

        schedule_cleanup.apply_async(args=[key], countdown=1800)
        
        self.response = {
            "message": f"Limpieza programada para la clave {key} en 30 minutos."
        }


""" 
en base a los siguientes archivos:
app/task.py
apis/vitim
front/src/Pages/Vitim
front/src/Hooks/useStates/functions.jsx

realiza los siguientes cambios:
* en el front al mostrar las imagenes no se ven, no las encuentra
* las imagenes, video y zip se deben de guardar en static/vitim/[key], ahorita parece que se guarda en media. El json de status es el unico que se debe guardar en media.
* todos los campos del status se deben mostrar en el resumen del front tambien
* una vez que termina el processamiento se debe de seguir mostrando el resumen y las imagenes en el front, con la opcion de descargar el zip y el mensaje con la hora a la que se eliminaran
* la galeria debe mostrar las imagenes que se acomoden cada una de acuerdo a su ratio (width:height)
* al hacer hover en la imagen que se muestre un leve preview y al hacer click que se habra en una ventana nueva
"""