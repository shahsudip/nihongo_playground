import easyocr
import json
import os
import re
import sys
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')
reader = easyocr.Reader(['ja', 'en'], gpu=False)

# Pages 198 to 223 contain all Week 9 scripts
print("Extracting OCR from pages 198 to 223...")

all_text_blocks = []

for pno in range(198, 224):
    p = f'tmp_inspect/zenkamoku_n1/page_{pno:03d}.jpg'
    if not os.path.exists(p):
        continue
    im = Image.open(p)
    w, h = im.size
    
    # Split into left and right columns
    # Left column: x: 0 to int(w * 0.52)
    # Right column: x: int(w * 0.48) to w
    left_crop = im.crop((0, int(h * 0.05), int(w * 0.52), int(h * 0.95)))
    right_crop = im.crop((int(w * 0.48), int(h * 0.05), w, int(h * 0.95)))
    
    l_res = reader.readtext(np.array(left_crop), detail=0)
    r_res = reader.readtext(np.array(right_crop), detail=0)
    
    print(f"Page {pno}: Left {len(l_res)} items, Right {len(r_res)} items")
    all_text_blocks.append((pno, 'left', l_res))
    all_text_blocks.append((pno, 'right', r_res))

with open('tmp_inspect/w9_scripts_raw.json', 'w', encoding='utf-8') as f:
    json.dump(all_text_blocks, f, ensure_ascii=False, indent=2)

print("Saved raw OCR blocks to tmp_inspect/w9_scripts_raw.json")
