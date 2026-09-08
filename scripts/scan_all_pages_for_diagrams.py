import os
import sys
import glob
import numpy as np
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

# Scan pages from 26 to 137
page_files = sorted(glob.glob('public/speed_master_n3_pages/speed_master_n3_page-*.jpg'))

for pf in page_files:
    filename = os.path.basename(pf)
    num_str = filename.replace('speed_master_n3_page-', '').replace('.jpg', '')
    if not num_str.isdigit():
        continue
    page_num = int(num_str)
    if page_num < 26 or page_num > 138:
        continue
    
    img = Image.open(pf)
    w, h = img.size
    
    # Run winocr to get lines and bounding boxes
    ocr_res = winocr.recognize_pil_sync(img, 'ja')
    lines = ocr_res.get('lines', [])
    text_content = ocr_res.get('text', '')
    
    # Check if there are footnote markers or image-related keywords
    keywords = ['注', '※', '図', '絵', 'イラスト', 'グラフ', '表']
    found_kw = [kw for kw in keywords if kw in text_content]
    
    print(f"Page {page_num:04d} ({w}x{h}): {len(lines)} OCR lines | kw: {found_kw} | preview: {text_content[:60].replace(chr(10), ' ')}")
