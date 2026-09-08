import os, sys
from PIL import Image

for p in [63, 68, 74, 76, 80, 84, 86, 88]:
    path = f'tmp_inspect/individual_checks/p{p:03d}_fn_box.jpg'
    img = Image.open(path)
    W, H = img.size
    
    # Save left half and right half
    img.crop((0, 0, W//2, H)).save(f'tmp_inspect/individual_checks/p{p:03d}_fn_left.jpg')
    img.crop((W//2, 0, W, H)).save(f'tmp_inspect/individual_checks/p{p:03d}_fn_right.jpg')

print("Saved left and right halves of footnote boxes.")
