import sys
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

img91 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0091.jpg')
W, H = img91.size

# Let's crop different vertical bands and horizontal sections of page 91
for i in range(5):
    band = img91.crop((0, int(i * H / 5), W, int((i + 1) * H / 5)))
    res = winocr.recognize_pil_sync(band, 'ja')
    print(f"=== BAND {i} ===")
    for l in res['lines']:
        print(l['text'])
