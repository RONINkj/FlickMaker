from PIL import Image, ImageEnhance
import os


def enhance_image(
    input_path: str,
    output_path: str,
    brightness: float = 1.1,
    contrast: float = 1.2,
    sharpness: float = 1.1
) -> str:
    """
    Enhances image using brightness, contrast, and sharpness adjustments
    WITHOUT changing image size.

    Args:
        input_path (str): Path to input image
        output_path (str): Path to save enhanced image
        brightness (float): Brightness factor
        contrast (float): Contrast factor
        sharpness (float): Sharpness factor

    Returns:
        str: Path of enhanced image
    """

    # open image
    image = Image.open(input_path).convert("RGB")

    original_size = image.size  # keep track

    # apply brightness
    image = ImageEnhance.Brightness(image).enhance(brightness)

    # apply contrast (FIXED)
    image = ImageEnhance.Contrast(image).enhance(contrast)

    # apply sharpness (ADDED)
    image = ImageEnhance.Sharpness(image).enhance(sharpness)

    # ensure size is unchanged (safety check)
    if image.size != original_size:
        image = image.resize(original_size)

    # ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # save image (preserve quality)
    image.save(output_path, quality=95)

    return output_path