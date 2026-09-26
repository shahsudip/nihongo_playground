import fitz  # PyMuPDF
import os
import json
import base64
import time

PDF_PATH = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\Materi N3 総まとめ\日本語総まとめ N3, 読解  Nihongo sōmatome N3, Dokkai.pdf"
OUTPUT_DIR = r"D:\sudip_software\nihongo_playground\src\data\somatome"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# The exact JSON structure Claude/Gemini must follow
JSON_SCHEMA = """
{
  "bookId": "sou-matome-n3-reading",
  "chapterId": "weekX-dayY",
  "week": X,
  "day": Y,
  "theme": "String",
  "title": "Week X - Day Y: String",
  "learning_focus": {
    "title": "String",
    "subtitle": "String",
    "comic": { "text1": "String", "text2": "String", "sign": "String", "note": "String" }
  },
  "vocabulary": [
    { "word": "String", "reading": "String", "meaning": "String" }
  ],
  "grammar_notes": ["String"],
  "practice": {
    "title": "れんしゅう",
    "instruction": "String",
    "conversation": [ { "speaker": "String", "text": "String" } ],
    "question": "String",
    "options": ["1 String", "2 String", "3 String"],
    "correct_answers": [1, 4],
    "options_explanation": {
       "1": "Explanation why 1 is correct/incorrect",
       "2": "Explanation why 2 is correct/incorrect"
    }
  },
  "mondai": {
    "title": "もんだい",
    "instruction": "String",
    "notice": {
      "title": "String",
      "sections": [
        { "header": "String", "rows": [ { "label": "String", "value": "String" } ] }
      ],
      "footer": "String"
    },
    "notice_vocab": [ { "word": "String", "meaning": "String" } ],
    "questions": [
      {
        "id": "問1",
        "text": "String",
        "options": ["1 String", "2 String", "3 String", "4 String"],
        "correct_answer": 4,
        "explanation": "Detailed explanation of why this is the answer"
      }
    ]
  }
}
"""

def extract_pages_as_base64(pdf_doc, page_num):
    page = pdf_doc.load_page(page_num)
    pix = page.get_pixmap(dpi=150) # Keep DPI moderate to save tokens!
    img_data = pix.tobytes("png")
    return base64.b64encode(img_data).decode("utf-8")

def main():
    doc = fitz.open(PDF_PATH)
    
    # Week 1 Day 1 was pages 12 and 13.
    # Week 1 Day 2 is pages 14 and 15, etc.
    # To save tokens, loop through 2 pages at a time, and pass them to Claude Vision API.
    
    START_PAGE = 14 # 0-indexed 13, but PyMuPDF uses 0-index so 14th page is index 13
    
    # Example: Process just Week 1 Day 2 (Pages 14-15 physical -> indices 13, 14)
    # Wrap this in a loop for the whole book when ready.
    page_index_1 = 13 
    page_index_2 = 14
    
    img1_b64 = extract_pages_as_base64(doc, page_index_1)
    img2_b64 = extract_pages_as_base64(doc, page_index_2)
    
    print("Images extracted! Size:", len(img1_b64), len(img2_b64))
    
    # ==========================================
    # CLAUDE API INTEGRATION PLACEHOLDER
    # ==========================================
    # 1. Use the Anthropic API to pass `img1_b64` and `img2_b64`.
    # 2. Prompt: "You are an OCR and data extraction expert. Read these two pages of a Japanese textbook (Page 1 has Vocab/Practice, Page 2 has Mondai). Extract ALL text and structure it EXACTLY according to this JSON schema. Do not output markdown, ONLY valid JSON. Infer detailed English explanations for why the correct answers are right and the wrong answers are wrong."
    # 3. Save the response to `src/data/somatome/week1-day2.json`
    # 4. Trigger `push_somatome_test.cjs` with the new file to push to Firebase!
    
    print("Script ready for Claude API integration.")

if __name__ == "__main__":
    main()
