from PIL import Image
import os
import math


def generate_a4_layout(input_path: str, output_path: str, num_copies: int = 4) -> str:
    """
        Genreate an a4 layout with mutliple copies of an image.

    args:
        input_path (str): Path to process image
        output_path (str): Path to save A4 layout image
        num_copies (int): Number of duplicates (e.g. 2, ,4 , 12 , 16)

    retunrs:
        str: Path of final A4 image
    """
    # a4 size at  300 DPI

    A4_WIDTH = 2480
    A4_HEIGHT = 3508

    # open input image
    image = Image.open(input_path).convert("RGB")

    img_width, img_height = image.size

    # calculate grind (rows x cols)
    cols = math.ceil(math.sqrt(num_copies))
    rows = math.ceil(num_copies / cols)

    # margins
    margin_x = 100
    margin_y = 100

    # available space inside margins
    available_width = A4_WIDTH - 2 * margin_x
    available_height = A4_HEIGHT - 2 * margin_y

    # spcaing between images
    spacing_x = 20
    spcaing_y = 20

    # calculate max possible size image
    max_width = (available_width - (cols - 1) * spacing_x) // cols
    max_height = (available_height - (rows - 1) * spcaing_y) // rows

    # resize image to fit  inside grid cell (maintain ratio)
    image.thumbnail((max_width, max_height))

    # create A4 canvas
    canvas = Image.new("RGB", (A4_WIDTH, A4_HEIGHT), (255, 255, 255))

    # start placing images
    x_start = margin_x
    y_start = margin_y

    count = 0

    for row in range(rows):
        for col in range(cols):
            if count >= num_copies:
                break

            x = x_start + col + (max_width + spacing_x)
            y = y_start + row + (max_height + spcaing_y)
            canvas.paste(image, (x, y))

            count += 1

    # ensure directory exists
    os.makedirs(os.path.dirname(output_path),exist_ok=True)
    
    # save final layout
    canvas.save(output_path)
    
    return output_path