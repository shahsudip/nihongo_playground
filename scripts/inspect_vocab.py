import sys
import json
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

def dump_page_lines(img_path):
    img = Image.open(img_path)
    res = winocr.recognize_pil_sync(img, 'ja')
    print("Keys in line:", res['lines'][0].keys() if res['lines'] else "Empty")
    for l in res['lines'][:10]:
        print(l)

dump_page_lines('public/speed_master_n3_pages/speed_master_n3_page-0154.jpg')
