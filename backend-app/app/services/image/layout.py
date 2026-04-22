from PIL import Image
import os


def generate_a4_layout(input_path: str, output_path: str, num_copies: int = 4) -> str:
    """
    Generate an A4 layout with multiple copies of an image.
    Keeps top-left alignment (no centering).
    """

    # A4 size at 300 DPI
    A4_WIDTH = 2480
    A4_HEIGHT = 3508

    # open input image
    image = Image.open(input_path).convert("RGB")

    # DEBUG: check incoming size
    # print("Layout input image size:", image.size)

    # enforce passport size if wrong
    TARGET_SIZE = (413, 531)
    if image.size != TARGET_SIZE:
        print("Fixing image size to passport standard")
        image = image.resize(TARGET_SIZE)

    img_w, img_h = image.size

    # margins
    margin_x = 100
    margin_y = 100

    # spacing
    spacing_x = 20
    spacing_y = 20

    # calculate how many images fit
    cols = (A4_WIDTH - 2 * margin_x + spacing_x) // (img_w + spacing_x)
    rows = (A4_HEIGHT - 2 * margin_y + spacing_y) // (img_h + spacing_y)

    max_copies = cols * rows
    num_copies = min(num_copies, max_copies)

    # create canvas
    canvas = Image.new("RGB", (A4_WIDTH, A4_HEIGHT), (255, 255, 255))

    count = 0

    for row in range(rows):
        for col in range(cols):
            if count >= num_copies:
                break

            x = margin_x + col * (img_w + spacing_x)
            y = margin_y + row * (img_h + spacing_y)

            canvas.paste(image, (x, y))
            count += 1

    # ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # save layout with DPI
    canvas.save(output_path, dpi=(300, 300))

    return output_path
