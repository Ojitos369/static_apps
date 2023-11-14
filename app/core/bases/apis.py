# Python
import os
import json
import datetime
from pathlib import Path

# Django
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response

# Ojitos369
from ojitos369.utils import get_d, print_line_center, printwln as pln
from ojitos369_mysql_db.mysql_db import ConexionMySQL

# User
from app.settings import MYE, prod_mode, ce, DB_DATA

class BaseApi(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.status = 200
        self.response = {}
        self.ce = ce
        self.MYE = MYE
        self.response_mode = 'json'
        self.conexion = ConexionMySQL(DB_DATA)

    def errors(self, e):
        try:
            raise e
        except MYE as e:
            error = self.ce.show_error(e)
            print_line_center(error)
            self.status = 400 if self.status == 200 else self.status
            self.response = {
                'message': str(e),
                'error': str(e)
            }
        except Exception as e:
            error = self.ce.show_error(e, send_email=prod_mode)
            print_line_center(error)
            self.status = 500 if self.status == 200 else self.status
            self.response = {
                'message': str(e),
                'error': str(e)
            }

    def get_post_data(self):
        try:
            self.data = json.loads(self.request.body.decode('utf-8'))
        except:
            try:
                self.data = self.request.data
            except:
                self.data = {}

    
    def validate_session(self):
        request = self.request
        cookies = request.COOKIES
        mi_cookie = get_d(cookies, 'miCookie', default='')
        pln(mi_cookie)

    def validar_permiso(self, usuarios_validos):
        pass


class PostApi(BaseApi):
    def post(self, request, **kwargs):
        self.request = request
        self.kwargs = kwargs
        try:
            self.validate_session()
            self.get_post_data()
            self.main()
        except Exception as e:
            self.errors(e)
        if self.response_mode == 'blob': 
            return self.response
        elif self.response_mode == 'json':
            return Response(self.response, status=self.status)

class GetApi(BaseApi):
    def get(self, request, **kwargs):
        self.request = request
        self.kwargs = kwargs
        try:
            self.validate_session()
            self.main()
        except Exception as e:
            self.errors(e)
        if self.response_mode == 'blob': 
            return self.response
        elif self.response_mode == 'json':
            return Response(self.response, status=self.status)
