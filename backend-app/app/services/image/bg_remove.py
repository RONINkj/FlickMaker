from PIL import Image
import os

def remove_background(input_path: str, output_path: str) -> str:
    from rembg import remove
    # open image
    input_image = Image.open(input_path)

    # remove background (pass PIL image, not path)
    output_image = remove(input_image)

    # ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # save output as PNG (important for transparency)
    output_image.save(output_path, format="PNG")

    return output_path