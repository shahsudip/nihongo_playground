import os, sys
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

for p in [63, 68, 74, 76, 80, 84, 86, 88]:
    path = f'tmp_inspect/individual_checks/p{p:03d}_fn_box.jpg'
    img = Image.open(path)
    W, H = img.size
    
    ocr = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr.get('lines', [])
    
    arr = np.array(img.convert('L'))
    ink = arr < 185
    
    text_mask = np.zeros(arr.shape, dtype=bool)
    for l in lines:
        for w in l.get('words', []):
            bb = w.get('bounding_rect', {})
            x = int(bb.get('x', 0))
            y = int(bb.get('y', 0))
            bw = int(bb.get('width', 0))
            bh = int(bb.get('height', 0))
            text_mask[max(0, y-4):min(H, y+bh+4), max(0, x-4):min(W, x+bw+4)] = True
            
    non_text = ink & (~text_mask)
    # Clear borders
    non_text[:20, :] = False
    non_text[-20:, :] = False
    non_text[:, :20] = False
    non_text[:, -20:] = False
    
    ys, xs = np.where(non_text)
    if len(ys) > 500:
        # Check sub-boxes
        # Let's save non_text visualization
        vis = Image.fromarray((~non_text * 255).astype(np.uint8))
        vis.save(f'tmp_inspect/individual_checks/p{p:03d}_fn_non_text.png')
        print(f"P{p:03d} FN Box: Non-text ink count = {len(ys)}, bbox = ({xs.min()}, {ys.min()}, {xs.max()}, {ys.max()})")
