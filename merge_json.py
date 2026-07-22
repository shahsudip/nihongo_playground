import os
import json
import glob

extracted_dir = 'extracted_shinmon_n4_n5'
merged_file = 'merged_shinmon_n4_n5.json'
all_data = []

files = glob.glob(os.path.join(extracted_dir, 'page_*.json'))
files.sort()

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        for chap in data:
            if 'id' not in chap or not chap['id']:
                chap['id'] = f"page_{chap.get('page_number', 'unknown')}"
        all_data.extend(data)

with open(merged_file, 'w', encoding='utf-8') as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print(f'Merged {len(files)} files and added id fields.')
