import json
import glob
import os
import re

expected_answers = {
    1: [2, 4],
    2: [3, 3],
    3: [1, 2],
    4: [2, 2],
    5: [4, 3],
    6: [2, 1],
    7: [2, 4],
    8: [2, 3]
}

data_dir = "src/data/speed_master_n3_reading"
all_valid = True

for i in range(1, 9):
    file_path = os.path.join(data_dir, f"search-{i}.json")
    if not os.path.exists(file_path):
        print(f"FAIL: {file_path} does not exist!")
        all_valid = False
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except Exception as e:
            print(f"FAIL: {file_path} JSON parse error: {e}")
            all_valid = False
            continue
    
    # Check fields
    required_keys = ["id", "chapterId", "bookId", "part", "partTitle", "partTitleEn", 
                     "section", "sectionEn", "mondaiNumber", "targetMinutes", "title", 
                     "instruction", "imageSrc", "passageLayout", "passageText", 
                     "footnotes", "vocabulary", "questions"]
    for k in required_keys:
        if k not in data:
            print(f"FAIL: {file_path} missing key {k}")
            all_valid = False
            
    # Check answers
    qs = data.get("questions", [])
    if len(qs) != 2:
        print(f"FAIL: {file_path} question count is {len(qs)}, expected 2")
        all_valid = False
    
    actual_ans = []
    for q_idx, q in enumerate(qs):
        correct = q.get("correct")
        actual_ans.append(correct)
        options = q.get("options", [])
        if len(options) != 4:
            print(f"FAIL: {file_path} Q{q_idx+1} options count is {len(options)}, expected 4")
            all_valid = False
        correctOption = q.get("correctOption")
        if correct < 1 or correct > 4:
            print(f"FAIL: {file_path} Q{q_idx+1} correct out of bounds: {correct}")
            all_valid = False
        elif options[correct - 1] != correctOption:
            print(f"FAIL: {file_path} Q{q_idx+1} correctOption mismatch:\n  opt: {options[correct-1]}\n  exp: {correctOption}")
            all_valid = False
            
        if not q.get("explanation"):
            print(f"FAIL: {file_path} Q{q_idx+1} missing explanation")
            all_valid = False
            
    if actual_ans != expected_answers[i]:
        print(f"FAIL: {file_path} answers {actual_ans} != expected {expected_answers[i]}")
        all_valid = False
    else:
        print(f"PASS: {file_path} (Answers: {actual_ans})")

if all_valid:
    print("\nALL 8 FILES PASSED VALIDATION PERFECTLY!")
else:
    print("\nVALIDATION FAILED!")
