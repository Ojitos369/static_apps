import numpy as np
import os
import argparse
import uuid
import json
from datetime import datetime, timedelta
from app.settings import MEDIA_DIR, STATIC_URL

class Vitim:
    def __init__(self, file, path, name, fps, type_img, start, end, key=None):
        self.video_file = file
        self.path_save = path
        self.base_name = name
        self.ext = type_img
        self.start_str = start
        self.end_str = end
        self.SAVING_FRAMES_PER_SECOND = 10 if not fps else int(fps)
        self.key = key if key else str(uuid.uuid4())
        
        # --- Rutas para guardar archivos ---
        # Directorio base para los datos de esta instancia de Vitim
        self.base_vitim_path = os.path.join(MEDIA_DIR, "vitim", self.key)
        # Directorio para guardar los archivos estáticos (imágenes, zip)
        self.static_path = os.path.join(STATIC_URL, "vitim", self.key)
        # Ruta para guardar los frames extraídos
        self.path_save = os.path.join(self.static_path, "frames")
        # Ruta para el archivo de estado
        self.status_file_path = os.path.join(self.base_vitim_path, f"{self.key}.json")

        # --- Variables de estado y tiempo ---
        self.status_data = {}
        self.process_start_time = None
        self.images_generated = 0

    @staticmethod
    def _format_timedelta(td):
        """Formatea un timedelta a una cadena HH-MM-SS.ms."""
        result = str(td)
        try:
            result, ms = result.split(".")
        except ValueError:
            return result.replace(":", "-") + ".00"
        ms = int(ms)
        ms = round(ms / 1e4)
        return f"{result}.{ms:02}".replace(":", "-")

    @staticmethod
    def _get_time_seconds(time_str):
        """Convierte una cadena de tiempo (ej. 00:01:30) a segundos."""
        if not time_str:
            return 0
        parts = str(time_str).replace('-', ':').split(':')
        parts.reverse()
        seconds = 0
        if len(parts) > 0:
            seconds += int(parts[0])
        if len(parts) > 1:
            seconds += int(parts[1]) * 60
        if len(parts) > 2:
            seconds += int(parts[2]) * 3600
        return seconds

    def _initialize_status_file(self, video_clip):
        """Crea y inicializa el archivo status.json."""
        os.makedirs(self.base_vitim_path, exist_ok=True)
        os.makedirs(self.static_path, exist_ok=True)

        time_start_sec = self._get_time_seconds(self.start_str)
        time_end_sec = self._get_time_seconds(self.end_str)
        
        if time_end_sec <= 0 or time_end_sec > video_clip.duration:
            time_end_sec = video_clip.duration

        effective_duration = time_end_sec - time_start_sec
        saving_fps = min(video_clip.fps, self.SAVING_FRAMES_PER_SECOND)
        total_images = int(effective_duration * saving_fps) if saving_fps > 0 else int(effective_duration * video_clip.fps)

        self.process_start_time = datetime.now()
        
        self.status_data = {
            "key": self.key,
            "base_name": self.base_name,
            "saving_fps": saving_fps,
            "inicio": self.start_str,
            "fin": self.end_str,
            "vueltas": 0,
            "inicio_proceso": self.process_start_time.isoformat(),
            "fin_proceso": None,
            "tiempo_transcurrido": "0s",
            "estatus": "Procesando",
            "tiempo_total_aproximado": "Calculando...",
            "tiempo_restante_aproximado": "Calculando...",
            "imagenes_totales": total_images,
            "zip_path": None
        }
        self._write_status()

    def _update_status(self, final_status=None):
        """Actualiza el archivo status.json con el progreso actual."""
        if not self.process_start_time:
            return

        now = datetime.now()
        elapsed_time = now - self.process_start_time
        self.status_data["tiempo_transcurrido"] = str(elapsed_time).split('.')[0]
        self.status_data["vueltas"] = self.images_generated

        if self.images_generated > 0:
            total_images = self.status_data["imagenes_totales"]
            if total_images > 0:
                # Estimación de tiempo
                estimated_total_time_sec = (elapsed_time.total_seconds() / self.images_generated) * total_images
                estimated_remaining_time_sec = estimated_total_time_sec - elapsed_time.total_seconds()

                self.status_data["tiempo_total_aproximado"] = str(timedelta(seconds=int(estimated_total_time_sec))).split('.')[0]
                self.status_data["tiempo_restante_aproximado"] = str(timedelta(seconds=max(0, int(estimated_remaining_time_sec)))).split('.')[0]

        if final_status:
            self.status_data["estatus"] = final_status
            self.status_data["fin_proceso"] = now.isoformat()
            if final_status == "Done":
                self.status_data["tiempo_restante_aproximado"] = "0s"


        self._write_status()

    def _write_status(self):
        """Escribe el diccionario de estado en el archivo JSON."""
        with open(self.status_file_path, 'w') as f:
            json.dump(self.status_data, f, indent=4)

    def process(self):
        """Función principal para procesar el video y extraer frames."""
        from moviepy.editor import VideoFileClip

        if not self.video_file:
            raise Exception('Debe especificar un archivo de video (--file <video_file>)')

        self.base_name = self.base_name if self.base_name else "".join(os.path.basename(self.video_file).split(".")[:-1])
        
        video_clip = VideoFileClip(self.video_file)
        
        # Inicializar el archivo de estado
        self._initialize_status_file(video_clip)

        try:
            os.makedirs(self.path_save, exist_ok=True)
            
            if not self.ext:
                self.ext = 'png'
            
            saving_fps = min(video_clip.fps, self.SAVING_FRAMES_PER_SECOND)
        
            print(f'\nVideo file: {self.video_file}\nPath to save: {self.path_save}\nBase name: {self.base_name}\nFPS: {self.SAVING_FRAMES_PER_SECOND} -> {saving_fps}\nExtension: {self.ext}\n')
        
            step = 1 / saving_fps if saving_fps > 0 else 1 / video_clip.fps
            
            time_start_sec = self._get_time_seconds(self.start_str)
            time_end_sec = self._get_time_seconds(self.end_str)
            if time_end_sec <= 0 or time_end_sec > video_clip.duration:
                time_end_sec = video_clip.duration
            
            print(f'Start: {time_start_sec}s | End: {time_end_sec}s | Duration: {time_end_sec - time_start_sec}s')
            
            for current_duration in np.arange(time_start_sec, time_end_sec, step):
                self.images_generated += 1
                
                frame_duration_formatted = self._format_timedelta(timedelta(seconds=current_duration))
                exit_name = f'{self.base_name}-{self.images_generated}.{self.ext}'
                frame_filename = os.path.join(self.path_save, exit_name)
                
                video_clip.save_frame(frame_filename, current_duration)
                print(f'Saving {self.images_generated}: {exit_name} at time {frame_duration_formatted}')
                
                # Actualizar el estado en cada iteración (o cada N iteraciones para no ralentizar)
                if self.images_generated % 5 == 0: # Actualiza cada 5 frames
                    self._update_status()

            # make zip file
            zip_name = f'{self.base_name}-{saving_fps}.zip'
            zip_path = os.path.join(self.static_path, zip_name)
            # Usamos -j para no guardar la estructura de directorios en el zip
            os.system(f'zip -j "{zip_path}" "{self.path_save}"/*')
            print(f'\nZip file created: {zip_path}')
            self.status_data["zip_path"] = f'/static/vitim/{self.key}/{zip_name}'

            self._update_status(final_status="Done")

        except Exception as e:
            print(f"Ocurrió un error: {e}")
            self._update_status(final_status=f"Error: {e}")
        finally:
            video_clip.close()
            print("\nProceso finalizado.")




"""

"""