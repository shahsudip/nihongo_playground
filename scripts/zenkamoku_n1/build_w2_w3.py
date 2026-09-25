"""
build_w2_w3.py
Parses and builds Week 2 and Week 3 of Zenkamoku N1.
"""
import winocr, sys, os, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
INSPECT_DIR = os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n1")
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")

def get_page_text(p_num):
    fn = os.path.join(INSPECT_DIR, f"page_{p_num:03d}.jpg")
    img = Image.open(fn)
    res = winocr.recognize_pil_sync(img, lang='ja')
    return res

# Let's inspect Week 2 days:
# Day 1: p29 (Paraphrases), p30 (Usage)
# Day 2: p31 (Paraphrases), p32 (Usage)
# Day 3: p33 (Paraphrases), p34 (Usage)
# Day 4: p35 (Paraphrases), p36 (Usage)
# Day 5: p37 (Paraphrases), p38 (Usage)

print("Reading Week 2 pages...")
w2_data = {}
for d in range(1, 6):
    p_para = 29 + (d - 1) * 2
    p_usage = p_para + 1
    w2_data[d] = {
        'para_res': get_page_text(p_para),
        'usage_res': get_page_text(p_usage)
    }
    print(f"Day {d}: p{p_para} ({len(w2_data[d]['para_res']['lines'])} lines), p{p_usage} ({len(w2_data[d]['usage_res']['lines'])} lines)")

print("Week 2 pages OCR completed.")
