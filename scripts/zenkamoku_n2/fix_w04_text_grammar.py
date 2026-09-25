import json
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

KANJI_NUMS = {1: '１', 2: '２', 3: '３', 4: '４', 5: '５'}

for day in range(1, 6):
    fpath = f'src/data/zenkamoku_n2/w04-d0{day}.json'
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for sec in data.get('sections', []):
        if sec.get('type') == 'text_grammar':
            # Wrap passage in .speed-master-lined-paper if not already
            passage = sec.get('passage', '')
            if not passage.startswith('<div class="speed-master-lined-paper'):
                sec['passage'] = f'<div class="speed-master-lined-paper">\n{passage}\n</div>'
            
            # Standardize stems to match N3 Golden Master
            for q in sec.get('questions', []):
                qnum = q.get('number')
                knum = KANJI_NUMS.get(qnum, str(qnum))
                q['stem'] = f"文章中の［{knum}］に入るものをえらびなさい。"
                
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Fixed N2 {fpath} Text Grammar stems to match N3 Golden Master.")

