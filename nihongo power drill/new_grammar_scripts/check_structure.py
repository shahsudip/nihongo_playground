import json
import re

with open(r"D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_grammar_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

perfect_chapters = []
broken_chapters = []

for chapter in data["chapters"]:
    if "training" in chapter["id"]:
        continue
        
    is_perfect = True
    issues = []
    
    m1_found = False
    m2_found = False
    m3_found = False
    
    for passage in chapter.get("passages", []):
        title = passage.get("title", "")
        pid = passage.get("id", "")
        
        # Check Mondai 1
        if "mondai1" in pid or "問題1" in title:
            m1_found = True
            if "mondaiHeader" not in passage:
                is_perfect = False
                issues.append("Mondai 1 missing mondaiHeader")
                
        # Check Mondai 2
        elif "mondai2" in pid or "問題2" in title:
            m2_found = True
            if "mondaiHeader" not in passage:
                is_perfect = False
                issues.append("Mondai 2 missing mondaiHeader")
            has_star = any("★" in q.get("questionText", "") for q in passage.get("questions", []))
            if not has_star:
                is_perfect = False
                issues.append("Mondai 2 missing ★ in questions")
                
        # Check Mondai 3
        elif "mondai3" in pid or "問題3" in title:
            m3_found = True
            if "mondaiHeader" not in passage:
                is_perfect = False
                issues.append("Mondai 3 missing mondaiHeader")
            if passage.get("passageLayout") != "html":
                is_perfect = False
                issues.append("Mondai 3 missing or wrong passageLayout")
            if "title" not in passage:
                is_perfect = False
                issues.append("Mondai 3 missing title field")
            if "passageText" not in passage:
                is_perfect = False
                issues.append("Mondai 3 missing passageText")
                
    if not m1_found:
        is_perfect = False
        issues.append("Missing Mondai 1")
    if not m2_found:
        is_perfect = False
        issues.append("Missing Mondai 2")
    if not m3_found:
        is_perfect = False
        issues.append("Missing Mondai 3")
        
    if is_perfect:
        perfect_chapters.append(chapter["id"])
    else:
        broken_chapters.append((chapter["id"], issues))

print(f"Perfect Chapters: {len(perfect_chapters)}")
for ch in perfect_chapters:
    print(f" - {ch}")
    
print(f"\nBroken Chapters: {len(broken_chapters)}")
for ch, iss in broken_chapters:
    print(f" - {ch}: {', '.join(iss)}")
