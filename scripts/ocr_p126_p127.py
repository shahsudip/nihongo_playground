import os, sys
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

for name in ['p126_passage_box', 'p127_questions', 'p107_route_map']:
    path = f'tmp_inspect/individual_checks/{name}.jpg'
    img = Image.open(path)
    ocr = winocr.recognize_pil_sync(img, 'ja')
    print(f"\n=== {name} ===")
    for l in ocr['lines']:
        print(l['text'])
