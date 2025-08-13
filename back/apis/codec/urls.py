from fastapi import APIRouter, Request
from .api import (
    Codificar, Decodificar, 
)

router = APIRouter()

@router.api_route("/codificar", methods=['POST', 'GET'])
async def codificar(request: Request):
    r = await Codificar(request=request).run()
    return r

@router.api_route("/decodificar", methods=['POST', 'GET'])
async def decodificar(request: Request):
    r = await Decodificar(request=request).run()
    return r
