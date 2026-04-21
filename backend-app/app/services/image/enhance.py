from PIL import Image, ImageEnhance
import os


def enhance_image(input_path: str, output_path: str, brightness: float = 1.1, contrast: float = 1.2, sharpness: float = 1.1) -> str:
    """
    Enhances image using basic adjustments.
    args:
        input_path (str): Path to input image
        output_path (str): Path to save enhanced image
        brightness (float): Brightness factor (default 1.1)
        contrast (float): Contrast factor (default 1.2)
        Sharpness (float): Sharpness factor (default 1.1)

    returns:
        str: Path of enhanced image
    """

    # open image
    image = Image.open(input_path).convert("RGB")

    # apply brightness
    image = ImageEnhance.Brightness(image).enhance(brightness)

    # apply contrast
    image = ImageEnhance.Contrast(image).enhance(sharpness)

    # Ensure outout directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Save enhaced image
    image.save(output_path)

    return output_path
