r"""
Besto Tango N2 合格2400 — Page Extractor
Reads all JPG pages via Gemini Vision and outputs JSON story files
identical in format to tango_n1_raw/*.json

Output: D:\sudip_software\nihongo_playground\src\data\tango_n2_raw\{page}_{story}.json
"""

import os
import sys
import json
import time
import base64
import re
import requests
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

# ── Config ─────────────────────────────────────────────────────────────────
GEMINI_API_KEY  = os.environ.get("GEMINI_API_KEY", "")
GEMINI_URL      = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

# Find the N2 image directory dynamically
def find_n2_dir():
    base = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi"
    for d in os.listdir(base):
        full = os.path.join(base, d)
        if os.path.isdir(full) and not d.isascii():  # Japanese-named folder
            for sub in os.listdir(full):
                if "N2" in sub:
                    return os.path.join(full, sub)
    raise FileNotFoundError("N2 image directory not found")

IMG_DIR  = find_n2_dir()
OUT_DIR  = r"D:\sudip_software\nihongo_playground\src\data\tango_n2_raw"
os.makedirs(OUT_DIR, exist_ok=True)

print(f"📚 N2 source: {IMG_DIR}")
print(f"📁 Output:   {OUT_DIR}\n")

# ── Prompt ─────────────────────────────────────────────────────────────────
PROMPT = """You are processing a page from the Japanese textbook "Best Tango N2 合格2400".
Each page contains one or two separate story/passage blocks inside a distinct framed box.

For EACH story block on the page:
1. Extract the EXACT Japanese conversation/passage inside the story box. Do NOT hallucinate extra lines, do NOT combine text from other sections, and do NOT add words not present in the original box image.
2. Wrap each underlined word in the story with <u>...</u> tags. The underlined words MUST match the exact text within the story block.
3. Extract ONLY the English translation corresponding to THIS story block from the translation section below. Stop before any Chinese or Vietnamese characters.
4. Extract ONLY the vocabulary words listed in the numbered list directly under THIS specific story block.

Return a JSON array of objects:
[
  {
    "page_story": "16_1",
    "story_number": 1,
    "topic_title": "Topic 1 食事",
    "japanese_text": "A：あそこのラーメン屋、どうだった？\\nB：うーん。<u>あっさり</u>してて...",
    "english_translation": "ONLY English translation for this story",
    "words": [
      {"id": "12", "kanji": "あっさり", "furigana": "あっさり", "meaning_en": "lightly, plainly"},
      {"id": "13", "kanji": "物足りない", "furigana": "ものたりない", "meaning_en": "lacking"}
    ]
  }
]

CRITICAL STRICT RULES:
- Extracted japanese_text MUST be exact, word-for-word string from the image passage box.
- Do NOT merge story 1 and story 2 together.
- Include exact Kanji, Furigana, and English meanings for words listed under the story block.
- Return ONLY a valid JSON array, no markdown wrappers, no commentary.
"""

# ── Gemini call ─────────────────────────────────────────────────────────────
def call_gemini(img_path: str) -> str:
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    payload = {
        "contents": [{"parts": [
            {"text": PROMPT},
            {"inline_data": {"mime_type": "image/jpeg", "data": b64}}
        ]}],
        "generationConfig": {"temperature": 0.0, "response_mime_type": "application/json"}
    }

    for attempt in range(5):
        r = requests.post(GEMINI_URL, headers={"Content-Type": "application/json"}, json=payload, timeout=60)
        if r.status_code == 200:
            return r.json()["candidates"][0]["content"]["parts"][0]["text"]
        elif r.status_code == 429:
            wait = 30 * (attempt + 1)
            print(f"  ⏳ Rate limited. Waiting {wait}s...")
            time.sleep(wait)
        else:
            print(f"  ❌ Error {r.status_code}: {r.text[:200]}")
            time.sleep(5)
    return "[]"

# ── Parse & save ─────────────────────────────────────────────────────────────
def process_page(page_num: int) -> bool:
    img_path = os.path.join(IMG_DIR, f"{page_num}.jpg")
    if not os.path.exists(img_path):
        return False

    # Skip if all output files for this page already exist
    existing = list(Path(OUT_DIR).glob(f"{page_num}_*.json"))
    if existing:
        print(f"  ⏭️  Page {page_num}: already done ({len(existing)} files)")
        return True

    print(f"  📄 Processing page {page_num}...")
    raw = call_gemini(img_path)

    try:
        stories = json.loads(raw)
        if not isinstance(stories, list):
            stories = [stories]
    except json.JSONDecodeError as e:
        print(f"  ⚠️  JSON parse error on page {page_num}: {e}")
        print(f"  Raw: {raw[:300]}")
        # Save raw for manual inspection
        with open(os.path.join(OUT_DIR, f"_error_{page_num}.txt"), "w", encoding="utf-8") as f:
            f.write(raw)
        return False

    saved = 0
    for story in stories:
        try:
            page_story = story.get("page_story", f"{page_num}_1")
            out = {
                "is_story": True,
                "story_number": story.get("story_number", 1),
                "title": story.get("topic_title", ""),
                "japanese_text": story.get("japanese_text", ""),
                "english_translation": story.get("english_translation", ""),
                "annotated_words": [
                    {
                        "word_id":     f"n2_{str(w.get('id','')).zfill(4)}",
                        "word_number": int(str(w.get("id", 0)).replace(",", "")),
                        "kanji":       w.get("kanji", ""),
                        "furigana":    w.get("furigana", ""),
                        "meaning_en":  w.get("meaning_en", "")
                    }
                    for w in story.get("words", [])
                ]
            }
            fname = f"{page_story}.json"
            with open(os.path.join(OUT_DIR, fname), "w", encoding="utf-8") as f:
                json.dump(out, f, ensure_ascii=False, indent=2)
            saved += 1
        except Exception as e:
            print(f"  ⚠️  Error saving story on page {page_num}: {e}")

    print(f"  ✅ Page {page_num}: saved {saved} story file(s)")
    return saved > 0

# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    # Process Topic 1 range strictly (pages 16 to 27)
    pages = sorted([
        int(Path(f).stem)
        for f in os.listdir(IMG_DIR)
        if f.endswith(".jpg") and Path(f).stem.isdigit() and (16 <= int(Path(f).stem) <= 27)
    ])

    print(f"📖 Processing Topic 1 (食事): {len(pages)} pages (pp. 16–27)\n")

    success = 0
    failed = []

    for i, page_num in enumerate(pages):
        result = process_page(page_num)
        if result:
            success += 1
        else:
            failed.append(page_num)

        # Small delay to avoid rate limits
        if i % 10 == 9:
            print(f"\n  ── Checkpoint: {i+1}/{len(pages)} pages done ──\n")
            time.sleep(2)

    print(f"\n{'='*50}")
    print(f"✅ Done! {success}/{len(pages)} pages extracted")
    if failed:
        print(f"❌ Failed pages: {failed}")

if __name__ == "__main__":
    main()
