import os
import sys
import glob
import numpy as np
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

def detect_graphics(page_path, page_num):
    img = Image.open(page_path).convert('L')
    W, H = img.size
    
    # 1. OCR text lines and bounding boxes
    ocr_res = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr_res.get('lines', [])
    
    # 2. Create binarized ink mask (dark ink < 180)
    arr = np.array(img)
    ink_mask = arr < 180  # True where ink exists
    
    # 3. Create text exclusion mask (mark all OCR bounding boxes as text)
    text_mask = np.zeros((H, W), dtype=bool)
    for line in lines:
        for word in line.get('words', []):
            bb = word.get('bounding_box', {})
            x, y, w, h = int(bb.get('x', 0)), int(bb.get('y', 0)), int(bb.get('width', 0)), int(bb.get('height', 0))
            # Expand bounding box slightly to cover furigana/punctuation
            x0 = max(0, x - 5)
            y0 = max(0, y - 5)
            x1 = min(W, x + w + 5)
            y1 = min(H, y + h + 5)
            text_mask[y0:y1, x0:x1] = True
            
    # Also ignore top header (page title / header bar) and bottom footer (page numbers)
    # top 8% and bottom 5%, and outer margins (left/right 4%)
    non_text_ink = ink_mask & (~text_mask)
    non_text_ink[:int(H * 0.06), :] = False # ignore top header
    non_text_ink[int(H * 0.95):, :] = False # ignore page numbers
    non_text_ink[:, :int(W * 0.04)] = False # ignore outer margin binding noise
    non_text_ink[:, int(W * 0.96):] = False
    
    # 4. Find connected components or grid density of non-text ink
    # Let's count non-text ink density in 50x50 blocks
    grid_h, grid_w = 40, 40
    clusters = []
    
    # Simple bounding box finder using projection or clustering
    y_proj = np.sum(non_text_ink, axis=1)
    x_proj = np.sum(non_text_ink, axis=0)
    
    total_non_text_ink = np.sum(non_text_ink)
    
    return {
        'page': page_num,
        'W': W,
        'H': H,
        'lines_count': len(lines),
        'non_text_ink_count': int(total_non_text_ink),
        'ocr_text': ocr_res.get('text', '')
    }

print("Testing on known pages...")
for p in [37, 39, 47, 51, 53, 55, 58, 72, 119]:
    path = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    res = detect_graphics(path, p)
    print(f"Known Page {p:03d}: Non-text ink count = {res['non_text_ink_count']}")
