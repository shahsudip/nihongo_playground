import os, sys
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

img = Image.open('public/speed_master_n3_pages/speed_master_n3_page-0126.jpg')
W, H = img.size
ocr = winocr.recognize_pil_sync(img, 'ja')
lines = ocr.get('lines', [])

arr = np.array(img.convert('L'))
ink = arr < 185

text_mask = np.zeros(arr.shape, dtype=bool)
for l in lines:
    for w in l.get('words', []):
        bb = w.get('bounding_rect', {})
        x = int(bb.get('x', 0))
        y = int(bb.get('y', 0))
        bw = int(bb.get('width', 0))
        bh = int(bb.get('height', 0))
        text_mask[max(0, y-3):min(H, y+bh+3), max(0, x-3):min(W, x+bw+3)] = True
        
non_text = ink & (~text_mask)
# ignore outer borders
non_text[:100, :] = False
non_text[-100:, :] = False
non_text[:, :100] = False
non_text[:, -100:] = False

# Save non_text image to see what graphics are on p126
vis = Image.fromarray((~non_text * 255).astype(np.uint8))
vis.save('tmp_inspect/individual_checks/p126_non_text_map.png')
print("Saved p126 non_text map")
