import json
import re

with open('power_drill_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def get_group(chapter_id):
    if chapter_id.startswith('vocab-review-'):
        num = int(chapter_id.split('-')[-1])
        return f"Group {num}"
    
    match = re.search(r'vocab-(\d+)', chapter_id)
    if match:
        num = int(match.group(1))
        group_num = (num - 1) // 5 + 1
        return f"Group {group_num}"
    return "Group 1"

def get_prefix(chapter_id):
    if chapter_id.startswith('vocab-review-'):
        num = chapter_id.split('-')[-1]
        return f"vr{num}"
    match = re.search(r'vocab-(\d+)', chapter_id)
    if match:
        num = match.group(1)
        return f"v{num}"
    return "vX"

for chapter in data["chapters"]:
    if not chapter["id"].startswith('vocab'):
        continue
        
    chapter_id = chapter["id"]
    prefix = get_prefix(chapter_id)
    
    chapter["group"] = get_group(chapter_id)
    
    if "description" not in chapter:
        title = chapter.get("title", "")
        chapter["description"] = f"{title} practice drills."
        
    for p_idx, passage in enumerate(chapter.get("passages", [])):
        passage_id = f"{chapter_id}-mondai{p_idx+1}"
        passage["id"] = passage_id
        
        # Remove irrelevant passageText
        if "passageText" in passage:
            del passage["passageText"]
            
        if "title" not in passage:
            passage["title"] = f"問題{p_idx+1}"
            
        for q_idx, question in enumerate(passage.get("questions", [])):
            q_id = f"{prefix}-m{p_idx+1}-q{q_idx+1}"
            question["id"] = q_id
            
            # Normalize correctOption to correctIndex
            if "correctOption" in question:
                question["correctIndex"] = question["correctOption"]["index"]
                del question["correctOption"]
                
            if "explanation" not in question:
                question["explanation"] = ""

with open('power_drill_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Vocab schema normalized to match grammar schema.")
