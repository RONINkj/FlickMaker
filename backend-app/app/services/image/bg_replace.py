from PIL import Image
import os

def apply_background(input_path: str, output_path: str, color: tuple = (255, 255, 255)) -> str:
    # open image and ensure RGBA
    foreground = Image.open(input_path).convert("RGBA")

    # create solid background
    background = Image.new("RGBA", foreground.size, color + (255,))

    # composite images
    combined = Image.alpha_composite(background, foreground)

    # convert to RGB (remove alpha)
    final_image = combined.convert("RGB")

    # ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # save explicitly
    final_image.save(output_path, format="JPEG")

    return output_path