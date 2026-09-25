import json
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for fpath in sorted(glob.glob('src/data/zenkamoku_n2/w0[5678]-*.json')):
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    modified = False
    for sec in data.get('sections', []) + data.get('subSections', []):
        passage = sec.get('passage', '')
        if passage and 'bg-white' in passage:
            cleaned = passage.replace('bg-white/60 dark:bg-gray-800/40', 'bg-amber-50/30 dark:bg-slate-800/50')
            cleaned = cleaned.replace('bg-white dark:bg-slate-900', 'bg-amber-50/20 dark:bg-slate-900/60')
            cleaned = cleaned.replace('bg-white dark:bg-slate-800', 'bg-amber-50/20 dark:bg-slate-900/60')
            cleaned = cleaned.replace('bg-white', 'bg-amber-50/20 dark:bg-slate-900/60')
            sec['passage'] = cleaned
            modified = True
    
    if modified:
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Cleaned {fpath}")

print("Done cleaning bg-white in N2 Dokkai files.")
