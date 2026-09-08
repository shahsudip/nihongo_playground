import os, sys
from PIL import Image

for p in [63, 68, 74, 76, 80, 84, 86, 88]:
    pf = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    img = Image.open(pf)
    W, H = img.size
    # Crop footnote box
    fn_crop = img.crop((int(W * 0.05), int(H * 0.55), int(W * 0.95), int(H * 0.90)))
    fn_crop.save(f'tmp_inspect/individual_checks/p{p:03d}_fn_box.jpg')

print("Saved footnote boxes")
