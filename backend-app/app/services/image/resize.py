from PIL import Image
import os


def resize_passport(input_path: str, output_path: str, size=(413, 531)) -> str:
    """
    resizes image to possport size while maintaing aspect ratio

    Args: 
        input_path (str): Path to input image 
        output_path (str): Path to save resized image 
        size (tuple): Target size (width, height) 

    Returns: 
        str: Path of resized image

    """
    target_width, target_height = size

    # open image
    image = Image.open(input_path).convert("RGB")

    # Maintain aspect ratio
    image.thumbnail((target_width, target_height))

    # create white background canvas
    canvas = Image.new("RGB", (target_width, target_height), (255, 255, 255))

    # center the image
    x_offset = (target_width - image.width) // 2
    y_offset = (target_height - image.height) // 2

    canvas.paste(image, (x_offset, y_offset))

    # ensure output directory exixts
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # save results
    canvas.save(output_path)

    return output_path
