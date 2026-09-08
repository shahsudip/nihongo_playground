import os, sys
from PIL import Image
import numpy as np

os.makedirs('tmp_inspect/visual_check', exist_ok=True)

# Let's crop specific interesting sections of these pages:
pages = [63, 68, 74, 76, 88, 91, 99, 103, 107, 111, 113, 115, 117, 126, 127, 128, 129]

for p in pages:
    pf = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    if not os.path.exists(pf):
        continue
    img = Image.open(pf)
    W, H = img.size
    
    # Save 4 horizontal slices of the page
    for i in range(4):
        slice_img = img.crop((0, int(H * (i / 4.0)), W, int(H * ((i + 1) / 4.0))))
        slice_img.save(f'tmp_inspect/visual_check/p{p:03d}_slice_{i}.jpg')

print("Saved slices for visual check")
