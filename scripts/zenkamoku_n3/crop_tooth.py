import os
from PIL import Image

img_path = r'D:\sudip_software\nihongo_playground\tmp_inspect\zenkamoku_n3\page_086.jpg'
out_path = r'D:\sudip_software\nihongo_playground\public\images\zenkamoku_n3\w05_d05_tooth.png'

# Let's crop the bottom left area
# The page size is probably around 1654x2339 (A4)
# Tooth is roughly bottom left
img = Image.open(img_path)
W, H = img.size

# Estimated box for tooth image
# Left: 10% to 40%
# Top: 60% to 85%
l = int(0.10 * W)
r = int(0.40 * W)
t = int(0.65 * H)
b = int(0.85 * H)

crop = img.crop((l, t, r, b))
crop.save(out_path)
print('Cropped tooth image to', out_path)
