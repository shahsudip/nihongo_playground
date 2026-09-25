import glob
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for w in [5, 6, 7, 8]:
    for d in range(1, 6):
        cid = f"w{w:02d}-d{d:02d}"
        fpath = f"src/data/zenkamoku_n2/{cid}.json"
        if not os.path.exists(fpath):
            continue
        with open(fpath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print(f"=== {cid} ===")
        for sec in data.get('sections', []) + data.get('subSections', []):
            for q in sec.get('questions', []):
                print(f"  Q{q.get('number')}: stem = '{q.get('stem')}'")

