import easyocr
import os
import sys
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')
reader = easyocr.Reader(['ja', 'en'], gpu=False)

for pno in range(198, 220):
    p = f'tmp_inspect/zenkamoku_n1/page_{pno:03d}.jpg'
    if not os.path.exists(p): continue
    im = Image.open(p)
    w, h = im.size
    header = im.crop((0, 0, w, int(h * 0.15)))
    res = reader.readtext(np.array(header), detail=0)
    print(f'page_{pno:03d}.jpg -> {" ".join(res)}')
