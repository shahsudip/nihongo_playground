import os
import json
import re
import requests
import base64
import time

GEMINI_API_KEY = "AQ.Ab8RN6JW3j_WeBbJvYWrWtQYACZs7lP95A4DtglIXhhR6qAfYQ"

def call_gemini(img_path, text):
    with open(img_path, "rb") as image_file:
        b64_img = base64.b64encode(image_file.read()).decode('utf-8')
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    prompt = f"""You are a Japanese proofreader. Your task is to look at the provided image and the provided text.
Add `<ruby>kanji<rt>furigana</rt></ruby>` tags to the kanji in the provided text ONLY if they have furigana printed above them in the image.
IMPORTANT RULE: DO NOT add ruby tags to any words that are underlined in the provided text, even if they have furigana in the image. Keep the <u> tags around those words as they are in the original text.

Original text:
{text}

Just output the updated text, without markdown blocks, nothing else. Do not output anything like ```html or anything."""

    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {"inline_data": {"mime_type": "image/jpeg", "data": b64_img}}
            ]
        }],
        "generationConfig": {
            "temperature": 0.0
        }
    }
    
    for attempt in range(5):
        try:
            resp = requests.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=10)
            if resp.status_code == 200:
                return resp.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
            print(f"Error {resp.status_code}: {resp.text}")
        except Exception as e:
            print(f"Exception: {e}")
        time.sleep(10) # increase sleep to avoid rate limits
    return text

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    matches = list(re.finditer(r'page_story:\s*"(\d+)_\d+",\s*japanese_text:\s*"(.*?)"', content))
    
    print(f"Found {len(matches)} stories in {filepath}")
    
    new_content = content
    
    base_dir = "D:\\sudip_software\\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi"
    folder1 = [f for f in os.listdir(base_dir) if "単語" in f][0]
    folder2 = [f for f in os.listdir(os.path.join(base_dir, folder1)) if "N2" in f][0]
    img_dir = os.path.join(base_dir, folder1, folder2)
    
    for m in matches:
        img_num = m.group(1)
        original_text = m.group(2)
        
        if "<ruby>" in original_text:
            print(f"Skipping {img_num}.jpg because it already has <ruby> tags.")
            continue
            
        img_path = os.path.join(img_dir, f"{img_num}.jpg")
        
        if not os.path.exists(img_path):
            print(f"Image not found: {img_path}")
            continue
            
        print(f"Processing image {img_num}.jpg")
        updated_text = call_gemini(img_path, original_text)
        print("Original:", original_text)
        print("Updated:", updated_text)
        
        updated_text = updated_text.replace('"', '\\"') 
        original_line = f'japanese_text: "{original_text}"'
        new_line = f'japanese_text: "{updated_text}"'
        new_content = new_content.replace(original_line, new_line)
        
        # Save as we go!
        with open(filepath, 'w', encoding='utf-8') as f_out:
            f_out.write(new_content)

process_file("D:\\sudip_software\\nihongo_playground\\generate_topic3_exact.js")
process_file("D:\\sudip_software\\nihongo_playground\\generate_topic4_exact.js")
