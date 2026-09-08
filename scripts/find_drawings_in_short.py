import os, sys
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

for p in range(26, 46):
    pf = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    img = Image.open(pf)
    W, H = img.size
    gray = img.convert('L')
    arr = np.array(gray)
    
    ocr = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr.get('lines', [])
    
    text_mask = np.zeros(arr.shape, dtype=bool)
    for line in lines:
        for w in line.get('words', []):
            bb = w.get('bounding_box', {})
            x = int(bb.get('x', 0))
            y = int(bb.get('y', 0))
            bw = int(bb.get('width', 0))
            bh = int(bb.get('height', 0))
            text_mask[max(0, y-3):min(H, y+bh+3), max(0, x-3):min(W, x+bw+3)] = True
            
    ink = arr < 185
    non_text = ink & (~text_mask)
    # Clear margins
    non_text[:int(H*0.06), :] = False
    non_text[int(H*0.95):, :] = False
    non_text[:, :int(W*0.05)] = False
    non_text[:, int(W*0.95):] = False
    
    # Check footnote box area (between y=0.35 and y=0.75)
    fn_area = non_text[int(H*0.35):int(H*0.75), :]
    
    # Save a visualization if non_text density is high
    total_fn_ink = np.sum(fn_area)
    print(f"Page {p:03d} (short-{p-25:02d}) | FN ink count: {total_fn_ink:6d}")
