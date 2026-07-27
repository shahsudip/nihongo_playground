"""
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
GEMINI_URL      = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:key={GEMINI_API_KEY}"

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
Each page contains one or two story/passage blocks. Each block has:
- A Japanese story/conversation with certain words UNDERLINED (marked with a red underline)
- A numbered word list below with: word number, kanji form, furigana, and English meaning
- At the bottom: a translation block that may contain English, then Chinese, then Vietnamese

Extract EVERY story block on this page and return a JSON array like this:

[
  {
    "page_story": "16_1",
    "story_number": 1,
    "topic_title": "Topic 1",
    "japanese_text": "story text with <u>underlined words</u> marked",
    "english_translation": "ONLY the English translation here",
    "words": [
      {"id": "1", "kanji": "創作[する]", "furigana": "そうさく", "meaning_en": "creative, create"},
      {"id": "2", "kanji": "食物", "furigana": "しょくもつ", "meaning_en": "food"}
    ]
  }
]

Rules:
- page_story format: "{page_number}_{story_index}" e.g. "16_1", "17_2"
- In japanese_text: wrap each underlined/highlighted word with <u>...</u> tags
- CRITICAL for english_translation: extract ONLY the English text. The translation block
  at the bottom shows 3 languages: English first, then Chinese (中文), then Vietnamese.
  Stop at the first Chinese character or "/" separator. Do NOT include Chinese or Vietnamese.
- word "id" = the sequential number printed in the word list (e.g. 1, 2, 3...)
- Include ALL words listed in the numbered box below each story
- If there is a Topic header (e.g. "Topic 1 食事"), capture it as topic_title
- If page has no topic header, use the last seen topic (from sidebar/corner e.g. "Topic 6 ● 流行")
- Include suffix notation in kanji field e.g. "勝負[する]", "～み", "～人前"
- Return ONLY valid JSON array, no markdown fences, no explanation
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
    # Get all available page numbers
    pages = sorted([
        int(Path(f).stem)
        for f in os.listdir(IMG_DIR)
        if f.endswith(".jpg") and Path(f).stem.isdigit()
    ])

    print(f"📖 Total pages to process: {len(pages)} (pp. {pages[0]}–{pages[-1]})\n")

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
