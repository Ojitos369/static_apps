from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import setproctitle

from apis.urls import apis, media
from core.conf.settings import allow_origins, allow_credentials, allow_methods, allow_headers


setproctitle.setproctitle('static_apps')
app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_origins=allow_origins,
    allow_credentials=allow_credentials,
    allow_methods=allow_methods,
    allow_headers=allow_headers
)

app.include_router(apis, prefix="/api")
app.include_router(media, prefix="/media")

# uvicorn main:app --host 0.0.0.0 --port 8000 --reload
# uvicorn main:app --host 0.0.0.0 --port 8369 --reload

""" 

"""