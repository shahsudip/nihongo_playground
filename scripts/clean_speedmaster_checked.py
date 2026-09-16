# scripts/clean_speedmaster_checked.py
import json
import re
import os

filepath = r"D:\sudip_software\nihongo_playground\public\anki_decks\speed_master_2400_data.json"

if not os.path.exists(filepath):
    print("File not found:", filepath)
    exit(1)

with open(filepath, "r", encoding="utf-8") as f:
    data = json.load(f)

cards = data.get("cards", [])
modified_count = 0

for card in cards:
    raw_sent = card.get("sentence", "")
    if "{CHECKED}" in raw_sent or "{checked}" in raw_sent or "<FONT" in raw_sent or "<font" in raw_sent:
        # Clean {CHECKED}
        cleaned = re.sub(r'\{[A-Z0-9_\s-]+\}', '', raw_sent, flags=re.IGNORECASE)
        # Clean repeated FONT COLOR tags to bold
        cleaned = re.sub(r'<FONT\s+COLOR="[^"]+">(.*?)</FONT>', r'<b>\1</b>', cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r'<FONT\s+COLOR="[^"]+">(.*?)</FONT>', r'<b>\1</b>', cleaned, flags=re.IGNORECASE) # repeat for nested
        cleaned = re.sub(r'<b>\s*<b>(.*?)</b>\s*</b>', r'<b>\1</b>', cleaned)
        card["sentence"] = cleaned.strip()
        modified_count += 1

with open(filepath, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Cleaned {modified_count} cards in speed_master_2400_data.json")
