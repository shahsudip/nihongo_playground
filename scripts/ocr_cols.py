import sys
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

# Let's crop page 154 specifically for Mondai 1, 2, 3, 4, 5, 6, 7
p154 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0154.jpg')
p155 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0155.jpg')

# Let's crop vertical columns of p154
# Usually there are 2 or 3 columns.
W, H = p154.size
col_w = W // 3
for i in range(3):
    col = p154.crop((i * col_w, 0, (i + 1) * col_w, H))
    col.save(f'tmp_vocab/p154_col_{i}.jpg')
    res = winocr.recognize_pil_sync(col, 'ja')
    print(f"=== P154 COL {i} ===")
    for l in res['lines']:
        print(l['text'])

for i in range(3):
    col = p155.crop((i * col_w, 0, (i + 1) * col_w, H))
    col.save(f'tmp_vocab/p155_col_{i}.jpg')
    res = winocr.recognize_pil_sync(col, 'ja')
    print(f"=== P155 COL {i} ===")
    for l in res['lines']:
        print(l['text'])
