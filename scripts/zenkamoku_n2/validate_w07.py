import json
import glob
import os

files = sorted(glob.glob("src/data/zenkamoku_n2/w07-d*.json"))
assert len(files) == 5, f"Expected 5 files, got {len(files)}"

for f in files:
    with open(f, "r", encoding="utf-8") as fp:
        data = json.load(fp)
    
    assert data["bookId"] == "zenkamoku-n2-best-workbook"
    assert data["week"] == 7
    assert len(data["sections"]) == 2, f"{f} does not have 2 sections"
    
    sec1 = data["sections"][0]
    assert sec1["type"] == "integrated"
    assert "imageSrc" not in sec1, f"{f} sec1 has imageSrc"
    assert "passage" in sec1, f"{f} sec1 missing passage"
    assert sec1["passage"].startswith('<div class="speed-master-lined-paper'), f"{f} sec1 wrong passage class"
    assert len(sec1["questions"]) == 2, f"{f} sec1 should have 2 questions"
    
    sec2 = data["sections"][1]
    assert sec2["type"] == "long_passage"
    assert "imageSrc" not in sec2, f"{f} sec2 has imageSrc"
    assert "passage" in sec2, f"{f} sec2 missing passage"
    assert sec2["passage"].startswith('<div class="speed-master-lined-paper'), f"{f} sec2 wrong passage class"
    assert len(sec2["questions"]) == 3, f"{f} sec2 should have 3 questions"

    for s_idx, sec in enumerate(data["sections"]):
        for q in sec["questions"]:
            assert "imageSrc" not in q, f"{f} question has imageSrc"
            assert len(q["options"]) == 4, f"{f} question options count not 4"
            assert q["correct"] in [1, 2, 3, 4]
            assert q["correctOption"].startswith(str(q["correct"]))
            assert "explanation" in q
            assert len(q["explanation"]) > 0

    print(f"PASSED: {os.path.basename(f)} (Sections: 2, Total Questions: 5)")

print("All Week 7 JSON files successfully validated!")
