import os, glob, sys
from PIL import Image
import numpy as np
import winocr
from scipy import ndimage

sys.stdout.reconfigure(encoding='utf-8')
os.makedirs('tmp_inspect/exhaustive_audit/candidates', exist_ok=True)
os.makedirs('tmp_inspect/exhaustive_audit/pages', exist_ok=True)

all_pages = sorted(glob.glob('public/speed_master_n3_pages/speed_master_n3_page-*.jpg'))
target_pages = [p for p in all_pages if 26 <= int(os.path.basename(p).split('-')[1].split('.')[0]) <= 138]

print(f"Total target pages to audit: {len(target_pages)}")

all_results = []

for page_path in target_pages:
    page_num = int(os.path.basename(page_path).split('-')[1].split('.')[0])
    img = Image.open(page_path)
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
            text_mask[max(0, y-10):min(H, y+bh+10), max(0, x-10):min(W, x+bw+10)] = True
            
    non_text = ink & (~text_mask)
    
    # Margin removal
    non_text[:120, :] = False
    non_text[-120:, :] = False
    non_text[:, :100] = False
    non_text[:, -100:] = False
    
    lbl, num = ndimage.label(non_text)
    objs = ndimage.find_objects(lbl)
    
    page_cand = []
    for i, slc in enumerate(objs):
        cnt = np.sum(lbl[slc] == (i + 1))
        ymin, ymax = slc[0].start, slc[0].stop
        xmin, xmax = slc[1].start, slc[1].stop
        w = xmax - xmin
        h = ymax - ymin
        
        # If it's a solid box border or thin line (aspect ratio > 15), ignore
        if w > 300 and h < 8:
            continue
        if h > 300 and w < 8:
            continue
            
        if cnt > 150 and min(w, h) > 8:
            crop_path = f'tmp_inspect/exhaustive_audit/candidates/p{page_num:03d}_cand_{i}.jpg'
            pad = 25
            c = img.crop((max(0, xmin-pad), max(0, ymin-pad), min(W, xmax+pad), min(H, ymax+pad)))
            c.save(crop_path)
            page_cand.append({
                'id': i,
                'ink': int(cnt),
                'bbox': (xmin, ymin, xmax, ymax),
                'w': w,
                'h': h,
                'file': crop_path
            })
            
    if page_cand:
        print(f"=== Page {page_num:03d} (found {len(page_cand)} candidates) ===")
        for pc in page_cand:
            print(f"   Cand {pc['id']:2d}: ink={pc['ink']:5d}, size=({pc['w']:3d}x{pc['h']:3d}), bbox={pc['bbox']}, file={pc['file']}")
        all_results.append({'page': page_num, 'candidates': page_cand})

print(f"\nAudit complete! Pages with candidates: {len(all_results)}")
