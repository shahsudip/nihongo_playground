r"""
Besto Tango N2 合格2400 — Topic 3 (買い物 - Shopping) Page Extractor
Reads pages 43–57 via Gemini Vision and outputs JSON story files
in the same format as the existing tango_n2_raw/*.json files.

Topic 3: 買い物 (Shopping) — word numbers #190 onwards
Output: D:\sudip_software\nihongo_playground\src\data\tango_n2_raw\{page}_{story}.json
"""

import os
import sys
import json
import time
import base64
import requests
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

# ── Config ─────────────────────────────────────────────────────────────────
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AQ.Ab8RN6JW3j_WeBbJvYWrWtQYACZs7lP95A4DtglIXhhR6qAfYQ")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

# ── Paths ──────────────────────────────────────────────────────────────────
def find_n2_dir():
    """Dynamically find the N2 image directory."""
    base = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi"
    for item in os.listdir(base):
        # Find the ベスト単語 folder
        if '\u5358\u8a9e' in item:  # 単語
            best_folder = os.path.join(base, item)
            for sub in os.listdir(best_folder):
                if 'N2' in sub and '2400' in sub and not sub.endswith('.pdf') and not sub.endswith('.zip'):
                    return os.path.join(best_folder, sub)
    raise FileNotFoundError("Could not find N2 image directory under ベスト単語")

IMG_DIR = find_n2_dir()
OUT_DIR = r"D:\sudip_software\nihongo_playground\src\data\tango_n2_raw"
os.makedirs(OUT_DIR, exist_ok=True)

print(f"📚 N2 source: {IMG_DIR}")
print(f"📁 Output:   {OUT_DIR}\n")

# ── Prompt ─────────────────────────────────────────────────────────────────
PROMPT = """You are processing a page from the Japanese textbook "Best Tango N2 合格2400".
This is Topic 3: 買い物 (Shopping).

Each page contains one or two separate story/passage blocks inside a distinct framed box.

For EACH story block on the page:
1. Extract the EXACT Japanese conversation/passage inside the story box. Do NOT hallucinate extra lines, do NOT combine text from other sections, and do NOT add words not present in the original box image.
2. Wrap each underlined word in the story with <u>...</u> tags. The underlined words MUST match the exact text within the story block.
3. Extract ONLY the English translation corresponding to THIS story block from the translation section below. Stop before any Chinese or Vietnamese characters.
4. Extract ONLY the vocabulary words listed in the numbered list directly under THIS specific story block. Include their exact word numbers (IDs) as they appear in the book.

Return a JSON array of objects:
[
  {
    "page_story": "43_1",
    "story_number": 1,
    "topic_title": "Topic 3 買い物",
    "japanese_text": "A：...",
    "english_translation": "ONLY English translation for this story",
    "words": [
      {"id": "190", "kanji": "word_kanji", "furigana": "reading", "meaning_en": "English meaning"},
      {"id": "191", "kanji": "another_word", "furigana": "reading", "meaning_en": "English meaning"}
    ]
  }
]

CRITICAL STRICT RULES:
- Extracted japanese_text MUST be exact, word-for-word string from the image passage box.
- Do NOT merge story 1 and story 2 together.
- Include exact Kanji, Furigana, and English meanings for words listed under the story block.
- The word "id" field must be the exact number printed next to the word in the book (e.g. 190, 191, 192...).
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
        r = requests.post(GEMINI_URL, headers={"Content-Type": "application/json"}, json=payload, timeout=120)
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
        print(f"  ⚠️  Page {page_num}: image not found at {img_path}")
        return False

    # Skip if all output files for this page already exist
    existing = list(Path(OUT_DIR).glob(f"{page_num}_*.json"))
    if existing:
        print(f"  ⏭️  Page {page_num}: already done ({len(existing)} file(s)): {[e.name for e in existing]}")
        return True

    print(f"  📄 Processing page {page_num}...")
    raw = call_gemini(img_path)

    try:
        stories = json.loads(raw)
        if not isinstance(stories, list):
            stories = [stories]
    except json.JSONDecodeError as e:
        print(f"  ⚠️  JSON parse error on page {page_num}: {e}")
        print(f"  Raw: {raw[:500]}")
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
                "title": story.get("topic_title", "Topic 3 買い物"),
                "page_story": page_story,
                "japanese_text": story.get("japanese_text", ""),
                "english_translation": story.get("english_translation", ""),
                "annotated_words": [
                    {
                        "word_id":     f"n2_{str(w.get('id', '')).replace(',', '').zfill(4)}",
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
            print(f"  ✅ Saved {fname} (story #{out['story_number']}, {len(out['annotated_words'])} words)")
            saved += 1
        except Exception as e:
            print(f"  ⚠️  Error saving story on page {page_num}: {e}")

    return saved > 0


# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    # Topic 2 was pages 28–42. Topic 3 (買い物) should follow from page 43.
    # We'll scan pages 43–60 and stop when we hit a non-Topic-3 page.
    # Adjust END_PAGE if needed based on book structure.
    START_PAGE = 43
    END_PAGE = 60  # Adjust as needed; we'll stop early if topic changes

    # Find which pages exist in the image directory
    all_pages = sorted([
        int(f[:-4]) for f in os.listdir(IMG_DIR)
        if f.endswith(".jpg") and f[:-4].isdigit() and START_PAGE <= int(f[:-4]) <= END_PAGE
    ])

    print(f"📖 Processing Topic 3 買い物 (Shopping): pages {START_PAGE}–{END_PAGE}")
    print(f"   Found {len(all_pages)} page images: {all_pages}\n")

    if not GEMINI_API_KEY:
        print("❌ ERROR: GEMINI_API_KEY environment variable not set!")
        print("   Set it with: $env:GEMINI_API_KEY = 'your-key-here'")
        return

    success = 0
    failed = []

    for i, page_num in enumerate(all_pages):
        result = process_page(page_num)
        if result:
            success += 1
        else:
            failed.append(page_num)

        # Small delay between pages to avoid rate limits
        if i < len(all_pages) - 1:
            time.sleep(2)

        # Checkpoint every 10 pages
        if i % 10 == 9:
            print(f"\n  ── Checkpoint: {i+1}/{len(all_pages)} pages done ──\n")
            time.sleep(3)

    print(f"\n{'='*50}")
    print(f"✅ Done! {success}/{len(all_pages)} pages extracted successfully")
    if failed:
        print(f"❌ Failed pages: {failed}")
    print(f"\nOutput files in: {OUT_DIR}")


if __name__ == "__main__":
    main()
