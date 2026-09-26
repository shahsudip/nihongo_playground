import sys
import os
sys.stdout.reconfigure(encoding='utf-8')
import fitz  # PyMuPDF

pdf_path = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\Materi N3\新完全マスター聴解 N3\新完全マスター聴解, N3 Shin kanzen masutā chōkai, N3.pdf"

if not os.path.exists(pdf_path):
    base = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\Materi N3"
    for root, dirs, files in os.walk(base):
        for f in files:
            if '聴解' in f and f.endswith('.pdf'):
                pdf_path = os.path.join(root, f)
                break

print(f"Opening: {pdf_path}")
doc = fitz.open(pdf_path)
print(f"Total Pages: {len(doc)}")

for page_idx in range(len(doc)):
    text = doc[page_idx].get_text()
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    header = " | ".join(lines[:4])
    if any(k in text for k in ["問題紹介", "実力養成", "模擬試験", "別冊", "解答", "スクリプト", "目次", "もくじ", "第１部", "第２部", "第1部", "第2部", "音声の特徴"]):
        print(f"Page {page_idx+1:03d}: {header[:120]}")
