import json
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for day in range(1, 6):
    fpath = f'src/data/zenkamoku_n2/w04-d0{day}.json'
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"=== N2 Week 4 Day {day} Text Grammar ===")
    for sec in data.get('sections', []):
        if sec.get('type') == 'text_grammar':
            passage = sec.get('passage', '')
            print(f"Passage title: {sec.get('passageTitle')}")
            for num in [1, 2, 3, 4, 5]:
                has_bracket = f"[{num}]" in passage or f"[ {num} ]" in passage or f"［{num}］" in passage or f"［ {num} ］" in passage or f"（{num}）" in passage
                print(f"  Marker [{num}] in passage? {'✅ YES' if has_bracket else '❌ MISSING'}")
