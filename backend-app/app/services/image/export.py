from PIL import Image
import os


def export_to_pdf(input_path: str, output_path: str) -> str:
    """
    Convert an a4 image into print-ready PDF
    args:
        input_path (str): Path to A4 layout image
        output_path (str): Path to  save PDF file

    returns:
        str: Path of genrated PDF
    """
    # open image
    image = Image.open(input_path).convert("RGB")

    # ensure output directory exits
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # save as pdf with 300 DPI
    image.save(output_path, "PDF", resolution=300.0)

    return output_path
