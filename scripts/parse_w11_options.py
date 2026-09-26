import json
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for fpath in sorted(glob.glob('src/data/zenkamoku_n1/w11-d0*.json')):
    with open(fpath, 'r', encoding='utf-8') as fp:
        data = json.load(fp)
    updated = 0
    for q in data.get('questions', []):
        script = q.get('script', '')
        parts = re.findall(r'(?:^|<br\s*/>|\s)([123１２３])\s*([^\d<][^<]*)', script)
        opts_map = {}
        for num_str, text in parts:
            num = int(num_str.replace('１','1').replace('２','2').replace('３','3'))
            if num in [1, 2, 3] and num not in opts_map:
                clean_t = text.strip().replace('男:', '').replace('女:', '').strip()
                if clean_t:
                    opts_map[num] = f'{num}. {clean_t}'
        if len(opts_map) == 3:
            q['options'] = [opts_map[1], opts_map[2], opts_map[3]]
            c = q['correct']
            q['correctOption'] = q['options'][c - 1]
            updated += 1
    with open(fpath, 'w', encoding='utf-8') as fp:
        json.dump(data, fp, ensure_ascii=False, indent=2)
    print(f"{fpath}: {updated}/{len(data['questions'])} options parsed from scripts")
