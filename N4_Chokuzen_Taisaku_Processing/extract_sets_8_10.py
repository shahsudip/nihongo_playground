import os
import sys
import json
import base64
import time
import requests

sys.stdout.reconfigure(encoding='utf-8')

GEMINI_API_KEY = "AQ.Ab8RN6JW3j_WeBbJvYWrWtQYACZs7lP95A4DtglIXhhR6qAfYQ"

def call_gemini_page(img_path):
    with open(img_path, "rb") as f:
        b64_img = base64.b64encode(f.read()).decode('utf-8')

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    prompt = """Transcribe this Japanese exam page with 100% fidelity.
Output a JSON array of questions found on this page.
For each question, provide:
{
  "id": <integer, the question number like 1, 2, 3...>,
  "mondai": <integer, mondai 1, 2, 3, 4, or 5>,
  "instruction": "<the exact Mondai instruction Japanese text preceding the questions, if present on page or applicable to this mondai>",
  "questionText": "<the sentence with <u>underlined text</u> or blanks ______ ★ ______>",
  "options": ["<option 1>", "<option 2>", "<option 3>", "<option 4>"],
  "passage": "<if this is Mondai 3 reading passage, include the full passage text with blanks [21], [22] etc, otherwise null>"
}

RULES:
1. Always wrap underlined words/phrases in <u>...</u>.
2. For Mondai 2 (star questions in grammar), format as `... ______ ______ ★ ______ ...`.
3. For Mondai 3 (grammar passage reading), provide the full reading passage in `passage` for all questions in Mondai 3.
4. Keep all kanji and kana exact.
5. Return ONLY valid JSON (wrapped in ```json ... ``` or raw JSON)."""

    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {"inline_data": {"mime_type": "image/jpeg", "data": b64_img}}
            ]
        }],
        "generationConfig": {
            "temperature": 0.0,
            "response_mime_type": "application/json"
        }
    }

    for attempt in range(5):
        try:
            resp = requests.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=60)
            if resp.status_code == 200:
                data = resp.json()
                content = data["candidates"][0]["content"]["parts"][0]["text"]
                return content
            else:
                print(f"Error {resp.status_code}: {resp.text}")
                time.sleep(3)
        except Exception as e:
            print(f"Exception: {e}")
            time.sleep(3)
    return None

def main():
    pages = [f"page_{i:03d}.jpg" for i in range(50, 68)] + [f"page_{i:03d}.jpg" for i in range(112, 130)]
    
    base_dir = r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\test_pages"
    raw_results = {}
    
    for f in pages:
        p = os.path.join(base_dir, f)
        if not os.path.exists(p):
            print(f"File not found: {p}")
            continue
        print(f"Calling Gemini on {f}...")
        res = call_gemini_page(p)
        raw_results[f] = res
        time.sleep(1)
            
    with open(r"D:\sudip_software\nihongo_playground\N4_Chokuzen_Taisaku_Processing\raw_gemini_8_10.json", "w", encoding="utf-8") as out:
        json.dump(raw_results, out, ensure_ascii=False, indent=2)
    print("Done extracting raw pages for Sets 8-10.")

if __name__ == "__main__":
    main()
