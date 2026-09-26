import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def clean_script_text(text_lines):
    cleaned = []
    for line in text_lines:
        line = line.strip()
        if not line:
            continue
        if re.search(r'^(?:第\d+週|\d+日目|課題理解|ポイント理解|聴解スクリプト|Scripts|p\.\d+|\d+$)', line):
            continue
        if re.search(r'^(?:\[?♪?\]?\s*[Nn][1iI]?[\-_ ]*\d+|\d+\s*\[?♪?\]?\s*[Nn][1iI]?[\-_ ]*\d+)', line):
            continue
        cleaned.append(line)
    return '<br />'.join(cleaned)

def parse_all_scripts():
    with open('tmp_inspect/w9_scripts_raw.json', 'r', encoding='utf-8') as f:
        blocks = json.load(f)

    full_stream = []
    for pno, col, lines in blocks:
        full_stream.extend(lines)

    tracks = {}
    current_track = None
    current_lines = []

    for line in full_stream:
        # Normalize line
        norm_line = line.replace('6o', '60').replace('6O', '60')
        m = re.search(r'[Nn][1iI]?[‐\-_ ]*(\d+)', norm_line)
        if m:
            t_num = int(m.group(1))
            if 9 <= t_num <= 73:
                if current_track:
                    tracks[current_track] = clean_script_text(current_lines)
                current_track = f"N1-{t_num}"
                current_lines = []
                continue
        if current_track:
            current_lines.append(line)

    if current_track:
        tracks[current_track] = clean_script_text(current_lines)

    print(f"Parsed {len(tracks)} tracks (N1-9 to N1-73).")
    with open('tmp_inspect/w9_parsed_scripts.json', 'w', encoding='utf-8') as f:
        json.dump(tracks, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    parse_all_scripts()
