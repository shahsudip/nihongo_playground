import json

file_path = r"D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_grammar_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for chapter in data.get("chapters", []):
    new_questions = []
    new_passages = []
    
    # We only process if it has passages
    if "passages" in chapter:
        for p in chapter["passages"]:
            p_id = p.get("id", "").lower()
            title = p.get("title", "")
            
            # Identify if it is truly a passage (like Mondai 3 or Mondai 4)
            is_passage = False
            if "passageText" in p:
                is_passage = True
            elif "mondai3" in p_id or "問題3" in title:
                is_passage = True
            elif "mondai4" in p_id or "問題4" in title:
                is_passage = True
            elif "mondai5" in p_id or "問題5" in title:
                is_passage = True
            elif "training" in p_id and ("3" in title or "4" in title or "5" in title):
                 # just a fallback, but training might have different structure
                 pass
                 
            # In grammar drills, Mondai 1 and 2 are always multiple choice, not passages
            if "mondai1" in p_id or "問題1" in title or "mondai2" in p_id or "問題2" in title:
                is_passage = False

            if is_passage:
                new_passages.append(p)
            else:
                # It's Mondai 1 or 2, so we extract questions
                header = p.get("mondaiHeader", "")
                
                for q in p.get("questions", []):
                    if title:
                        q["title"] = title
                    if header:
                        q["mondaiHeader"] = header
                    new_questions.append(q)
                    
        # Update chapter
        if new_questions:
            # If chapter already had questions, append to them
            existing_q = chapter.get("questions", [])
            chapter["questions"] = existing_q + new_questions
            
        if new_passages:
            chapter["passages"] = new_passages
        else:
            del chapter["passages"]

output_path = file_path
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Database structure successfully updated! Overwrote power_drill_grammar_data.json safely.")
