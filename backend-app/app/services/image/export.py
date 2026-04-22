from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from PIL import Image
import os


def export_to_pdf(input_path: str, output_path: str) -> str:
    """
    Export A4 image to PDF with correct scaling (300 DPI → 72 DPI)
    """

    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # A4 in points (72 DPI)
    A4_WIDTH, A4_HEIGHT = A4

    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle("FlickMaker Output")
    
    # open image
    img = Image.open(input_path)
    img_w_px, img_h_px = img.size

    # convert pixels (300 DPI) → points (72 DPI)
    scale = 72 / 300

    img_w_pt = img_w_px * scale
    img_h_pt = img_h_px * scale

    # draw image correctly scaled
    c.drawImage(
        input_path,
        0,
        A4_HEIGHT - img_h_pt,
        width=img_w_pt,
        height=img_h_pt
    )

    c.showPage()
    c.save()

    return output_path