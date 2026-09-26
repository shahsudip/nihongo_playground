import json
import os
import glob
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

DATA_DIR = "src/data/shinkanzen_listening"
PUBLIC_DIR = "public"

def verify_shinkanzen_listening():
    errors = []
    warnings = []
    
    files = sorted(glob.glob(os.path.join(DATA_DIR, "mondai-*.json")))
    print(f"Found {len(files)} JSON files in {DATA_DIR}")
    
    if len(files) != 5:
        errors.append(f"Expected 5 files (mondai-1 to mondai-5), found {len(files)}")
    
    for filepath in files:
        filename = os.path.basename(filepath)
        print(f"\n--- Checking {filename} ---")
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            errors.append(f"{filename}: JSON parse error: {e}")
            continue
            
        # 1. Base fields
        required_fields = ["bookId", "chapterId", "part", "partTitle", "partTitleEn", "mondaiNumber", "title", "mondaiHeader", "passageLayout", "imageSrc", "hotspots", "questions", "transcript"]
        for field in required_fields:
            if field not in data:
                errors.append(f"{filename}: Missing required field '{field}'")
                
        if data.get("bookId") != "shinkanzen-master-n3-listening":
            errors.append(f"{filename}: Invalid bookId '{data.get('bookId')}'")
            
        if data.get("part") != 1:
            errors.append(f"{filename}: Invalid part '{data.get('part')}' (expected 1)")
            
        if not data.get("partTitle") or "第1部" not in data.get("partTitle"):
            errors.append(f"{filename}: Invalid partTitle '{data.get('partTitle')}'")
            
        # 2. Image Check
        image_src = data.get("imageSrc", "")
        if image_src:
            rel_image = image_src.lstrip("/")
            full_img_path = os.path.join(PUBLIC_DIR, rel_image)
            if not os.path.exists(full_img_path):
                errors.append(f"{filename}: imageSrc file not found on disk: {full_img_path}")
            else:
                print(f"  [OK] imageSrc verified: {image_src}")
                
        # 3. Hotspots Check
        hotspots = data.get("hotspots", [])
        if not hotspots:
            errors.append(f"{filename}: No hotspots defined")
        for idx, hs in enumerate(hotspots):
            audio_src = hs.get("audioSrc", "")
            if not audio_src:
                errors.append(f"{filename}: Hotspot {idx} missing audioSrc")
            else:
                rel_audio = audio_src.lstrip("/")
                full_audio_path = os.path.join(PUBLIC_DIR, rel_audio)
                if not os.path.exists(full_audio_path):
                    errors.append(f"{filename}: audioSrc not found on disk: {full_audio_path}")
                else:
                    print(f"  [OK] Hotspot {idx} audioSrc verified: {audio_src}")
                    
        # 4. Questions Check
        questions = data.get("questions", [])
        if not questions:
            errors.append(f"{filename}: No questions defined")
        for q_idx, q in enumerate(questions):
            q_text = q.get("questionText", "")
            if not q_text:
                errors.append(f"{filename}: Question {q_idx+1} has empty questionText")
            options = q.get("options", [])
            expected_opt_count = 3 if data.get("mondaiNumber") in [4, 5] else 4
            if len(options) != expected_opt_count:
                errors.append(f"{filename}: Question {q_idx+1} has {len(options)} options (expected {expected_opt_count})")
            
            corr = q.get("correctOption", {})
            corr_idx = corr.get("index")
            corr_text = corr.get("text")
            if corr_idx is None or corr_idx < 0 or corr_idx >= len(options):
                errors.append(f"{filename}: Question {q_idx+1} invalid correctOption index {corr_idx}")
            elif options[corr_idx] != corr_text:
                errors.append(f"{filename}: Question {q_idx+1} mismatch: options[{corr_idx}] ('{options[corr_idx]}') != correctOption.text ('{corr_text}')")
            else:
                print(f"  [OK] Question {q_idx+1} verified: Correct option [{corr_idx}] -> {corr_text}")
                
            explanation = q.get("explanation", "")
            if not explanation:
                errors.append(f"{filename}: Question {q_idx+1} has empty explanation")
                
        # 5. Transcript Check
        transcript = data.get("transcript", [])
        if not transcript:
            errors.append(f"{filename}: Empty transcript")
        else:
            for t_idx, line in enumerate(transcript):
                if "time" not in line or "text" not in line:
                    errors.append(f"{filename}: Transcript line {t_idx} missing 'time' or 'text'")
                if not line.get("text", "").strip():
                    errors.append(f"{filename}: Transcript line {t_idx} has empty text")
            print(f"  [OK] Transcript verified: {len(transcript)} lines")
            
    print("\n==========================================")
    if errors:
        print(f"FAILED: {len(errors)} errors found:")
        for err in errors:
            print(f"  [ERROR] {err}")
        return False
    else:
        print("SUCCESS: 0 errors! All 5 Mondai files passed all schema and integrity checks.")
        return True

if __name__ == "__main__":
    import sys
    success = verify_shinkanzen_listening()
    sys.exit(0 if success else 1)
