import json
import os

file_path = "nihongo power drill/power_drill_grammar_data.json"
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for chapter in data["chapters"]:
    if "passages" in chapter:
        chapter["sections"] = chapter.pop("passages")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Renamed passages to sections successfully!")
