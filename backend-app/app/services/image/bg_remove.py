from rembg import remove
from PIL import Image
import os

# take an image --> remove background --> return processed image path


def remove_background(input_path: str, output_path: str) -> str:
    """
    args:
        input_path (str): Path to input image
        output_path (str): Path to save output image (PNG recommended)
    return:
        str: Path of processed image
    """

    # open image
    input_image = Image.open(input_path)

    # remove background
    output_image = remove(input_path)

    # ensure output exits in directory
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # save output as PNG (imp for transparency)
    output_image.save(output_path, format="PNG")

    return output_path
