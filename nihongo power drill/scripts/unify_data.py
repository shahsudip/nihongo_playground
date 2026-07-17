import json

def unify_databases():
    # Read grammar data
    with open("D:/sudip_software/nihongo_playground/nihongo power drill/power_drill_grammar_data.json", "r", encoding="utf-8") as f:
        grammar_data = json.load(f)
        
    # Read unified data
    with open("D:/sudip_software/nihongo_playground/nihongo power drill/power_drill_data.json", "r", encoding="utf-8") as f:
        unified_data = json.load(f)
        
    grammar_chapters = grammar_data.get("chapters", [])
    
    # Merge
    for g_chapter in grammar_chapters:
        # Find if it exists in unified
        existing_idx = next((i for i, ch in enumerate(unified_data["chapters"]) if ch["id"] == g_chapter["id"]), -1)
        if existing_idx >= 0:
            unified_data["chapters"][existing_idx] = g_chapter
        else:
            unified_data["chapters"].append(g_chapter)
            
    with open("D:/sudip_software/nihongo_playground/nihongo power drill/power_drill_data.json", "w", encoding="utf-8") as f:
        json.dump(unified_data, f, ensure_ascii=False, indent=2)
        
    print(f"Unified {len(grammar_chapters)} grammar chapters into the main dataset.")

if __name__ == "__main__":
    unify_databases()
