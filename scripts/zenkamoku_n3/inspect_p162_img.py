import sys, fitz, os
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')

PDF_PATH = r'D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\latest books\全科目攻略JLPT日本語能力試験ベスト総合問題集N3 (五十嵐香子, 金澤美香子, 杉山舞) (z-library.sk, 1lib.sk, z-lib.sk).pdf'
doc = fitz.open(PDF_PATH)

# Page 162 (0-indexed: 161) = Week11 Day1 発話表現 N3-74
page = doc[161]
print('Page rect:', page.rect)

imgs = page.get_images(full=True)
print('Images on page:', len(imgs))
for img in imgs:
    xref = img[0]
    bi = doc.extract_image(xref)
    w, h = bi['width'], bi['height']
    ext = bi['ext']
    print(f'  xref={xref} ext={ext} w={w} h={h}')
    rects = page.get_image_rects(xref)
    for r in rects:
        print(f'  rect on page={r}')

    # Save the raw image
    out_path = f'tmp_inspect/zenkamoku_n3/raw_img_p162_xref{xref}.{ext}'
    with open(out_path, 'wb') as f:
        f.write(bi['image'])
    print(f'  Saved raw: {out_path}')
