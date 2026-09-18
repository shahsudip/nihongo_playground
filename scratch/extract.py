import google.generativeai as genai
import json
import os
import re

genai.configure()
model = genai.GenerativeModel('gemini-2.5-pro')

def extract_text(image_path):
    print(f"Extracting {image_path}...")
    sample_file = genai.upload_file(path=image_path)
    prompt = """
    Extract the Japanese text of the reading comprehension passage from this image.
    Follow these rules strictly:
    1. Do not include the title (e.g. (1), (2)), question stem, or options.
    2. Do not include the header (e.g. 第5週 3日目, 内容理解...).
    3. If there is a passage format (like email or postcard), extract the body and metadata.
    4. For any word with furigana, format it strictly as: <ruby>漢字<rt>かんじ</rt></ruby>. (e.g. <ruby>苦手<rt>にがて</rt></ruby>)
    5. Preserve paragraphs using \n\n.
    6. For emails/postcards, include the sender/receiver info exactly as it appears in the passage body, but if it is separated into fields (like To, Subject), format it nicely as text or follow the visual flow.
    7. ONLY output the raw Japanese text for the passage body. Do not wrap in markdown blocks if it's just text.
    """
    response = model.generate_content([sample_file, prompt])
    return response.text.strip()

print(extract_text("tmp_inspect/zenkamoku_n3/page_083.jpg"))
