from __future__ import annotations
import io
import os
import sys
import argparse
from PIL import Image, ImageChops

try:
    from rembg import remove
    REMBG_AVAILABLE = True
except ImportError as e:
    REMBG_AVAILABLE = False
    print(f"Advertencia: {e}. La eliminación de fondo con IA no estará disponible.")
    print("Puedes instalarla con: pip install rembg")

class Im2Aci:
    ASCII_CHARS = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.', ' ']

    def __init__(self, ruta: str, nuevo_ancho: int = 100, save_text: bool = True, rmbg: bool = True):
        self.ruta = ruta
        self.nuevo_ancho = nuevo_ancho
        self.save_text = save_text
        self.img_original_cargada = None
        self.img_con_alfa = None
        self.img = None
        self.imagen_redimensionada = None
        self.imagen_procesada = None
        self.arte_ascii = None
        self.rmbg = rmbg
    
    def cargar_imagen(self):
        """
        Carga una imagen desde la ruta especificada.
        """
        try:
            img = Image.open(self.ruta)
            print(f"¡Imagen '{self.ruta}' cargada exitosamente!")
            print(f"Formato: {img.format}, Tamaño original: {img.size}, Modo original: {img.mode}")
            self.img_original_cargada = img
        except FileNotFoundError:
            print(f"¡Error! No se encontró la imagen en la ruta: {self.ruta}")
            return None
        except Exception as e:
            print(f"Ocurrió un error al cargar la imagen: {e}")
            return None

    def preprocesar_imagen(self):
        """
        Redimensiona la imagen y la convierte a escala de grises.
        """
        if REMBG_AVAILABLE and self.rmbg:
            self._remover_fondo_con_ia()
        self.img = self.img_con_alfa or self.img_original_cargada
        self._redimensionar_imagen()
        self._convertir_a_grises()
    
    def _remover_fondo_con_ia(self):
        """
        Remueve el fondo usando la biblioteca rembg.
        """
        if not REMBG_AVAILABLE:
            print("Error: rembg no está disponible. No se puede remover fondo con IA.")
            return False
        if not self.img_original_cargada:
            print("Error: La imagen original no ha sido cargada (IA).")
            return False

        print("Procesando imagen con rembg (esto puede tardar un momento)...")
        try:
            # Convertir la imagen PIL a bytes
            img_byte_arr = io.BytesIO()
            # rembg funciona bien con PNGs, guardamos en ese formato en memoria
            self.img_original_cargada.save(img_byte_arr, format='PNG') 
            img_byte_arr = img_byte_arr.getvalue()

            # Usar rembg para quitar el fondo
            output_bytes = remove(img_byte_arr)

            # Convertir los bytes resultantes de vuelta a una imagen PIL
            self.img_con_alfa = Image.open(io.BytesIO(output_bytes))
            print(f"Fondo removido con IA (rembg). Modo: {self.img_con_alfa.mode}")
            return True
        except Exception as e:
            print(f"Ocurrió un error durante la eliminación de fondo con IA: {e}")
            return False

    def _redimensionar_imagen(self):
        # Redimensionar manteniendo la proporción
        ancho_original, alto_original = self.img.size
        ratio_aspecto = alto_original / ancho_original
        nuevo_alto = int(ratio_aspecto * self.nuevo_ancho * 0.55) # Ajuste para caracteres no cuadrados
        self.imagen_redimensionada = self.img.resize((self.nuevo_ancho, nuevo_alto))
        print(f"Imagen redimensionada a: {self.imagen_redimensionada.size}")

    def _convertir_a_grises(self):
        # Convertir a escala de grises
        img_para_convertir = self.imagen_redimensionada

        if img_para_convertir.mode == 'RGBA':
            # Crear un fondo blanco del mismo tamaño
            fondo_blanco = Image.new("RGBA", img_para_convertir.size, "WHITE")
            # Pegar la imagen RGBA (con su transparencia) sobre el fondo blanco
            # La máscara es el canal alfa de la imagen original
            fondo_blanco.paste(img_para_convertir, mask=img_para_convertir.split()[3]) 
            img_final_para_L = fondo_blanco.convert('RGB') # Convertir a RGB antes de L es más seguro
            print("Imagen RGBA pegada sobre fondo blanco antes de convertir a grises.")
        else:
            img_final_para_L = img_para_convertir

        imagen_gris = img_final_para_L.convert("L") # 'L' es el modo para escala de grises
        print(f"Imagen convertida a escala de grises. Modo: {imagen_gris.mode}")
        self.imagen_procesada = imagen_gris

    def pixeles_a_ascii(self):
        """
        Convierte los píxeles de la imagen procesada (escala de grises) a caracteres ASCII.
        """
        if not self.imagen_procesada:
            print("Error: La imagen no ha sido procesada (redimensionada y convertida a grises).")
            return None

        pixels = self.imagen_procesada.getdata()
        caracteres_ascii = ""
        num_caracteres_paleta = len(self.ASCII_CHARS)
        
        for i, pixel_valor in enumerate(pixels):
            # Mapear el valor del píxel (0-255) al índice de la paleta ASCII
            # Un valor de píxel más bajo (más oscuro) debe mapear a un índice más bajo (carácter más denso)
            indice_paleta = int((pixel_valor / 255) * (num_caracteres_paleta - 1))
            caracteres_ascii += self.ASCII_CHARS[indice_paleta]
            
            # Añadir nueva línea al final de cada fila de píxeles
            if (i + 1) % self.imagen_procesada.width == 0:
                caracteres_ascii += "\n"
        self.arte_ascii = caracteres_ascii

    def run(self, ruta_salida_txt: str = ""):
        self.cargar_imagen()
        self.preprocesar_imagen()
        if self.imagen_procesada:
            self.pixeles_a_ascii()
            if self.arte_ascii:
                print("\n--- ARTE ASCII GENERADO ---")
                print(self.arte_ascii)
                print("--- FIN DEL ARTE ASCII ---\n")
                if self.save_text and ruta_salida_txt:
                    with open(ruta_salida_txt, "w") as f:
                        f.write(self.arte_ascii)
                        print(f"Arte ASCII guardado en {ruta_salida_txt}")
        else:
            print("No se pudo procesar la imagen para generar ASCII.")

