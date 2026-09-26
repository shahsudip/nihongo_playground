import os
import glob
import sys
import easyocr
import numpy as np
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')
reader = easyocr.Reader(['ja', 'en'], gpu=False)

# Check page_160 to page_180
for p in sorted(glob.glob('tmp_inspect/zenkamoku_n1/page_1[6-8][0-9].jpg')):
    im = Image.open(p)
    w, h = im.size
    header = im.crop((0, 0, w, int(h * 0.12)))
    res = reader.readtext(np.array(header), detail=0)
    print(f"{os.path.basename(p)} -> {' '.join(res)}")
