import os, sys, glob
import numpy as np
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')
os.makedirs('tmp_inspect/short', exist_ok=True)

for p in range(26, 46):
    path = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    if not os.path.exists(path):
        continue
    img = Image.open(path)
    W, H = img.size
    ocr_res = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr_res.get('lines', [])
    text = ocr_res.get('text', '')
    
    # Footnote check: look for "注" in text
    has_note = '注' in text or '※' in text
    
    # Let's find bounding boxes of footnote terms if any
    fn_lines = [line for line in lines if any(k in line.get('text', '') for k in ['注', '※', '（注', '1', '2', '3'])]
    
    # Save a low-res preview or analyze bottom third of page
    bottom_crop = img.crop((0, int(H * 0.55), W, H))
    bottom_crop.save(f'tmp_inspect/short/p{p:03d}_bottom.jpg')
    
    # Let's inspect words and look for any mentions of drawings or visual elements
    print(f"=== Page {p:03d} (short-{p-25}) ===")
    print(f"Has note marker: {has_note}")
    for line in lines:
        lt = line.get('text', '')
        if '注' in lt or '※' in lt or '図' in lt or '絵' in lt:
            print(f"   Line: {lt}")
