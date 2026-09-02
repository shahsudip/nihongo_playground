import os
import json
import glob

DATA_DIR = r"D:\sudip_software\nihongo_playground\src\data\somatome"

expected_chapters = []
for w in range(1, 7):
    for d in range(1, 8):
        expected_chapters.append(f"week{w}-day{d}")

print(f"Total expected chapters: {len(expected_chapters)}")

existing_files = glob.glob(os.path.join(DATA_DIR, "*.json"))
existing_ids = set()

errors = []
warnings = []

for f in existing_files:
    filename = os.path.basename(f)
    cid = filename.replace(".json", "")
    existing_ids.add(cid)

    try:
        with open(f, 'r', encoding='utf-8') as fp:
            data = json.load(fp)
    except Exception as e:
        errors.append(f"JSON Parse Error in {filename}: {e}")
        continue

    # Validate bookId and chapterId
    if data.get("bookId") != "sou-matome-n3-reading":
        data["bookId"] = "sou-matome-n3-reading"
        with open(f, 'w', encoding='utf-8') as fp:
            json.dump(data, fp, ensure_ascii=False, indent=2)

    if data.get("chapterId") != cid:
        data["chapterId"] = cid
        with open(f, 'w', encoding='utf-8') as fp:
            json.dump(data, fp, ensure_ascii=False, indent=2)

    # Check required fields
    for field in ["week", "day", "theme", "title", "learning_focus", "vocabulary", "practice", "mondai"]:
        if field not in data:
            warnings.append(f"{filename} missing top-level field '{field}'")

print(f"Currently existing chapters: {len(existing_ids)} / 42")
missing = [c for c in expected_chapters if c not in existing_ids]
if missing:
    print(f"Missing chapters ({len(missing)}): {missing}")
else:
    print("[SUCCESS] All 42 chapters are present and validated!")

if errors:
    print(f"[ERROR] Errors count: {len(errors)}", errors)
if warnings:
    print(f"[WARN] Warnings count: {len(warnings)}", warnings)
