import sys
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

img91 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0091.jpg')
W, H = img91.size

# Let's crop the table area (around y: 200 to 1800)
table_crop = img91.crop((50, 150, W - 50, int(H * 0.7)))
table_crop.save('tmp_vocab/p91_table.jpg')

# Let's crop row by row: 5 rows (Header, 北図書館, 南図書館, 西図書館, 東図書館)
# Or let's see how many rows/cols
# Let's write a script to crop row slices
H_tbl = table_crop.size[1]
for r in range(6):
    r_img = table_crop.crop((0, int(r * H_tbl / 6), table_crop.size[0], int((r + 1) * H_tbl / 6)))
    r_img.save(f'tmp_vocab/p91_row_{r}.jpg')
    res = winocr.recognize_pil_sync(r_img, 'ja')
    print(f"Row {r}: {res['text']}")
