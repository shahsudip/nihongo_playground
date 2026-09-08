import os, sys
from PIL import Image
import numpy as np

# Let's inspect pages 26-45 specifically around the footnote area (between passage and question)
for p in range(26, 46):
    path = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    img = Image.open(path)
    W, H = img.size
    # Let's crop the footnote area (roughly y: 40% to 75%)
    crop = img.crop((0, int(H * 0.40), W, int(H * 0.75)))
    crop.save(f'tmp_inspect/short/p{p:03d}_mid_footnote.jpg')
print("Saved mid footnote crops for pages 26-45")
