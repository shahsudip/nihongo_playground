"""
05_crop_listening_images.py (v3)
Crops illustration boxes directly from already-rendered tmp_inspect JPEGs.
The tmp_inspect/zenkamoku_n3/page_NNN.jpg files are correctly rendered.
"""
import sys, os
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')

SRC_DIR = os.path.join('tmp_inspect', 'zenkamoku_n3')
OUT_DIR = os.path.join('public', 'images', 'zenkamoku_n3')
os.makedirs(OUT_DIR, exist_ok=True)

def crop_from_jpg(src_jpg, crop_rel, out_filename):
    """
    src_jpg: filename in SRC_DIR (e.g. 'page_163.jpg')
    crop_rel: (left%, top%, right%, bottom%) fractions
    """
    src_path = os.path.join(SRC_DIR, src_jpg)
    img = Image.open(src_path)
    W, H = img.size
    l, t, r, b = crop_rel
    box = (int(l*W), int(t*H), int(r*W), int(b*H))
    crop = img.crop(box)
    arr = np.array(crop.convert('RGB')).astype(np.float32)
    gray = 0.299*arr[:,:,0] + 0.587*arr[:,:,1] + 0.114*arr[:,:,2]
    arr[gray > 230] = 255
    out = np.clip(arr, 0, 255).astype(np.uint8)
    out_path = os.path.join(OUT_DIR, out_filename)
    Image.fromarray(out).save(out_path, quality=95)
    print(f'✓ {out_filename}  box={box}  src_size=({W},{H})')
    return f'/images/zenkamoku_n3/{out_filename}'

# Week11 Day1: page_163.jpg shows book page 162 (第11週1日目)
# Illustration at bottom: roughly top=56% to bottom=97%
CROPS = [
    ('page_163.jpg', (0.04, 0.56, 0.96, 0.97), 'w11_d1_utterance_q1_n74.png', 'N3-74'),
    ('page_165.jpg', (0.04, 0.56, 0.96, 0.97), 'w11_d2_utterance_q1_n78.png', 'N3-78'),
    ('page_167.jpg', (0.04, 0.56, 0.96, 0.97), 'w11_d3_utterance_q1_n82.png', 'N3-82'),
    ('page_169.jpg', (0.04, 0.56, 0.96, 0.97), 'w11_d4_utterance_q1_n86.png', 'N3-86'),
    ('page_171.jpg', (0.04, 0.56, 0.96, 0.97), 'w11_d5_utterance_q1_n90.png', 'N3-90'),
]

# First check which pages exist
import json, os

# Generate missing pages if needed
missing = [c[0] for c in CROPS if not os.path.exists(os.path.join(SRC_DIR, c[0]))]
if missing:
    print(f'Missing pages: {missing} — rendering now...')
    import fitz
    PDF_PATH = r'D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\latest books\全科目攻略JLPT日本語能力試験ベスト総合問題集N3 (五十嵐香子, 金澤美香子, 杉山舞) (z-library.sk, 1lib.sk, z-lib.sk).pdf'
    doc = fitz.open(PDF_PATH)
    pages_needed = set(int(f[5:8]) for f in missing)
    for pn in pages_needed:
        page = doc[pn - 1]  # pn is 1-based filename number, same as book page
        pix = page.get_pixmap(dpi=150)
        pix.save(os.path.join(SRC_DIR, f'page_{pn:03d}.jpg'))
        print(f'  Rendered page_{pn:03d}.jpg')

mapping = []
for (src_jpg, rel, fname, tid) in CROPS:
    if not os.path.exists(os.path.join(SRC_DIR, src_jpg)):
        print(f'⚠️  Skipping {src_jpg} (not found)')
        continue
    img_src = crop_from_jpg(src_jpg, rel, fname)
    mapping.append({'trackId': tid, 'imageSrc': img_src, 'srcPage': src_jpg})

with open('scripts/zenkamoku_n3/illustration_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(mapping, f, ensure_ascii=False, indent=2)

print(f'\n✅ Done: {len(mapping)} images saved')
print('Mapping: scripts/zenkamoku_n3/illustration_mapping.json')
