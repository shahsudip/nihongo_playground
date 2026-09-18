import sys
import os
import json
import easyocr

sys.stdout.reconfigure(encoding='utf-8')

img_dir = r"tmp_inspect\zenkamoku_n2"
out_file = r"scripts\zenkamoku_n2\ocr_w1_w2.json"

reader = easyocr.Reader(['ja', 'en'], gpu=False)

results = {}
# Pages 16 to 35 cover Week 1 (16-25) and Week 2 (26-35)
for page_num in range(16, 36):
    img_path = os.path.join(img_dir, f"page_{page_num:03d}.jpg")
    if not os.path.exists(img_path):
        print(f"Missing: {img_path}")
        continue
    print(f"Processing page_{page_num:03d}.jpg...")
    # read with details to get bounding boxes
    raw_res = reader.readtext(img_path)
    # convert to serializable format
    page_data = []
    for bbox, text, conf in raw_res:
        page_data.append({
            "bbox": [[int(pt[0]), int(pt[1])] for pt in bbox],
            "text": text,
            "conf": float(conf)
        })
    results[f"page_{page_num:03d}"] = page_data
    print(f"Done page_{page_num:03d}: {len(page_data)} items")

with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Saved all OCR results to {out_file}")
