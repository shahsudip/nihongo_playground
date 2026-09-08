import os, sys, glob
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')
os.makedirs('tmp_inspect/page_crops', exist_ok=True)

# Let's inspect each chapter and save high quality subcrops of:
# 1. Footnote box
# 2. Any middle/side margin
# 3. Question options

chapters_to_check = [
    # Short
    *(('short', i, 25+i, 25+i) for i in range(1, 21)),
    # Medium
    ('medium', 1, 46, 46),
    ('medium', 2, 47, 47),
    ('medium', 3, 48, 48),
    ('medium', 4, 49, 49),
    ('medium', 5, 50, 50),
    ('medium', 6, 51, 52),
    ('medium', 7, 53, 53),
    ('medium', 8, 54, 54),
    ('medium', 9, 55, 56),
    ('medium', 10, 57, 57),
    ('medium', 11, 58, 58),
    ('medium', 12, 59, 59),
    ('medium', 13, 60, 60),
    ('medium', 14, 61, 62),
    ('medium', 15, 63, 63),
    ('medium', 16, 64, 65),
    # Long
    *(('long', i, 64+2*i, 65+2*i) for i in range(1, 13)),
    # Search
    ('search', 1, 90, 91),
    ('search', 2, 92, 93),
    ('search', 3, 94, 95),
    ('search', 4, 96, 97),
    ('search', 5, 98, 99),
    ('search', 6, 100, 101),
    ('search', 7, 102, 103),
    ('search', 8, 104, 105),
    ('search', 9, 106, 107),
    ('search', 10, 108, 109),
    ('search', 11, 110, 111),
    ('search', 12, 112, 113),
    ('search', 13, 114, 115),
    ('search', 14, 116, 117),
    ('search', 15, 118, 119),
    # Mock Exam
    ('mock', 1, 122, 122),
    ('mock', 2, 123, 123),
    ('mock', 3, 124, 124),
    ('mock', 4, 125, 125),
    ('mock', 5, 126, 127),
    ('mock', 6, 128, 129),
    ('mock', 7, 130, 131),
    ('mock', 8, 132, 133),
]

for cat, num, p_start, p_end in chapters_to_check:
    for p in range(p_start, p_end + 1):
        pf = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
        if not os.path.exists(pf):
            continue
        img = Image.open(pf)
        W, H = img.size
        
        # Save lower half of page (where footnotes & options are)
        # and full page thumbnail
        thumb = img.resize((W // 4, H // 4))
        thumb.save(f'tmp_inspect/page_crops/{cat}_{num}_p{p:03d}_thumb.jpg')

print("Generated thumbnails for all chapters.")
