import easyocr
import json
import os
import sys
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')
reader = easyocr.Reader(['ja', 'en'], gpu=False)

pages_data = {}
for pno in range(168, 178):
    p = f'tmp_inspect/zenkamoku_n1/page_{pno}.jpg'
    im = Image.open(p)
    raw_res = reader.readtext(np.array(im))
    # format: [bbox, text, prob]
    items = []
    for bbox, text, prob in raw_res:
        items.append({
            'bbox': [[int(x), int(y)] for x, y in bbox],
            'text': text,
            'prob': float(prob)
        })
    pages_data[str(pno)] = items
    print(f'Page {pno} OCR complete: {len(items)} items')

with open('tmp_inspect/w9_ocr.json', 'w', encoding='utf-8') as f:
    json.dump(pages_data, f, ensure_ascii=False, indent=2)

print('Saved to tmp_inspect/w9_ocr.json')
