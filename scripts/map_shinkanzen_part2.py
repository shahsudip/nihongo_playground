import fitz
import sys
import json
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"D:\sudip_software\[weeblibrary.wordpress.com]_Nihongo_Power_Drill_N3_Moji_Goi\Materi N3\新完全マスター聴解 N3\新完全マスター聴解, N3 Shin kanzen masutā chōkai, N3.pdf"
doc = fitz.open(pdf_path)

print(f"Total Pages in PDF: {len(doc)}")

print("\n--- MAIN BOOK OVERVIEW (P16 - P87) ---")
for p in range(15, 87):
    text = doc[p].get_text()
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    header = " // ".join(lines[:4]) if lines else "[EMPTY]"
    print(f"PDF P{p+1:03d} (Book P{p-2:02d}): {header[:120]}")

print("\n--- BOOKLET OVERVIEW (P88 - P133) ---")
for p in range(87, len(doc)):
    text = doc[p].get_text()
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    header = " // ".join(lines[:4]) if lines else "[EMPTY]"
    print(f"PDF P{p+1:03d} (Bessatsu P{p-87:02d}): {header[:120]}")
