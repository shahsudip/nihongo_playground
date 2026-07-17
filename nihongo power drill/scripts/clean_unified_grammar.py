import json
import re

file_path = r"D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_data.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for chapter in data.get("chapters", []):
    if chapter.get("id", "").startswith("grammar-"):
        # If it has passages, rename it to sections first
        if "passages" in chapter:
            chapter["sections"] = chapter.pop("passages")
        
        # Now clean up the sections
        for section in chapter.get("sections", []):
            # 1. Fix the ID (e.g. from "grammar-1-mondai1" to "mondai-1")
            old_id = section.get("id", "")
            match = re.search(r"mondai(\d+)", old_id)
            if match:
                section["id"] = f"mondai-{match.group(1)}"
            
            # 2. Remove the title field
            if "title" in section:
                del section["title"]
            
            # Reorder keys to make it look clean like the user's snippet
            new_section = {}
            if "id" in section: new_section["id"] = section["id"]
            if "mondaiHeader" in section: new_section["mondaiHeader"] = section["mondaiHeader"]
            if "passageText" in section: new_section["passageText"] = section["passageText"]
            if "passageLayout" in section: new_section["passageLayout"] = section["passageLayout"]
            if "questions" in section: new_section["questions"] = section["questions"]
            
            # Copy over any other unexpected keys just in case
            for k, v in section.items():
                if k not in new_section:
                    new_section[k] = v
                    
            # Replace the section with the cleaned up one
            section.clear()
            section.update(new_section)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Unified database cleaned! Renamed passages to sections for all grammar chapters.")
