import os, sys, glob, json
from PIL import Image
import numpy as np
import winocr

sys.stdout.reconfigure(encoding='utf-8')

def analyze_chapter_footnotes(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        d = json.load(f)
    ch_id = d.get('id') or os.path.basename(json_path).replace('.json', '')
    title = d.get('title', '')
    img_src = d.get('imageSrc', '')
    if not img_src:
        return
    page_file = os.path.join('public', img_src.lstrip('/'))
    if not os.path.exists(page_file):
        print(f"Page file not found: {page_file}")
        return
    
    # Footnote terms in json
    json_fn = d.get('footnotes', [])
    existing_diag = d.get('footnotesDiagram') or d.get('footnotesDiagramLeft') or d.get('footnotesDiagramRight')
    print(f"[{ch_id:10s}] {title:20s} | Page: {os.path.basename(page_file)} | JSON fn count: {len(json_fn)} | Existing diag: {existing_diag}")
    if json_fn:
        terms = [fn.get('term') or fn.get('word') for fn in json_fn]
        print(f"   Terms: {terms}")

print("=== AUDIT OF SHORT PASSAGES ===")
for i in range(1, 21):
    analyze_chapter_footnotes(f'src/data/speed_master_n3_reading/short-{i}.json')

print("\n=== AUDIT OF MEDIUM PASSAGES ===")
for i in range(1, 17):
    analyze_chapter_footnotes(f'src/data/speed_master_n3_reading/medium-{i}.json')

print("\n=== AUDIT OF LONG PASSAGES ===")
for i in range(1, 13):
    analyze_chapter_footnotes(f'src/data/speed_master_n3_reading/long-{i}.json')

print("\n=== AUDIT OF SEARCH PASSAGES ===")
for i in range(1, 16):
    analyze_chapter_footnotes(f'src/data/speed_master_n3_reading/search-{i}.json')

print("\n=== AUDIT OF MOCK EXAM ===")
analyze_chapter_footnotes('src/data/speed_master_n3_reading/mock-exam.json')
