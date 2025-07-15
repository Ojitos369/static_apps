# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode


class Test(GetApi):
    def main(self):
        self.show_me()

        self.response = {
            'message': 'Hola desde test'
        }


""" 
revisa src/Pages y en base a las que tienen myUse.jsx crea la pagina de Vitim con los siguientes puntos
las funciones generales de la app van en src/Hooks/useStates/functions.jsx como todas las demas
funcionalidades:
un input para elegir un video, validar que sea un video, dar la opcion de poner un preview en base al tiempo inicial y tiempo final (estos no deben pasar de los limites)
inputs de opciones con los siguientes parametros
--name base_name_for_images \
--fps frames_per_second(30,60) \
--type image_type(png,jpg,etc) \
--start time_to_start(60,15,03:12) \
--end time_to_end(60,15,03:12)
reglas:
los estados y funciones de estado van en myUse
los useEffects van en myUse
trata de utilizar lo menor posbiel useState y utiliza el estado global como todas las demas paginas

"""