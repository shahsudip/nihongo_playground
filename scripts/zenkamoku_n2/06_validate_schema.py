"""
06_validate_schema.py
Zero-defect offline validator for zenkamoku_n2 Dokkai JSON data (Weeks 5-8).
Checks:
- Every question has exactly 4 options
- correct is int 1..4, correctOption matches options[correct-1]
- All imageSrc files exist in public/
- All question stems are non-empty
- All 20 files exist and match answer_keys_raw.json
"""
import sys
import os
import json
import re
import glob

sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = r"D:\sudip_software\nihongo_playground"
DATA_DIR = os.path.join(PROJECT_ROOT, 'src', 'data', 'zenkamoku_n2')
PUBLIC_DIR = os.path.join(PROJECT_ROOT, 'public')
KEY_FILE = os.path.join(PROJECT_ROOT, 'scripts', 'zenkamoku_n2', 'answer_keys_raw.json')

with open(KEY_FILE, 'r', encoding='utf-8') as f:
    ANSWER_KEYS = json.load(f)

errors = []
warnings = []
stats = {
    "files": 0,
    "questions": 0,
    "options": 0,
    "images_checked": 0
}

def check_file_exists(src_path, context):
    if not src_path:
        errors.append(f"{context}: Missing imageSrc field!")
        return
    stats["images_checked"] += 1
    clean = src_path.lstrip('/')
    full = os.path.join(PUBLIC_DIR, clean)
    if not os.path.exists(full):
        errors.append(f"{context}: Referenced image file not found on disk: {src_path} (full path: {full})")

# Expected files
expected_files = []
for w in range(5, 9):
    for d in range(1, 6):
        expected_files.append(f"w{w:02d}-d{d:02d}.json")

for fname in expected_files:
    fpath = os.path.join(DATA_DIR, fname)
    if not os.path.exists(fpath):
        errors.append(f"Missing chapter file: {fname}")
        continue
    
    stats["files"] += 1
    with open(fpath, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except Exception as e:
            errors.append(f"{fname}: JSON parse error: {e}")
            continue

    # Check bookId
    if data.get("bookId") != "zenkamoku-n2-best-workbook":
        errors.append(f"{fname}: Incorrect bookId '{data.get('bookId')}', expected 'zenkamoku-n2-best-workbook'")

    chap_id = data.get("chapterId", fname.replace(".json", ""))
    w_key = chap_id.split("-")[0]
    d_key = chap_id.split("-")[1]

    sections = data.get("sections", [])
    if not sections:
        errors.append(f"{fname}: No sections found!")
        continue

    flat_qs = []
    for sec_idx, sec in enumerate(sections, 1):
        sec_ctx = f"{fname} Sec {sec_idx}"
        # Check section imageSrc
        check_file_exists(sec.get("imageSrc"), sec_ctx)
        
        for q in sec.get("questions", []):
            flat_qs.append(q)

    # Check question count against answer key
    master_day_keys = ANSWER_KEYS[w_key][d_key]
    if len(flat_qs) != len(master_day_keys):
        errors.append(f"{fname}: Question count mismatch! Extracted {len(flat_qs)}, expected {len(master_day_keys)}")

    for i, q in enumerate(flat_qs):
        q_num = q.get("number", i + 1)
        ctx = f"{fname} Q{q_num}"
        stats["questions"] += 1
        
        # Stem
        stem = q.get("stem", "").strip()
        if not stem:
            errors.append(f"{ctx}: Empty stem!")

        # Question imageSrc
        check_file_exists(q.get("imageSrc"), ctx)

        # Options
        opts = q.get("options", [])
        stats["options"] += len(opts)
        if len(opts) != 4:
            errors.append(f"{ctx}: Expected 4 options, got {len(opts)}")

        # Answer key check
        master_ans = master_day_keys.get(f"q{q_num}")
        corr = q.get("correct")
        if corr != master_ans:
            errors.append(f"{ctx}: Answer mismatch! Got {corr}, master answer is {master_ans}")

        # Correct option check
        corr_opt = q.get("correctOption", "")
        if opts and corr:
            expected_opt_str = opts[corr - 1]
            if corr_opt != expected_opt_str:
                errors.append(f"{ctx}: correctOption mismatch!\n  opts[{corr-1}]={expected_opt_str!r}\n  correctOption={corr_opt!r}")

        # Explanation
        exp = q.get("explanation", "").strip()
        if not exp:
            errors.append(f"{ctx}: Empty explanation!")

print(f"\n================ VALIDATION REPORT ================")
print(f"Chapters validated: {stats['files']} / 20")
print(f"Questions validated: {stats['questions']} / 105")
print(f"Options validated: {stats['options']} / 420")
print(f"Images verified: {stats['images_checked']}")

if errors:
    print(f"\n❌ FOUND {len(errors)} ERRORS:")
    for e in errors:
        print(f"  • {e}")
    sys.exit(1)
else:
    print("\n✅ ZERO-DEFECT VALIDATION PASSED! 100% Schema & Data Fidelity!")
