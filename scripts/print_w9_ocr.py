import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('tmp_inspect/w9_ocr.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for pno, items in data.items():
    print(f'=== PAGE {pno} ===')
    # sort by y then x
    items_sorted = sorted(items, key=lambda it: (it['bbox'][0][1], it['bbox'][0][0]))
    for it in items_sorted:
        y, x = it['bbox'][0][1], it['bbox'][0][0]
        print(f'{y:4d}, {x:4d}: {it["text"]}')
