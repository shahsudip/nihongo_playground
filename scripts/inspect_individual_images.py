import os, sys
from PIL import Image

os.makedirs('tmp_inspect/individual_checks', exist_ok=True)

# Let's inspect page 68 (long-2)
p68 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0068.jpg')
W, H = p68.size
# Crop the footnote box of p68 (y: 60% to 90%)
p68.crop((0, int(H * 0.60), W, int(H * 0.95))).save('tmp_inspect/individual_checks/p68_footnote.jpg')

# Let's inspect page 88 (long-12)
p88 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0088.jpg')
p88.crop((0, int(H * 0.60), W, int(H * 0.95))).save('tmp_inspect/individual_checks/p88_footnote.jpg')

# Let's inspect page 63 (medium-15)
p63 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0063.jpg')
p63.crop((0, int(H * 0.40), W, int(H * 0.75))).save('tmp_inspect/individual_checks/p63_footnote.jpg')

# Let's inspect page 74 (long-5)
p74 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0074.jpg')
p74.crop((0, int(H * 0.60), W, int(H * 0.95))).save('tmp_inspect/individual_checks/p74_footnote.jpg')

# Let's inspect page 76 (long-6)
p76 = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0076.jpg')
p76.crop((0, int(H * 0.60), W, int(H * 0.95))).save('tmp_inspect/individual_checks/p76_footnote.jpg')

# Search pages:
for p in [91, 107, 111, 113, 115, 117, 126, 127]:
    img = Image.open(f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg')
    img.save(f'tmp_inspect/individual_checks/p{p:03d}_full.jpg')

print("Saved individual check crops.")
