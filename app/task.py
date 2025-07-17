# Python
import json
import os
import datetime
import base64

# Ojitos369
from ojitos369.utils import printwln as pln

# User
from app.celery import celery_app
from app.settings import prod_mode, ce, STATIC_URL, MEDIA_DIR
from apis.vitim.vitim import Vitim
import shutil

@celery_app.task
def vitim_celery(data):
    options = data["options"]
    video_b64 = data["video_b64"]
    key = data["key"]
    
    # Directorio temporal para el video subido
    temp_video_dir = os.path.join(MEDIA_DIR, "vitim", key, "temp")
    if not os.path.exists(temp_video_dir):
        os.makedirs(temp_video_dir)

    # Decodificar video_b64 y guardarlo en un archivo temporal
    video_path = os.path.join(temp_video_dir, f"{key}.mp4")
    with open(video_path, "wb") as fh:
        if ',' in video_b64:
            video_b64 = video_b64.split(',')[1]
        missing_padding = len(video_b64) % 4
        if missing_padding:
            video_b64 += '=' * (4 - missing_padding)
        fh.write(base64.b64decode(video_b64))

    # Llamar a Vitim con las opciones
    file=video_path
    path=None # El path se define dentro de la clase Vitim
    name=options.get("name", key)
    fps=options.get("fps", None)
    type_img=options.get("typeImg", None)
    start=options.get("start", None)
    end=options.get("end", None)
    
    vitim = Vitim(file, path, name, fps, type_img, start, end, key)
    vitim.process()

    # Limpiar el video temporal después del procesamiento
    if os.path.exists(temp_video_dir):
        shutil.rmtree(temp_video_dir)
    
@celery_app.task
def schedule_cleanup(key):
    """
    Elimina las carpetas de resultados de un proceso Vitim después de un tiempo.
    """
    try:
        # Eliminar directorio de media (json)
        media_directory_path = os.path.join(MEDIA_DIR, "vitim", key)
        if os.path.exists(media_directory_path):
            shutil.rmtree(media_directory_path)
            pln(f"Limpieza programada: Directorio de media {media_directory_path} eliminado.")
        else:
            pln(f"Limpieza programada: Directorio de media {media_directory_path} no encontrado.")
            
        # Eliminar directorio de static (imágenes, zip)
        static_directory_path = os.path.join(os.path.abspath(os.path.join(MEDIA_DIR, '..', 'static')), "vitim", key)
        if os.path.exists(static_directory_path):
            shutil.rmtree(static_directory_path)
            pln(f"Limpieza programada: Directorio estático {static_directory_path} eliminado.")
        else:
            pln(f"Limpieza programada: Directorio estático {static_directory_path} no encontrado.")

    except Exception as e:
        pln(f"Error en la limpieza programada para la clave {key}: {e}")


@celery_app.task
def test_celery(data):
    pln(f"test_celery: {data}")
    # save file in STATIC_URL/test, create if does not exist
    path_to_save = os.path.join(STATIC_URL, "test")
    if not os.path.exists(path_to_save):
        os.makedirs(path_to_save)
    # save data to a file
    with open(os.path.join(path_to_save, f"{datetime.datetime.now()}.json"), "w") as f:
        f.write(json.dumps(data))
        f.close()
    return {"status": "ok"}