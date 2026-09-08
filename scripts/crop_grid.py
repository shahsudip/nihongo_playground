import sys
from PIL import Image
import winocr

sys.stdout.reconfigure(encoding='utf-8')

p154 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0154.jpg')
p155 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0155.jpg')

# Let's inspect each Mondai section by cropping smaller blocks
# On p154:
# Mondai 1: top left
# Mondai 2: below Mondai 1
# Mondai 3: bottom left
# Mondai 4: bottom right or middle
# Mondai 5: top right / middle
# Mondai 6: middle right
# Mondai 7: bottom right
# On p155:
# Mondai 8: top left

# Let's crop into a 4x2 grid for p154 and p155 and save them
for p_num, img in [(154, p154), (155, p155)]:
    W, H = img.size
    for row in range(4):
        for col in range(2):
            crop = img.crop((col * (W//2), row * (H//4), (col+1) * (W//2), (row+1) * (H//4)))
            crop.save(f'tmp_vocab/p{p_num}_r{row}_c{col}.jpg')
            res = winocr.recognize_pil_sync(crop, 'ja')
            print(f"=== P{p_num} R{row} C{col} ===")
            print(res['text'])
