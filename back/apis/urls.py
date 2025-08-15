from fastapi import APIRouter
from .sockets.urls import router as socket_router
from .base.urls import router as base_router
from .codec.urls import router as codec_router
from .im2aci.urls import router as im2aci_router
from .vitim.urls import router as vitim_router
from .get_media.urls import router as get_media_router

apis = APIRouter()
media = APIRouter()

apis.include_router(socket_router, prefix="/ws")
apis.include_router(base_router, prefix="/base")

apis.include_router(codec_router, prefix="/codec")
apis.include_router(im2aci_router, prefix="/im2aci")
apis.include_router(vitim_router, prefix="/vitim")

media.include_router(get_media_router, prefix="")

