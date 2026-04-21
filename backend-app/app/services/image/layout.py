from PIL import Image
import os


def generate_a4_layout(input_path: str, output_path: str, num_copies: int = 4) -> str:
    """
    Generate an A4 layout with multiple copies of an image.
    Image size MUST already be passport size (e.g., 413x531).
    """

    # A4 size at 300 DPI
    A4_WIDTH = 2480
    A4_HEIGHT = 3508

    # open input image (already resized)
    image = Image.open(input_path).convert("RGB")
    img_w, img_h = image.size

    # margins
    margin_x = 100
    margin_y = 100

    # spacing between images
    spacing_x = 20
    spacing_y = 20

    # ✅ calculate how many images fit in A4 (KEY FIX)
    cols = (A4_WIDTH - 2 * margin_x + spacing_x) // (img_w + spacing_x)
    rows = (A4_HEIGHT - 2 * margin_y + spacing_y) // (img_h + spacing_y)

    # max images possible
    max_copies = cols * rows

    # limit copies
    num_copies = min(num_copies, max_copies)

    # create A4 canvas
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

    # save final layout
    canvas.save(output_path, dpi=(300, 300))

    return output_path
