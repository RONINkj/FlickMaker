from PIL import Image
import os

# takes an tranparancy -> add new background color -> Final image


def apply_background(input_path: str, output_path: str, color: tuple = (255, 255, 255)) -> str:
    """
    args: 
        input_path (str): Path to transparent PNG image (RGBA)
        output_path (str): Path to save final image.
        color (tuple): Background color in RGB (default: white)
    returns:
        str: Path of processed image
    """
    # open image and RGBA
    foreground = Image.open(input_path).convert("RGBA")
    
    # create background image
    background = Image.new("RGBA", foreground.size, color + (255,))
    
    # compostite foreground onto background
    combined = Image.alpha_composite(background,foreground)
    
    # convert to RGB (remove alpha for further processing)
    final_image = combined.convert("RGB")
    
    # ensure output directory exists
    os.makedirs(os.path.dirname(output_path),exist_ok=True)
    
    # save final image
    final_image.save(output_path)
    
    return output_path