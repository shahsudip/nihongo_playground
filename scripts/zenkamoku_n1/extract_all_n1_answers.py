import sys
import os
import glob
import json
import easyocr
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def main():
    out_json = r'scripts\zenkamoku_n1\n1_answers_ocr.json'
    if os.path.exists(out_json):
        print(f"Loading existing OCR results from {out_json}")
        with open(out_json, 'r', encoding='utf-8') as f:
            results = json.load(f)
    else:
        results = {}

    reader = easyocr.Reader(['ja', 'en'], gpu=False)
    files = sorted(glob.glob(r'scripts\tmp_inspect_media\n1_answers\*.png'))

    print(f"Found {len(files)} pages to process.")

    for idx, f in enumerate(files):
        base = os.path.basename(f)
        if base in results:
            continue

        print(f"[{idx+1}/{len(files)}] OCR processing {base}...")
        raw_res = reader.readtext(f)
        
        page_items = []
        for bbox, text, conf in raw_res:
            page_items.append({
                "bbox": [[int(pt[0]), int(pt[1])] for pt in bbox],
                "text": text,
                "conf": float(conf)
            })
        
        results[base] = page_items

        # Save checkpoint every 5 pages
        if (idx + 1) % 5 == 0 or idx == len(files) - 1:
            with open(out_json, 'w', encoding='utf-8') as out_f:
                json.dump(results, out_f, ensure_ascii=False, indent=2)
            print(f"Checkpoint saved: {len(results)} pages in {out_json}")

    print("OCR extraction completed.")

if __name__ == '__main__':
    main()
