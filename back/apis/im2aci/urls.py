from fastapi import APIRouter, Request
from .api import SaveImage, Img2Ascii

router = APIRouter()

@router.post("/save_image")
async def save_image(request: Request):
    r = await SaveImage(request=request).run()
    return r

@router.get("/img2ascii")
async def img2ascii(request: Request):
    r = await Img2Ascii(request=request).run()
    return r

