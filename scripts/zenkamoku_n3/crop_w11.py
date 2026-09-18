import os
from PIL import Image

SRC_DIR = r'D:\sudip_software\nihongo_playground\tmp_inspect\zenkamoku_n3'
OUT_DIR = r'D:\sudip_software\nihongo_playground\public\images\zenkamoku_n3'

# Mapping of day to (page1, page2)
days = {
    1: (163, 164),
    2: (165, 166),
    3: (167, 168),
    4: (169, 170),
    5: (171, 172)
}

# (left, top, right, bottom)
# For page 1, Q1 is at the bottom
q1_box = (0.08, 0.55, 0.62, 0.88)
# For page 2, Q2, Q3, Q4 are stacked
q2_box = (0.10, 0.05, 0.62, 0.35)
q3_box = (0.10, 0.35, 0.62, 0.65)
q4_box = (0.10, 0.65, 0.62, 0.95)

def crop_and_save(img_path, box, out_path):
    img = Image.open(img_path)
    W, H = img.size
    l, t, r, b = box
    crop = img.crop((int(l*W), int(t*H), int(r*W), int(b*H)))
    crop.convert('RGB').save(out_path, quality=90)

for d, (p1, p2) in days.items():
    p1_path = os.path.join(SRC_DIR, f'page_{p1:03d}.jpg')
    p2_path = os.path.join(SRC_DIR, f'page_{p2:03d}.jpg')
    
    crop_and_save(p1_path, q1_box, os.path.join(OUT_DIR, f'w11_d{d}_q1.jpg'))
    crop_and_save(p2_path, q2_box, os.path.join(OUT_DIR, f'w11_d{d}_q2.jpg'))
    crop_and_save(p2_path, q3_box, os.path.join(OUT_DIR, f'w11_d{d}_q3.jpg'))
    crop_and_save(p2_path, q4_box, os.path.join(OUT_DIR, f'w11_d{d}_q4.jpg'))
    print(f'Done cropping D{d}')
