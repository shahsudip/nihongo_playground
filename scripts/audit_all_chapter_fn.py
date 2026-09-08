import os, sys, glob, json
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

# Let's inspect every chapter's scan page
data_dir = 'src/data/speed_master_n3_reading'
json_files = sorted(glob.glob(os.path.join(data_dir, '*.json')))

for jf in json_files:
    with open(jf, 'r', encoding='utf-8') as f:
        d = json.load(f)
    img_src = d.get('imageSrc', '')
    if not img_src:
        continue
    page_path = os.path.join('public', img_src.lstrip('/'))
    if not os.path.exists(page_path):
        continue
        
    ch_id = d.get('id', os.path.basename(jf).replace('.json', ''))
    has_diag = bool(d.get('footnotesDiagram') or d.get('footnotesDiagramLeft') or d.get('footnotesDiagramRight') or ('<img' in d.get('passageText', '')))
    
    img = Image.open(page_path)
    W, H = img.size
    
    ocr = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr.get('lines', [])
    
    # Check footnote words
    fn_lines = [l for l in lines if any(k in l.get('text', '') for k in ['※', '（※', '(※', '【注】', '注：', '注 :'])]
    
    # Check if there are illustrations
    # Let's check non-text ink inside the footnote bounding box if fn_lines exist
    if fn_lines:
        ys = []
        for l in fn_lines:
            for w in l.get('words', []):
                bb = w.get('bounding_rect', {})
                ys.append(int(bb.get('y', 0)))
                ys.append(int(bb.get('y', 0)) + int(bb.get('height', 0)))
        if ys:
            min_y = max(0, min(ys) - 20)
            max_y = min(H, max(ys) + 20)
            
            crop = img.crop((int(W*0.06), min_y, int(W*0.94), max_y))
            cW, cH = crop.size
            arr = np.array(crop.convert('L'))
            ink = arr < 185
            
            text_mask = np.zeros(arr.shape, dtype=bool)
            for l in lines:
                for w in l.get('words', []):
                    bb = w.get('bounding_rect', {})
                    bx = int(bb.get('x', 0)) - int(W*0.06)
                    by = int(bb.get('y', 0)) - min_y
                    bw = int(bb.get('width', 0))
                    bh = int(bb.get('height', 0))
                    if 0 <= by < cH and 0 <= bx < cW:
                        text_mask[max(0, by-3):min(cH, by+bh+3), max(0, bx-3):min(cW, bx+bw+3)] = True
            
            non_text = ink & (~text_mask)
            # ignore borders
            non_text[:15, :] = False
            non_text[-15:, :] = False
            non_text[:, :15] = False
            non_text[:, -15:] = False
            
            left_ink = int(np.sum(non_text[:, :cW//3]))
            right_ink = int(np.sum(non_text[:, 2*cW//3:]))
            
            print(f"[{ch_id:12s}] {d.get('title',''):20s} | Page: {os.path.basename(page_path)} | HasDiag: {str(has_diag):5s} | FN LeftInk: {left_ink:5d}, RightInk: {right_ink:5d}")
