import os
import sys
import json
from PIL import Image
import easyocr

sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('tmp_inspect/slices', exist_ok=True)
reader = easyocr.Reader(['ja', 'en'], gpu=False)

w1_slices_even = [
    ('kanji_reading', 1, (100, 340, 1150, 465)),
    ('kanji_reading', 2, (100, 480, 1150, 605)),
    ('kanji_reading', 3, (100, 620, 1150, 745)),
    ('kanji_reading', 4, (100, 750, 1150, 875)),
    ('kanji_reading', 5, (100, 880, 1150, 1005)),
    ('orthography', 1, (100, 1220, 1150, 1345)),
    ('orthography', 2, (100, 1360, 1150, 1485)),
    ('orthography', 3, (100, 1490, 1150, 1625)),
]

w1_slices_odd = [
    ('orthography', 4, (100, 75, 1150, 200)),
    ('orthography', 5, (100, 210, 1150, 340)),
    ('word_formation', 1, (100, 550, 1150, 675)),
    ('word_formation', 2, (100, 690, 1150, 815)),
    ('word_formation', 3, (100, 820, 1150, 945)),
    ('word_formation', 4, (100, 960, 1150, 1085)),
    ('word_formation', 5, (100, 1090, 1150, 1220)),
]

w2_slices_even = [
    ('contextually_defined_expressions', 1, (100, 340, 1150, 465)),
    ('contextually_defined_expressions', 2, (100, 480, 1150, 605)),
    ('contextually_defined_expressions', 3, (100, 615, 1150, 740)),
    ('contextually_defined_expressions', 4, (100, 745, 1150, 870)),
    ('contextually_defined_expressions', 5, (100, 880, 1150, 1005)),
    ('contextually_defined_expressions', 6, (100, 1010, 1150, 1135)),
    ('contextually_defined_expressions', 7, (100, 1145, 1150, 1270)),
]

w2_slices_odd = [
    ('paraphrases', 1, (100, 250, 1150, 375)),
    ('paraphrases', 2, (100, 390, 1150, 515)),
    ('paraphrases', 3, (100, 525, 1150, 650)),
    ('paraphrases', 4, (100, 660, 1150, 785)),
    ('paraphrases', 5, (100, 795, 1150, 920)),
]

all_data = {}

# Process Week 1 (Days 1-5, pages 16-25)
for d in range(1, 6):
    day_id = f"w01-d{d:02d}"
    all_data[day_id] = {}
    page_even = 14 + d * 2
    page_odd = page_even + 1
    
    im_even = Image.open(f"tmp_inspect/zenkamoku_n2/page_{page_even:03d}.jpg")
    im_odd = Image.open(f"tmp_inspect/zenkamoku_n2/page_{page_odd:03d}.jpg")
    
    print(f"Processing {day_id} (pages {page_even}, {page_odd})...")
    
    for sec_type, q_num, bbox in w1_slices_even:
        crop_path = f"tmp_inspect/slices/{day_id}_{sec_type}_{q_num}.png"
        im_even.crop(bbox).save(crop_path)
        ocr_res = reader.readtext(crop_path, detail=0)
        key = f"{sec_type}_{q_num}"
        all_data[day_id][key] = ocr_res
        
    for sec_type, q_num, bbox in w1_slices_odd:
        crop_path = f"tmp_inspect/slices/{day_id}_{sec_type}_{q_num}.png"
        im_odd.crop(bbox).save(crop_path)
        ocr_res = reader.readtext(crop_path, detail=0)
        key = f"{sec_type}_{q_num}"
        all_data[day_id][key] = ocr_res

# Process Week 2 (Days 1-5, pages 26-35)
for d in range(1, 6):
    day_id = f"w02-d{d:02d}"
    all_data[day_id] = {}
    page_even = 24 + d * 2
    page_odd = page_even + 1
    
    im_even = Image.open(f"tmp_inspect/zenkamoku_n2/page_{page_even:03d}.jpg")
    im_odd = Image.open(f"tmp_inspect/zenkamoku_n2/page_{page_odd:03d}.jpg")
    
    print(f"Processing {day_id} (pages {page_even}, {page_odd})...")
    
    for sec_type, q_num, bbox in w2_slices_even:
        crop_path = f"tmp_inspect/slices/{day_id}_{sec_type}_{q_num}.png"
        im_even.crop(bbox).save(crop_path)
        ocr_res = reader.readtext(crop_path, detail=0)
        key = f"{sec_type}_{q_num}"
        all_data[day_id][key] = ocr_res
        
    for sec_type, q_num, bbox in w2_slices_odd:
        crop_path = f"tmp_inspect/slices/{day_id}_{sec_type}_{q_num}.png"
        im_odd.crop(bbox).save(crop_path)
        ocr_res = reader.readtext(crop_path, detail=0)
        key = f"{sec_type}_{q_num}"
        all_data[day_id][key] = ocr_res

out_file = "scripts/zenkamoku_n2/slices_ocr.json"
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print(f"Done! Saved all question slice OCRs to {out_file}")
