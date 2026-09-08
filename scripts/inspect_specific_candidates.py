import os, sys, glob
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

def detailed_inspect(pages):
    for p in pages:
        pf = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
        if not os.path.exists(pf):
            continue
        img = Image.open(pf)
        W, H = img.size
        ocr = winocr.recognize_pil_sync(img, 'ja')
        lines = ocr.get('lines', [])
        
        print(f"\n================ PAGE {p:03d} ================")
        print(f"Total lines: {len(lines)}")
        
        # Check text lines for any mention of illustrations or footnotes
        fn_lines = [l.get('text', '') for l in lines if any(k in l.get('text', '') for k in ['※', '注', '図', '絵', 'イラスト', '右', '左', '下', '上'])]
        for fl in fn_lines:
            print(f"  [FN/Ref]: {fl}")

pages_to_check = [60, 63, 66, 67, 68, 69, 74, 75, 76, 77, 88, 89, 90, 91, 92, 93, 94, 95, 98, 99, 102, 103, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 126, 127, 128, 129, 130, 131, 132, 133]
detailed_inspect(pages_to_check)
