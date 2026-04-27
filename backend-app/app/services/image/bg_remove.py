from PIL import Image
import os

# Lazy import + lightweight model session
from rembg import remove, new_session

# Create a global session using smaller model (important)
session = new_session("u2netp")  # ~4MB instead of 176MB


def remove_background(input_path: str, output_path: str) -> str:
    try:
        # Open image and ensure RGBA
        input_image = Image.open(input_path).convert("RGBA")

        # Remove background using optimized session
        output_image = remove(input_image, session=session)

        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # Save as PNG (keeps transparency)
        output_image.save(output_path, format="PNG")

        return output_path

    except Exception as e:
        raise RuntimeError(f"Background removal failed: {str(e)}")
