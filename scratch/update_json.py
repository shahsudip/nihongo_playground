import google.generativeai as genai
import json
import os
import re

genai.configure()
model = genai.GenerativeModel('gemini-2.5-pro')

def update_json_from_images(json_path, image_paths):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for i, (image_path, sub_sec) in enumerate(zip(image_paths, data['subSections'])):
        print(f"Extracting {image_path} for subSection {i}...")
        sample_file = genai.upload_file(path=image_path)
        
        # Check if it's email or postcard or just text
        format_type = sub_sec.get('passageFormat', 'text')
        
        prompt = f"""
        Extract the reading comprehension passage from this image.
        Return the result as a raw JSON object (do not wrap in markdown ```json) matching this structure:
        
        If it's a normal passage (format: {format_type}):
        {{
            "passage": "The text with <ruby>漢字<rt>かんじ</rt></ruby> tags for furigana. Preserve paragraphs with \\n\\n."
        }}
        
        If it's an email (format: {format_type}):
        {{
            "passageIntro": "intro text e.g. これは本屋からのメールである。",
            "documentTo": "To email/name",
            "documentSubject": "Subject",
            "documentDate": "Date",
            "documentBody": "Body text with <ruby> tags. Preserve paragraphs with \\n\\n."
        }}
        
        If it's a postcard (format: {format_type}):
        {{
            "passageIntro": "intro text e.g. これは歯医者からのはがきです。",
            "documentBody": "Body text with <ruby> tags. Preserve paragraphs with \\n\\n."
        }}
        
        Rules:
        1. DO NOT include the question stem (e.g. この文章を書いた人について...), options, or the title (1), (2).
        2. ONLY include the passage content.
        3. STRICTLY extract furigana as <ruby>漢字<rt>かんじ</rt></ruby>.
        """
        
        response = model.generate_content([sample_file, prompt])
        result_text = response.text.strip()
        if result_text.startswith("```json"):
            result_text = result_text.replace("```json\n", "").replace("\n```", "")
            
        try:
            extracted_data = json.loads(result_text)
            for k, v in extracted_data.items():
                if k in sub_sec:
                    sub_sec[k] = v
                elif k == 'passage' and 'passage' in sub_sec:
                    sub_sec['passage'] = v
        except Exception as e:
            print(f"Failed to parse JSON for {image_path}: {e}")
            print(result_text)

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Updated {json_path}")

d3_images = [f"tmp_inspect/zenkamoku_n3/page_{i:03d}.jpg" for i in range(83, 87)]
d4_images = [f"tmp_inspect/zenkamoku_n3/page_{i:03d}.jpg" for i in range(87, 91)]
d5_images = [f"tmp_inspect/zenkamoku_n3/page_{i:03d}.jpg" for i in range(91, 95)]

update_json_from_images("src/data/zenkamoku_n3/w05-d03.json", d3_images)
update_json_from_images("src/data/zenkamoku_n3/w05-d04.json", d4_images)
update_json_from_images("src/data/zenkamoku_n3/w05-d05.json", d5_images)

