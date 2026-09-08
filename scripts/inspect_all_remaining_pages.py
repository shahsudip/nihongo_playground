import os, sys, glob
import numpy as np
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')
os.makedirs('tmp_inspect/medium', exist_ok=True)
os.makedirs('tmp_inspect/long', exist_ok=True)
os.makedirs('tmp_inspect/search', exist_ok=True)
os.makedirs('tmp_inspect/mock', exist_ok=True)

# Scan all pages from 46 to 138
for p in range(46, 139):
    path = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    if not os.path.exists(path):
        continue
    img = Image.open(path)
    W, H = img.size
    ocr_res = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr_res.get('lines', [])
    text = ocr_res.get('text', '')
    
    # Check category
    if 46 <= p <= 65:
        cat = 'medium'
    elif 66 <= p <= 89:
        cat = 'long'
    elif 90 <= p <= 121:
        cat = 'search'
    else:
        cat = 'mock'
        
    # Save mid and bottom crops for visual verification
    mid_crop = img.crop((0, int(H * 0.35), W, int(H * 0.80)))
    mid_crop.save(f'tmp_inspect/{cat}/p{p:03d}_mid.jpg')
    
    fn_lines = [l.get('text', '') for l in lines if any(k in l.get('text', '') for k in ['注', '※', '図', '絵', 'イラスト', 'グラフ', '表', '案内', 'マップ', '階', '室'])]
    
    print(f"Page {p:03d} [{cat:6s}] ({W}x{H}) | {len(lines):2d} lines | {fn_lines[:3]}")
