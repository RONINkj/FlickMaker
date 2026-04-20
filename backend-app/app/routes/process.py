from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os
import shutil
router = APIRouter()

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"


@router.post('/process-photo')
async def process_photo(file: UploadFile = File()):
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400, detail="Only image files are allowed")

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    input_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    output_path = os.path.join(OUTPUT_DIR, "Flick.pdf")

    if not os.path.exits(output_path):
        raise HTTPException(
            status_code=501, detail="Processing pipeline not implemented yet")

    return FileResponse(output_path, media_type="application/pdf", filename="Flick_res.pdf")
