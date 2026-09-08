import os, sys
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

for p in [63, 68, 74, 76, 80, 84, 86, 88]:
    for side in ['left', 'right']:
        path = f'tmp_inspect/individual_checks/p{p:03d}_fn_{side}.jpg'
        img = Image.open(path)
        ocr = winocr.recognize_pil_sync(img, 'ja')
        lines = ocr.get('lines', [])
        
        arr = np.array(img.convert('L'))
        ink = int(np.sum(arr < 185))
        
        print(f"P{p:03d} {side:5s} | Lines: {len(lines):2d} | Ink: {ink:6d} | Text: {ocr.get('text', '').strip()[:60].replace(chr(10), ' ')}")
