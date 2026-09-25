"""
extract_all_n1_raw.py
Extracts OCR lines from all pages of Zenkamoku N1 (pp. 16 to 192) and saves to a JSON cache.
"""
import winocr, sys, os, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
INSPECT_DIR = os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n1")
CACHE_FILE = os.path.join(BASE_DIR, "scripts", "zenkamoku_n1", "n1_ocr_cache.json")

print("Extracting OCR lines for all N1 pages...")

cache = {}
if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            cache = json.load(f)
        print(f"Loaded existing cache with {len(cache)} pages.")
    except Exception:
        pass

for p in range(19, 195):
    p_str = str(p)
    if p_str in cache:
        continue
    fn = os.path.join(INSPECT_DIR, f"page_{p:03d}.jpg")
    if not os.path.exists(fn):
        continue
    img = Image.open(fn)
    res = winocr.recognize_pil_sync(img, lang='ja')
    lines = [l['text'] for l in res['lines']]
    cache[p_str] = lines
    if p % 10 == 0:
        print(f"  Processed page {p}...")

with open(CACHE_FILE, 'w', encoding='utf-8') as f:
    json.dump(cache, f, ensure_ascii=False, indent=2)

print(f"All {len(cache)} pages OCR cached successfully!")
