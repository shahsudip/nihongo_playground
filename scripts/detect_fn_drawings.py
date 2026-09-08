import os, sys, glob
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

def check_fn_drawing(p):
    pf = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    if not os.path.exists(pf):
        return None
    img = Image.open(pf)
    W, H = img.size
    
    ocr = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr.get('lines', [])
    
    fn_words = []
    for l in lines:
        lt = l.get('text', '')
        if '※' in lt or '(※' in lt or '（※' in lt or lt.startswith('注') or '【注】' in lt or '(注' in lt or '（注' in lt:
            for w in l.get('words', []):
                fn_words.append(w)
                
    if not fn_words:
        return {'p': p, 'has_fn': False}
        
    min_y = min(w['bounding_rect']['y'] for w in fn_words)
    max_y = max(w['bounding_rect']['y'] + w['bounding_rect']['height'] for w in fn_words)
    
    y0 = max(0, int(min_y - 20))
    y1 = min(H, int(max_y + 20))
    
    fn_crop = img.crop((int(W*0.06), y0, int(W*0.94), y1))
    cW, cH = fn_crop.size
    arr = np.array(fn_crop.convert('L'))
    ink = arr < 185
    
    text_mask = np.zeros(arr.shape, dtype=bool)
    for l in lines:
        for w in l.get('words', []):
            bb = w.get('bounding_rect', {})
            bx = int(bb.get('x', 0)) - int(W*0.06)
            by = int(bb.get('y', 0)) - y0
            bw = int(bb.get('width', 0))
            bh = int(bb.get('height', 0))
            if 0 <= by < cH and 0 <= bx < cW:
                text_mask[max(0, by-3):min(cH, by+bh+3), max(0, bx-3):min(cW, bx+bw+3)] = True
                
    non_text = ink & (~text_mask)
    non_text[:15, :] = False
    non_text[-15:, :] = False
    non_text[:, :15] = False
    non_text[:, -15:] = False
    
    left_ink = int(np.sum(non_text[:, :cW//3]))
    right_ink = int(np.sum(non_text[:, 2*cW//3:]))
    mid_ink = int(np.sum(non_text[:, cW//3:2*cW//3]))
    
    return {
        'p': p,
        'has_fn': True,
        'y_range': (y0, y1),
        'left_ink': left_ink,
        'right_ink': right_ink,
        'mid_ink': mid_ink,
        'fn_text': [w['text'] for w in fn_words[:8]]
    }

print("Scanning all footnote boxes for drawings across pages 26-137...")
for p in range(26, 138):
    res = check_fn_drawing(p)
    if res and res.get('has_fn'):
        # If either left or right has substantial non-text ink
        if res['left_ink'] > 6000 or res['right_ink'] > 6000:
            print(f"Page {p:03d} *** DRAWING CANDIDATE *** Left: {res['left_ink']:6d}, Right: {res['right_ink']:6d} | Words: {' '.join(res['fn_text'][:5])}")
        else:
            print(f"Page {p:03d} OK (No side drawing) | Left: {res['left_ink']:5d}, Right: {res['right_ink']:5d} | Words: {' '.join(res['fn_text'][:4])}")
