import os, sys
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

# Inspect p68 footnote
img = Image.open('tmp_inspect/individual_checks/p68_footnote.jpg')
res = winocr.recognize_pil_sync(img, 'ja')
print("=== P68 Footnote OCR ===")
for l in res['lines']:
    print(l['text'])

# Inspect p88 footnote
img = Image.open('tmp_inspect/individual_checks/p88_footnote.jpg')
res = winocr.recognize_pil_sync(img, 'ja')
print("\n=== P88 Footnote OCR ===")
for l in res['lines']:
    print(l['text'])

# Inspect p63 footnote
img = Image.open('tmp_inspect/individual_checks/p63_footnote.jpg')
res = winocr.recognize_pil_sync(img, 'ja')
print("\n=== P63 Footnote OCR ===")
for l in res['lines']:
    print(l['text'])
