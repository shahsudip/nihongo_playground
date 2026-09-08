import os, sys, glob
import numpy as np
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('tmp_inspect/all_notes', exist_ok=True)
os.makedirs('tmp_inspect/findings', exist_ok=True)

# Function to analyze ink density and non-text contours in a region
def find_graphical_components(img_crop, threshold=190, min_area=300):
    gray = img_crop.convert('L')
    arr = np.array(gray)
    ink = arr < threshold
    
    # Run OCR on the crop
    ocr_res = winocr.recognize_pil_sync(img_crop, 'ja')
    lines = ocr_res.get('lines', [])
    
    # Mask text bounding boxes
    text_mask = np.zeros(arr.shape, dtype=bool)
    for line in lines:
        for w in line.get('words', []):
            bb = w.get('bounding_box', {})
            x = int(bb.get('x', 0))
            y = int(bb.get('y', 0))
            bw = int(bb.get('width', 0))
            bh = int(bb.get('height', 0))
            text_mask[max(0, y-3):min(arr.shape[0], y+bh+3), max(0, x-3):min(arr.shape[1], x+bw+3)] = True
            
    non_text_ink = ink & (~text_mask)
    return non_text_ink, lines, ocr_res.get('text', '')

print("Auditing all pages from 26 to 137...")

results = []
for p in range(26, 138):
    path = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    if not os.path.exists(path):
        continue
    img = Image.open(path)
    W, H = img.size
    
    # Save a standardized preview of the middle-to-bottom area where footnotes or graphics live
    # Usually footnote is at y: [H*0.45 : H*0.80]
    fn_crop = img.crop((int(W*0.05), int(H*0.40), int(W*0.95), int(H*0.82)))
    fn_crop.save(f'tmp_inspect/all_notes/p{p:03d}_note_region.jpg')

print("All note regions extracted to tmp_inspect/all_notes/")
