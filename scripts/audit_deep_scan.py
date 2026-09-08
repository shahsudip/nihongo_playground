import os, sys, glob
import numpy as np
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')
os.makedirs('tmp_inspect/diagram_candidates', exist_ok=True)

# List of pages to audit
# Let's inspect all pages from 26 to 137
def audit_page(page_num):
    path = f'public/speed_master_n3_pages/speed_master_n3_page-{page_num:04d}.jpg'
    if not os.path.exists(path):
        return None
    
    img = Image.open(path)
    W, H = img.size
    gray = img.convert('L')
    arr = np.array(gray)
    
    # Run OCR
    ocr_res = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr_res.get('lines', [])
    text = ocr_res.get('text', '')
    
    # Create text mask
    text_mask = np.zeros(arr.shape, dtype=bool)
    for line in lines:
        for w in line.get('words', []):
            bb = w.get('bounding_box', {})
            x = int(bb.get('x', 0))
            y = int(bb.get('y', 0))
            bw = int(bb.get('width', 0))
            bh = int(bb.get('height', 0))
            text_mask[max(0, y-4):min(H, y+bh+4), max(0, x-4):min(W, x+bw+4)] = True
            
    # Binary ink (threshold < 190)
    ink = arr < 190
    
    # Exclude margins (top 6%, bottom 5%, left 4%, right 4%)
    non_text_ink = ink & (~text_mask)
    non_text_ink[:int(H * 0.06), :] = False
    non_text_ink[int(H * 0.95):, :] = False
    non_text_ink[:, :int(W * 0.04)] = False
    non_text_ink[:, int(W * 0.96):] = False
    
    # Look for footnote area specifically
    # In speed master, footnote is usually bordered or below passage
    # Let's check where footnote text is:
    fn_lines = [l for l in lines if '※' in l.get('text', '') or '（注' in l.get('text', '') or '(注' in l.get('text', '') or '【注】' in l.get('text', '') or l.get('text', '').startswith('注')]
    
    fn_y_min = None
    fn_y_max = None
    if fn_lines:
        ys = []
        for l in fn_lines:
            for w in l.get('words', []):
                bb = w.get('bounding_box', {})
                ys.append(int(bb.get('y', 0)))
                ys.append(int(bb.get('y', 0)) + int(bb.get('height', 0)))
        if ys:
            fn_y_min = max(0, min(ys) - 30)
            fn_y_max = min(H, max(ys) + 30)
            
    # Let's check if there is non-text ink inside or beside the footnote area
    fn_has_graphic = False
    fn_graphic_box = None
    if fn_y_min is not None and fn_y_max is not None:
        fn_non_text = non_text_ink[fn_y_min:fn_y_max, :]
        fn_ink_count = np.sum(fn_non_text)
        if fn_ink_count > 1000:
            # Check left and right halves
            left_ink = np.sum(fn_non_text[:, :W//3])
            right_ink = np.sum(fn_non_text[:, 2*W//3:])
            mid_ink = np.sum(fn_non_text[:, W//3:2*W//3])
            fn_has_graphic = True
            
    return {
        'page': page_num,
        'lines': len(lines),
        'fn_lines': len(fn_lines),
        'fn_has_graphic': fn_has_graphic,
        'total_non_text': int(np.sum(non_text_ink)),
        'text_snippet': text[:80].replace('\n', ' ')
    }

for p in range(26, 138):
    res = audit_page(p)
    if res and (res['fn_has_graphic'] or res['total_non_text'] > 150000):
        print(f"Candidate Page {p:03d} | non-text ink: {res['total_non_text']} | fn_lines: {res['fn_lines']} | fn_graphic: {res['fn_has_graphic']} | {res['text_snippet']}")
