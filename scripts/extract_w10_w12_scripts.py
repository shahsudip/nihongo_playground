import easyocr
import json
import re
import os
import sys
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')
reader = easyocr.Reader(['ja', 'en'], gpu=False)

print("Extracting OCR from pages 223 to 251...")
all_text_blocks = []

for pno in range(223, 252):
    p = f'tmp_inspect/zenkamoku_n1/page_{pno:03d}.jpg'
    if not os.path.exists(p):
        continue
    im = Image.open(p)
    w, h = im.size
    
    # Split into left and right columns
    left_crop = im.crop((0, int(h * 0.05), int(w * 0.52), int(h * 0.95)))
    right_crop = im.crop((int(w * 0.48), int(h * 0.05), w, int(h * 0.95)))
    
    l_res = reader.readtext(np.array(left_crop), detail=0)
    r_res = reader.readtext(np.array(right_crop), detail=0)
    
    print(f"Page {pno}: Left {len(l_res)} items, Right {len(r_res)} items")
    all_text_blocks.append((pno, 'left', l_res))
    all_text_blocks.append((pno, 'right', r_res))

with open('tmp_inspect/w10_w12_scripts_raw.json', 'w', encoding='utf-8') as f:
    json.dump(all_text_blocks, f, ensure_ascii=False, indent=2)

print("Saved raw OCR blocks to tmp_inspect/w10_w12_scripts_raw.json")
