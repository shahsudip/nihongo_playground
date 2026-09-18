import sys
import os
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

IN_DIR = r"D:\sudip_software\nihongo_playground\tmp_inspect\zenkamoku_n2"
OUT_DIR = r"D:\sudip_software\nihongo_playground\public\images\zenkamoku_n2"
os.makedirs(OUT_DIR, exist_ok=True)

CROPS = {
    # Week 5: 5 days, 5 passages each
    "w05_d01_p1": (76, (70, 420, 1160, 780)),
    "w05_d01_p2": (77, (70, 120, 1160, 1340)),
    "w05_d01_p3": (78, (70, 100, 1160, 510)),
    "w05_d01_p4": (78, (70, 800, 1160, 1220)),
    "w05_d01_p5": (79, (70, 100, 1160, 670)),

    "w05_d02_p1": (80, (70, 420, 1160, 760)),
    "w05_d02_p2": (81, (70, 120, 1160, 1250)),
    "w05_d02_p3": (82, (70, 100, 1160, 560)),
    "w05_d02_p4": (82, (70, 820, 1160, 1240)),
    "w05_d02_p5": (83, (70, 100, 1160, 560)),

    "w05_d03_p1": (84, (70, 420, 1160, 1010)),
    "w05_d03_p2": (85, (70, 100, 1160, 690)),
    "w05_d03_p3": (86, (70, 100, 1160, 590)),
    "w05_d03_p4": (86, (70, 840, 1160, 1370)),
    "w05_d03_p5": (87, (70, 120, 1160, 1220)),

    "w05_d04_p1": (88, (70, 420, 1160, 890)),
    "w05_d04_p2": (89, (70, 120, 1160, 1360)),
    "w05_d04_p3": (90, (70, 100, 1160, 390)),
    "w05_d04_p4": (90, (70, 650, 1160, 1120)),
    "w05_d04_p5": (91, (70, 100, 1160, 720)),

    "w05_d05_p1": (92, (70, 420, 1160, 910)),
    "w05_d05_p2": (93, (70, 100, 1160, 620)),
    "w05_d05_p3": (94, (70, 100, 1160, 480)),
    "w05_d05_p4": (94, (70, 750, 1160, 1160)),
    "w05_d05_p5": (95, (70, 100, 1160, 1360)),

    # Week 6: 5 days, 3 passages each
    "w06_d01_p1": (96, (70, 280, 1160, 1460)),
    "w06_d01_p2": (98, (70, 100, 1160, 1200)),
    "w06_d01_p3": (100, (70, 100, 1160, 1360)),

    "w06_d02_p1": (102, (70, 100, 1160, 1500)),
    "w06_d02_p2": (104, (70, 100, 1160, 1080)),
    "w06_d02_p3": (106, (70, 100, 1160, 1140)),

    "w06_d03_p1": (108, (70, 100, 1160, 1510)),
    "w06_d03_p2": (110, (70, 100, 1160, 1070)),
    "w06_d03_p3": (112, (70, 100, 1160, 890)),

    "w06_d04_p1": (114, (70, 100, 1160, 1440)),
    "w06_d04_p2": (116, (70, 100, 1160, 1130)),
    "w06_d04_p3": (118, (70, 100, 1160, 1380)),

    "w06_d05_p1": (120, (70, 100, 1160, 1410)),
    "w06_d05_p2": (122, (70, 100, 1160, 1260)),
    "w06_d05_p3": (124, (70, 100, 1160, 1260)),

    # Week 7: 5 days, 2 passages each (Integrated + Long)
    "w07_d01_p1": (126, (70, 280, 1160, 1640)),
    "w07_d01_p2": (128, (70, 320, 1160, 1640)),

    "w07_d02_p1": (130, (70, 100, 1160, 1640)),
    "w07_d02_p2": (132, (70, 100, 1160, 1640)),

    "w07_d03_p1": (134, (70, 100, 1160, 1500)),
    "w07_d03_p2": (136, (70, 100, 1160, 1640)),

    "w07_d04_p1": (138, (70, 100, 1160, 1640)),
    "w07_d04_p2": (140, (70, 100, 1160, 1640)),

    "w07_d05_p1": (142, (70, 100, 1160, 1640)),
    "w07_d05_p2": (144, (70, 100, 1160, 1500)),

    # Week 8: 5 days, 1 document each (Information Retrieval)
    "w08_d01_passage": (147, (115, 85, 1150, 1645)),
    "w08_d02_passage": (149, (115, 85, 1150, 1645)),
    "w08_d03_passage": (151, (115, 85, 1150, 1645)),
    "w08_d04_passage": (153, (115, 85, 1150, 1645)),
    "w08_d05_passage": (155, (115, 85, 1150, 1645)),
}

# Also create convenience aliases
ALIASES = {
    "w05_d01_passage": "w05_d01_p1",
    "w05_d02_passage": "w05_d02_p1",
    "w05_d03_passage": "w05_d03_p1",
    "w05_d04_passage": "w05_d04_p1",
    "w05_d05_passage": "w05_d05_p1",
    "w06_d01_passage": "w06_d01_p1",
    "w06_d02_passage": "w06_d02_p1",
    "w06_d03_passage": "w06_d03_p1",
    "w06_d04_passage": "w06_d04_p1",
    "w06_d05_passage": "w06_d05_p1",
    "w07_d01_passage": "w07_d01_p1",
    "w07_d02_passage": "w07_d02_p1",
    "w07_d03_passage": "w07_d03_p1",
    "w07_d04_passage": "w07_d04_p1",
    "w07_d05_passage": "w07_d05_p1",
    "w08_d01_p1": "w08_d01_passage",
    "w08_d02_p1": "w08_d02_passage",
    "w08_d03_p1": "w08_d03_passage",
    "w08_d04_p1": "w08_d04_passage",
    "w08_d05_p1": "w08_d05_passage",
}

print(f"Total crops to process: {len(CROPS)}")

for name, (page_num, box) in CROPS.items():
    page_file = os.path.join(IN_DIR, f"page_{page_num:03d}.jpg")
    if not os.path.exists(page_file):
        print(f"ERROR: Missing {page_file}")
        continue
    im = Image.open(page_file)
    cropped = im.crop(box)
    out_path = os.path.join(OUT_DIR, f"{name}.png")
    cropped.save(out_path, format="PNG", optimize=True)
    print(f"✓ Saved {name}.png ({cropped.size[0]}x{cropped.size[1]}) from page_{page_num:03d}")

for alias, src in ALIASES.items():
    src_file = os.path.join(OUT_DIR, f"{src}.png")
    alias_file = os.path.join(OUT_DIR, f"{alias}.png")
    if os.path.exists(src_file) and not os.path.exists(alias_file):
        im = Image.open(src_file)
        im.save(alias_file, format="PNG", optimize=True)
        print(f"✓ Created alias {alias}.png -> {src}.png")

print(f"\nAll crops successfully generated in {OUT_DIR}!")
