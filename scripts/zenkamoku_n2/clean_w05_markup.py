import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for day in range(1, 6):
    fpath = f'src/data/zenkamoku_n2/w05-d0{day}.json'
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for sec in data.get('sections', []):
        passage = sec.get('passage', '')
        if passage:
            # Replace harsh bg-white with theme-friendly background
            cleaned = passage.replace('bg-white dark:bg-slate-900', 'bg-amber-50/20 dark:bg-slate-900/60')
            cleaned = cleaned.replace('bg-white dark:bg-slate-800', 'bg-amber-50/20 dark:bg-slate-900/60')
            cleaned = cleaned.replace('bg-white', 'bg-transparent')
            
            # Clean excessive spacing/newlines inside tags
            cleaned = re.sub(r'>\s*\n\s*<', '><', cleaned)
            sec['passage'] = cleaned

    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Cleaned markup in {fpath}")
