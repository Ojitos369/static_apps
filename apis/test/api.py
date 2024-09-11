# Python
import os
import uuid
import json
import requests
import datetime
import hashlib

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode

class JS:
    code = """
        const PIXEL_ID = '123';const ACCESS_TOKEN = '1a2b3c';
        // Obtener el fb_login_id del usuario (Ejemplo: asumiendo que ya tienes
        implementado Facebook Login)
        $fb_login_id = $_SESSION['fb_login_id']; // Reemplaza esta línea con la forma en
        que obtienes el fb_login_id del usuario
        // Función para generar un event_id único
        function generateUniqueEventId() {
        return uniqid();
        }
        // Función para obtener el event_source_url
        function getEventSourceUrl() {
        return isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] :
        ';
        }
        // Configuración del evento de Purchase
        $purchaseevent = [
        "event_name" => "Purchase",
        "event_time" => time(),
        "user_data" => [
        'client_ip_address' => $_SERVER['REMOTE_ADDR'],
            'client_user_agent' => $_SERVER['HTTP_USER_AGENT'],
        'em' => hash('sha256', 'ejemplo@example.com'), // Aplicar función de hash al
        email
            'ph' => hash('sha256', '123456789'), // Aplicar función de hash al teléfono
        ],
        "custom_data" => [
        "currency" => "USD",
        "value" => "123.45",
        ],
        'event_source_url' => getEventSourceUrl(), // Obtiene el event_source_url
        automáticamente
        "opt_out" => false,
        "event_id" => generateUniqueEventId(),
        "action_source" => "website",
        "data_processing_options" => [],
        "data_processing_options_country" => 0,
        "data_processing_options_state" => 0,
        ];

        // Configuración del evento de Addtocart
        $addtocartevent = [
        "event_name" => "AddToCart",
        "event_time" => time(),
        "user_data" => [
        'client_ip_address' => $_SERVER['REMOTE_ADDR'],
            'client_user_agent' => $_SERVER['HTTP_USER_AGENT'],
        'em' => hash('sha256', 'ejemplo@example.com'), // Aplicar función de hash al
        email
        'ph' => hash('sha256', '123456789'), // Aplicar función de hash al teléfono
        ],
        "custom_data" => [
        "currency" => "USD",
        "value" => "50.00",
        ],
        'event_source_url' => getEventSourceUrl(), // Obtiene el event_source_url
        automáticamente
        "opt_out" => false,
        "event_id" => generateUniqueEventId(),
        "action_source" => "website",
        "data_processing_options" => [],
        "data_processing_options_country" => 0,
        "data_processing_options_state" => 0,
        ];
        // Configuración del evento de PageView
        $pageviewevent = [
        "event_name" => "PageView",
        "event_time" => time(),
        "user_data" => [
        'client_ip_address' => $_SERVER['REMOTE_ADDR'],
            'client_user_agent' => $_SERVER['HTTP_USER_AGENT'],
        'em' => hash('sha256', 'ejemplo@example.com'), // Aplicar función de hash al
        email
            'ph' => hash('sha256', '123456789'), // Aplicar función de hash al teléfono
        ],
        'event_source_url' => getEventSourceUrl(), // Obtiene el event_source_url
        automáticamente
        "opt_out" => false,
        "event_id" => generateUniqueEventId(),
        "action_source" => "website",
        "data_processing_options" => [],
        "data_processing_options_country" => 0,
        "data_processing_options_state" => 0,
        ];
        // Combinar los eventos en un arreglo de eventos
        $events = [

        $addtocartevent,
        $purchaseevent,
        $pageviewevent,
        // Agregar más eventos aquí si es necesario
        ];
        $data = [
        'data' => $events,
        'test_event_code' => 'TEST3244',// Codigo Test de eventos
        ];
        $url = 'https://graph.facebook.com/v16.0/' . PIXEL_ID . '/events?access_token=' .
        ACCESS_TOKEN;
        $payload = json_encode($data);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $response = curl_exec($ch);
        if ($response === false) {
        echo 'Error: ' . curl_error($ch);
        } else {
        $response_data = json_decode($response, true);
        if (isset($response_data['error'])) {
            echo 'Error: ' . $response_data['error']['message'];
        } else {
            echo 'Success: ' . $response;
        }
        }
        curl_close($ch);
    """


class Test(GetApi):
    def main(self):
        self.show_me()
        
        PIXEL_ID = os.environ.get('FACEBOOK_PIXEL_ID')
        CLIENT_KEY = os.environ.get('FACEBOOK_CLIENT_KEY')
        TOKEN_KEY = os.environ.get('FACEBOOK_TOKEN_KEY')
        time = int(datetime.datetime.now().timestamp())
        purchase_event = {
            "event_name": "Purchase",
            "event_time": time,
            "user_data": {
                'client_ip_address': None,
                'client_user_agent': None,
                'em': hashlib.sha256('ejemplo@example.com'.encode()).hexdigest(),
                'ph': hashlib.sha256('123456789'.encode()).hexdigest()
            },
            "custom_data": {
                "currency": "USD",
                "value": "123.45",
            },
            "event_source_url": self.get_event_source_url(),
            "opt_out": False,
            "event_id": self.generate_unique_event_id(),
            "action_source": "website",
            "data_processing_options": [],
            "data_processing_options_country": 0,
            "data_processing_options_state": 0,
        }
        
        add_to_cart_event = {
            "event_name": "AddToCart",
            "event_time": datetime.datetime.now().timestamp(),
            "user_data": {
                'client_ip_address': None,
                'client_user_agent': None,
                'em': hashlib.sha256('ejemplo@example.com'.encode()).hexdigest(),
                'ph': hashlib.sha256('123456789'.encode()).hexdigest()
            },
            "custom_data": {
                "currency": "USD",
                "value": "50.00",
            },
            "event_source_url": self.get_event_source_url(),
            "opt_out": False,
            "event_id": self.generate_unique_event_id(),
            "action_source": "website",
            "data_processing_options": [],
            "data_processing_options_country": 0,
            "data_processing_options_state": 0,
        }
        
        page_view_event = {
            "event_name": "PageView",
            "event_time": datetime.datetime.now().timestamp(),
            "user_data": {
                'client_ip_address': None,
                'client_user_agent': None,
                'em': hashlib.sha256('ejemplo@example.com'.encode()).hexdigest(),
                'ph': hashlib.sha256('123456789'.encode()).hexdigest()
            },
            "event_source_url": self.get_event_source_url(),
            "opt_out": False,
            "event_id": self.generate_unique_event_id(),
            "action_source": "website",
            "data_processing_options": [],
            "data_processing_options_country": 0,
            "data_processing_options_state": 0,
        }
        
        events = [
            purchase_event,
            # add_to_cart_event,
            # page_view_event,
        ]
        
        data = {
            'data': events,
            'test_event_code': 'TEST11495',
        }
        
        url = f'https://graph.facebook.com/v20.0/{PIXEL_ID}/events?access_token={TOKEN_KEY}'
        print(url)
        
        self.response = {
            'data': data,
            'url': url
        }
        
        payload = json.dumps(data)
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {TOKEN_KEY}',
        }
        
        response = requests.post(url, data=payload, headers=headers)
        r = response.json()
        if response.status_code == 200:
            pln('Success:', r)
        else:
            pln('Error:', r)

        self.response = r


    def generate_unique_event_id(self):
      return str(uuid.uuid4())

    def get_event_source_url(self):
      return 'https://sa.ojitos369.com'


""" 
"""