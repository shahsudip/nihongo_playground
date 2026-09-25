import json
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def inspect_weeks(weeks=[6, 7, 8, 9, 10, 11, 12]):
    for w in weeks:
        print(f"\n==========================================")
        print(f"       INSPECTING ZENKAMOKU N2 WEEK {w}")
        print(f"==========================================")
        files = sorted(glob.glob(f"src/data/zenkamoku_n2/w{w:02d}-*.json"))
        for fn in files:
            with open(fn, "r", encoding="utf-8") as f:
                data = json.load(f)
            sections = data.get("sections", [])
            print(f"\n--- {fn} (Week {data.get('week')}, Day {data.get('day')}) ---")
            print(f"Section title: {data.get('sectionTitle')} | {data.get('sectionTitleEn')}")
            print(f"Number of sections: {len(sections)}")
            
            for s_idx, sec in enumerate(sections):
                q_count = len(sec.get("questions", []))
                print(f"  Sec {s_idx+1}: {sec.get('title')} | type={sec.get('type')} | questions={q_count}")
                
                # Check passage container
                passage = sec.get("passage", "")
                if passage:
                    has_lined = "speed-master-lined-paper" in passage
                    has_bg_white = "bg-white" in passage
                    has_red = "text-red" in passage or "color:red" in passage or "style=\"color: red\"" in passage
                    has_ruby = "<ruby>" in passage
                    print(f"    Passage: len={len(passage)} | lined={has_lined} | bg-white={has_bg_white} | red={has_red} | has_ruby={has_ruby}")
                    if has_bg_white:
                        print("      [WARNING] Found bg-white in passage!")
                    if has_red:
                        print("      [WARNING] Found red text in passage!")
                
                # Check listening attributes if any
                audio = sec.get("audioTrack") or sec.get("audio")
                if audio:
                    print(f"    Audio: {audio}")
                    
                for q in sec.get("questions", []):
                    # Check stem / options
                    stem = q.get("stem", "")
                    correct = q.get("correct")
                    opts = q.get("options", [])
                    correct_opt = q.get("correctOption", "")
                    
                    # Verify correctOption matches options[correct-1]
                    if 1 <= correct <= len(opts):
                        if opts[correct - 1] != correct_opt:
                            print(f"      [ERROR] Q{q.get('number')}: correctOption mismatch!")
                    else:
                        print(f"      [ERROR] Q{q.get('number')}: invalid correct index {correct}")

if __name__ == "__main__":
    inspect_weeks()
