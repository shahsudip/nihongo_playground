import os, sys
from PIL import Image

os.makedirs('tmp_inspect/detailed_candidates', exist_ok=True)

candidate_pages = [
    37, 39, 47, 51, 52, 53, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
    66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133
]

for p in candidate_pages:
    pf = f'public/speed_master_n3_pages/speed_master_n3_page-{p:04d}.jpg'
    if not os.path.exists(pf):
        continue
    img = Image.open(pf)
    W, H = img.size
    
    # Save 3 crops: top (passage), mid (footnote/table), bottom (questions)
    top_crop = img.crop((0, 0, W, int(H * 0.45)))
    mid_crop = img.crop((0, int(H * 0.35), W, int(H * 0.75)))
    bot_crop = img.crop((0, int(H * 0.65), W, H))
    
    top_crop.save(f'tmp_inspect/detailed_candidates/p{p:03d}_top.jpg')
    mid_crop.save(f'tmp_inspect/detailed_candidates/p{p:03d}_mid.jpg')
    bot_crop.save(f'tmp_inspect/detailed_candidates/p{p:03d}_bot.jpg')

print("All candidate crops saved.")
