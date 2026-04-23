from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
import os
import shutil
import uuid

from app.services.image.bg_remove import remove_background
from app.services.image.bg_replace import apply_background
from app.services.image.resize import resize_passport
from app.services.image.enhance import enhance_image
from app.services.image.layout import generate_a4_layout
from app.services.image.export import export_to_pdf

router = APIRouter()

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"

COLOR_MAP = {
    "white": (255, 255, 255),
    "blue": (0, 0, 255),
    "red": (255, 0, 0),
    "black": (0, 0, 0)
}


def cleanup_files(path: str):
    """
    Delete folder after response is sent
    """
    if os.path.exists(path):
        shutil.rmtree(path)


@router.post("/process-photo")
async def process_photo(background_tasks: BackgroundTasks, file: UploadFile = File(...), num_copies: int = 4, background_color: str = "white"):
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400, detail="Only image files are allowed")

    # Validate background color
    color = COLOR_MAP.get(background_color.lower())
    if not color:
        raise HTTPException(status_code=400, detail="Invalid background color")

    # Create unique job ID
    job_id = str(uuid.uuid4())

    # Create paths
    upload_path = os.path.join(UPLOAD_DIR, f"{job_id}_{file.filename}")
    job_output_dir = os.path.join(OUTPUT_DIR, job_id)

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    os.makedirs(job_output_dir, exist_ok=True)

    # Save uploaded file
    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 1: Remove background
    bg_removed_path = os.path.join(job_output_dir, "bg_removed.png")
    remove_background(upload_path, bg_removed_path)

    # Step 2: Apply background color
    bg_applied_path = os.path.join(job_output_dir, "bg_applied.jpg")
    apply_background(bg_removed_path, bg_applied_path, color=color)

    # Step 3: Resize
    resized_path = os.path.join(job_output_dir, "resized.jpg")
    resize_passport(bg_applied_path, resized_path)

    # Step 4: Enhance image
    enhanced_path = os.path.join(job_output_dir, "enhanced.jpg")
    enhance_image(resized_path, enhanced_path)

    # Step 5: Generate A4 layout
    layout_path = os.path.join(job_output_dir, "layout.jpg")
    generate_a4_layout(enhanced_path, layout_path, num_copies=num_copies)

    # Step 6: Export to PDF
    final_pdf_path = os.path.join(job_output_dir, "final.pdf")
    export_to_pdf(layout_path, final_pdf_path)

    # Check if file exists
    if not os.path.exists(final_pdf_path):
        raise HTTPException(status_code=500, detail="PDF generation failed")

    # Schedule cleanup after response
    background_tasks.add_task(cleanup_files, job_output_dir)

    return FileResponse(
        final_pdf_path,
        media_type="application/pdf",
        filename="FlickMaker_output.pdf"
        # headers={
        #     "Content-Disposition": "inline"
        # }
    )
