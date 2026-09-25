import winocr, sys, os, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
INSPECT_DIR = os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n1")
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")

def ocr_page(p_num):
    fn = os.path.join(INSPECT_DIR, f"page_{p_num:03d}.jpg")
    img = Image.open(fn)
    res = winocr.recognize_pil_sync(img, lang='ja')
    return res

# Let's inspect pages 29 to 34
for p in range(29, 35):
    res = ocr_page(p)
    print(f"=== Page {p} ({len(res['lines'])} lines) ===")
    for l in res['lines'][:15]:
        print(" ", l['text'])
