import os, sys, json
from PIL import Image
import numpy as np

# Let's inspect medium passage footnote / margin boxes
for p in range(46, 66):
    img = Image.open(f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg')
    W, H = img.size
    # Save the full page thumbnail or crop middle-right/bottom
    # Medium passages are 1 or 2 pages. Let's crop the bottom half (footnotes) and right margin
    crop_fn = img.crop((0, int(H * 0.45), W, int(H * 0.85)))
    crop_fn.save(f'tmp_inspect/medium/p{p:03d}_fn.jpg')
    
print("Saved medium footnote crops")
