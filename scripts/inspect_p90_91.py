import sys
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

for p in [90, 91]:
    img = Image.open(f'public/speed_master_n3_pages/speed_master_n3_page-00{p}.jpg')
    res = winocr.recognize_pil_sync(img, 'ja')
    print(f"=== FULL TEXT PAGE {p} ===")
    for line in res['lines']:
        print(line['text'])
