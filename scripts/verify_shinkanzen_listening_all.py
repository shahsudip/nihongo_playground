import json
import os
import glob
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

DATA_DIR = "src/data/shinkanzen_listening"
PUBLIC_DIR = "public"

def verify_all_listening():
    errors = []
    warnings = []
    
    files = sorted(glob.glob(os.path.join(DATA_DIR, "*.json")))
    print(f"Found {len(files)} JSON files in {DATA_DIR}")
    
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
        required_fields = ["bookId", "chapterId", "part", "partTitle", "title", "hotspots", "questions", "transcript"]
        for field in required_fields:
            if field not in data:
                errors.append(f"{filename}: Missing required field '{field}'")
                
        if data.get("bookId") != "shinkanzen-master-n3-listening":
            errors.append(f"{filename}: Invalid bookId '{data.get('bookId')}'")
            
        # 2. Image Check
        for img_field in ["imageSrc", "illustrationSrc"]:
            src = data.get(img_field, "")
            if src:
                rel_path = src.lstrip("/")
                full_path = os.path.join(PUBLIC_DIR, rel_path)
                if not os.path.exists(full_path):
                    errors.append(f"{filename}: {img_field} file not found on disk: {full_path}")
                else:
                    print(f"  [OK] {img_field} verified: {src}")
                    
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
                    pass
        print(f"  [OK] Verified {len(hotspots)} audio hotspots")
                    
        # 4. Questions Check
        questions = data.get("questions", [])
        if not questions:
            errors.append(f"{filename}: No questions defined")
        for q_idx, q in enumerate(questions):
            q_text = q.get("questionText", "")
            if not q_text and not q.get("instruction"):
                errors.append(f"{filename}: Question {q_idx+1} has empty questionText and instruction")
                
            q_img = q.get("illustrationSrc", "")
            if q_img:
                rel_path = q_img.lstrip("/")
                full_path = os.path.join(PUBLIC_DIR, rel_path)
                if not os.path.exists(full_path):
                    errors.append(f"{filename}: Question {q_idx+1} illustrationSrc not found: {full_path}")
                    
            options = q.get("options", [])
            if len(options) < 2:
                errors.append(f"{filename}: Question {q_idx+1} has fewer than 2 options ({len(options)})")
            
            corr = q.get("correctOption", {})
            corr_idx = corr.get("index")
            corr_text = corr.get("text")
            if corr_idx is None or corr_idx < 0 or corr_idx >= len(options):
                errors.append(f"{filename}: Question {q_idx+1} invalid correctOption index {corr_idx}")
            elif options[corr_idx] != corr_text:
                errors.append(f"{filename}: Question {q_idx+1} mismatch: options[{corr_idx}] ('{options[corr_idx]}') != correctOption.text ('{corr_text}')")
                
            explanation = q.get("explanation", "")
            if not explanation:
                errors.append(f"{filename}: Question {q_idx+1} has empty explanation")
                
            # Ruby tags check
            for opt in options:
                if "<ruby>" in opt:
                    ruby_open = opt.count("<ruby>")
                    ruby_close = opt.count("</ruby>")
                    rt_open = opt.count("<rt>")
                    rt_close = opt.count("</rt>")
                    if ruby_open != ruby_close or rt_open != rt_close:
                        errors.append(f"{filename}: Question {q_idx+1} has unbalanced ruby tag in option: {opt}")
                        
        print(f"  [OK] Verified {len(questions)} questions")
                
        # 5. Transcript Check
        transcript = data.get("transcript", [])
        if not transcript:
            warnings.append(f"{filename}: Empty transcript")
        else:
            for t_idx, line in enumerate(transcript):
                if "text" not in line:
                    errors.append(f"{filename}: Transcript line {t_idx} missing 'text'")
                if not line.get("text", "").strip():
                    errors.append(f"{filename}: Transcript line {t_idx} has empty text")
            print(f"  [OK] Transcript verified: {len(transcript)} lines")
            
    print("\n==========================================")
    if warnings:
        print(f"WARNINGS: {len(warnings)}")
        for w in warnings:
            print(f"  [WARN] {w}")
            
    if errors:
        print(f"FAILED: {len(errors)} errors found:")
        for err in errors:
            print(f"  [ERROR] {err}")
        return False
    else:
        print(f"SUCCESS: 0 errors across {len(files)} listening chapter files!")
        return True

if __name__ == "__main__":
    success = verify_all_listening()
    sys.exit(0 if success else 1)
