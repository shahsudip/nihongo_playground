import os, sys
from PIL import Image
import numpy as np

# Let's inspect pages in batches by cropping the exact footnote area of all pages:
# Short: 26 to 45
# Medium: 46 to 65
# Long: 66 to 89
# Search: 90 to 121
# Mock: 122 to 137

os.makedirs('tmp_inspect/fn_boxes', exist_ok=True)

for p in range(26, 138):
    pf = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    if not os.path.exists(pf):
        continue
    img = Image.open(pf)
    W, H = img.size
    # Save the middle-bottom region (y: 40% to 75%)
    crop = img.crop((0, int(H * 0.40), W, int(H * 0.75)))
    crop.save(f'tmp_inspect/fn_boxes/p{p:03d}_fn.jpg')

print("All footnote boxes saved to tmp_inspect/fn_boxes/")
