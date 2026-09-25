import winocr, sys, os, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# Read OCR on pages 194 to 197
ocr_results = {}
for p in range(194, 198):
    fn = f'tmp_inspect/zenkamoku_n1/page_{p:03d}.jpg'
    res = winocr.recognize_pil_sync(Image.open(fn), lang='ja')
    lines = [l['text'] for l in res['lines']]
    ocr_results[p] = lines
    print(f"Page {p}: {len(lines)} lines")

with open('scripts/zenkamoku_n1/answer_ocr_lines.json', 'w', encoding='utf-8') as f:
    json.dump(ocr_results, f, ensure_ascii=False, indent=2)

print("Saved answer_ocr_lines.json")
