import json
import os

db_path = "power_drill_n2_grammar_data.json"
ch1_path = "temp_n2_grammar_1.json"

with open(db_path, "r", encoding="utf-8") as f:
    db = json.load(f)

with open(ch1_path, "r", encoding="utf-8") as f:
    ch1 = json.load(f)

# Ensure no duplicates
db["chapters"] = [ch for ch in db["chapters"] if ch["id"] != ch1["id"]]
db["chapters"].append(ch1)

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print("Chapter 1 inserted successfully into power_drill_n2_grammar_data.json!")
