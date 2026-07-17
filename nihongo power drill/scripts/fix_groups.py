import json
import os

file_path = "D:/sudip_software/nihongo_playground/nihongo power drill/power_drill_grammar_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for chapter in data["chapters"]:
    if chapter["id"] in ["grammar-10", "grammar-training-3", "grammar-training-4"]:
        chapter["group"] = "Group 2"
    elif chapter["id"] in ["grammar-training-2", "grammar-training-1"]:
        chapter["group"] = "Group 1"
    elif chapter["id"].startswith("grammar-") and not chapter["id"].startswith("grammar-training-"):
        # Put 1-15 in Group 1 except 10
        try:
            num = int(chapter["id"].split("-")[1])
            if num <= 15 and num != 10:
                chapter["group"] = "Group 1"
            elif num > 15:
                chapter["group"] = "Group 2"
        except Exception:
            pass

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Groups updated for all drills 1-15 and T1-T4.")
