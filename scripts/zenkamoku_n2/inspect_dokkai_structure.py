import sys
import os
import json
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# Verify master answer key has all questions
key_path = r"D:\sudip_software\nihongo_playground\scripts\zenkamoku_n2\answer_keys_raw.json"
with open(key_path, 'r', encoding='utf-8') as f:
    keys = json.load(f)

for w in range(5, 9):
    w_key = f"w{w:02d}"
    print(f"=== {w_key} ===")
    for d in range(1, 6):
        d_key = f"d{d:02d}"
        day_keys = keys.get(w_key, {}).get(d_key, {})
        print(f"  {d_key}: {len(day_keys)} questions -> {day_keys}")
