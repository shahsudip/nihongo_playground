import os, sys, json

sys.stdout.reconfigure(encoding='utf-8')

for i in range(1, 16):
    json_path = f'src/data/speed_master_n3_reading/search-{i}.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        d = json.load(f)
    pt = d.get('passageText', '') or ''
    has_img = '<img' in pt
    has_table = '<table' in pt
    print(f"search-{i:02d} | title: {d.get('title',''):20s} | has_img: {has_img} | has_table: {has_table} | len(pt): {len(pt)}")
