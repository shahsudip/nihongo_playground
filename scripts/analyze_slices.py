import os, sys
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

def analyze_slice_for_drawing(p, slice_idx):
    slice_path = f'tmp_inspect/visual_check/p{p:03d}_slice_{slice_idx}.jpg'
    img = Image.open(slice_path)
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
            text_mask[max(0, y-3):min(H, y+bh+3), max(0, x-3):min(W, x+bw+3)] = True
            
    non_text = ink & (~text_mask)
    non_text[:10, :] = False
    non_text[-10:, :] = False
    non_text[:, :20] = False
    non_text[:, -20:] = False
    
    count = int(np.sum(non_text))
    
    # Check if there are large connected components of non-text ink
    # (e.g. bounding box of non-text ink)
    ys, xs = np.where(non_text)
    bbox = None
    if len(ys) > 1000:
        bbox = (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()))
        # Save candidate crop
        crop = img.crop(bbox)
        crop.save(f'tmp_inspect/visual_check/crop_p{p:03d}_s{slice_idx}.png')
        
    return count, len(lines), bbox, ocr.get('text', '')[:40].replace('\n', ' ')

print("Analyzing slices...")
for p in [63, 68, 74, 76, 88, 91, 99, 107, 111, 113, 115, 117, 126, 127, 128, 129]:
    for s in range(4):
        cnt, num_lines, bbox, preview = analyze_slice_for_drawing(p, s)
        if cnt > 5000:
            print(f"P{p:03d} S{s} | Non-text ink: {cnt:6d} | lines: {num_lines:2d} | bbox: {bbox} | {preview}")
