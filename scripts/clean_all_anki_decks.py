# scripts/clean_all_anki_decks.py
import json
import re
import glob
import os

deck_dir = r"D:\sudip_software\nihongo_playground\public\anki_decks"
files = glob.glob(os.path.join(deck_dir, "*.json"))

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove {CHECKED} or {checked} or {unchecked} or any {[A-Z0-9_\s-]+} tags
    new_content = re.sub(r'\{[A-Z0-9_\s-]+\}', '', content, flags=re.IGNORECASE)
    
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Cleaned {os.path.basename(filepath)}")
    else:
        print(f"No tags found in {os.path.basename(filepath)}")
