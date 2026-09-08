import sys
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

img91 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0091.jpg')
# Let's crop the actual table matrix
# Let's find table bounds
table_img = img91.crop((100, 350, 1750, 1150))
table_img.save('tmp_vocab/p91_exact_table.jpg')

# Let's crop 4 rows: row 0 = 北図書館, row 1 = 南図書館, row 2 = 西図書館, row 3 = 東図書館 (or whatever order)
# Let's slice vertically into 6 columns: [Library Name, 車いす用トイレ, 拡大読書器(※1), 点字本(※2), ビデオ, 食堂]
for r in range(5):
    y1 = int(r * table_img.size[1] / 5)
    y2 = int((r + 1) * table_img.size[1] / 5)
    row_img = table_img.crop((0, y1, table_img.size[0], y2))
    row_img.save(f'tmp_vocab/p91_tbl_row_{r}.jpg')
    for c in range(6):
        x1 = int(c * table_img.size[0] / 6)
        x2 = int((c + 1) * table_img.size[0] / 6)
        cell_img = row_img.crop((x1, 0, x2, row_img.size[1]))
        res = winocr.recognize_pil_sync(cell_img, 'ja')
        txt = res['text'].strip()
        print(f"R{r} C{c}: {txt}")
