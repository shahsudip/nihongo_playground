import json
import os
import re
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')

def clean_script_text(text_lines):
    cleaned = []
    for line in text_lines:
        line = line.strip()
        if not line:
            continue
        if re.search(r'^(?:第\d+週|\d+日目|概要理解|即時応答|統合理解|聴解スクリプト|Scripts|p\.\d+|\d+$)', line):
            continue
        if re.search(r'^(?:\[?♪?\]?\s*[Nn][1iI]?[\-_ ]*\d+|\d+\s*\[?♪?\]?\s*[Nn][1iI]?[\-_ ]*\d+)', line):
            continue
        cleaned.append(line)
    return '<br />'.join(cleaned)

def parse_and_inject():
    if not os.path.exists('tmp_inspect/w10_w12_scripts_raw.json'):
        print("Raw OCR file not ready.")
        return

    with open('tmp_inspect/w10_w12_scripts_raw.json', 'r', encoding='utf-8') as f:
        blocks = json.load(f)

    full_stream = []
    for pno, col, lines in blocks:
        full_stream.extend(lines)

    tracks = {}
    current_track = None
    current_lines = []

    for line in full_stream:
        norm_line = line.replace('6o', '60').replace('6O', '60').replace('7o', '70').replace('8o', '80')
        m = re.search(r'[Nn][1iI]?[‐\-_ ]*(\d+)', norm_line)
        if m:
            t_num = int(m.group(1))
            if 74 <= t_num <= 188:
                if current_track:
                    tracks[current_track] = clean_script_text(current_lines)
                current_track = f"N1-{t_num}"
                current_lines = []
                continue
        if current_track:
            current_lines.append(line)

    if current_track:
        tracks[current_track] = clean_script_text(current_lines)

    print(f"Parsed {len(tracks)} tracks (N1-74 to N1-188).")
    with open('tmp_inspect/w10_w12_parsed_scripts.json', 'w', encoding='utf-8') as f:
        json.dump(tracks, f, ensure_ascii=False, indent=2)

    # Inject into JSON files
    for w in [10, 11, 12]:
        for fpath in sorted(glob.glob(f'src/data/zenkamoku_n1/w{w:02d}-d0*.json')):
            with open(fpath, 'r', encoding='utf-8') as fp:
                data = json.load(fp)
            updated = 0
            for q in data.get('questions', []):
                tid = q.get('trackId')
                if tid in tracks and tracks[tid]:
                    q['script'] = tracks[tid]
                    updated += 1
            with open(fpath, 'w', encoding='utf-8') as fp:
                json.dump(data, fp, ensure_ascii=False, indent=2)
            print(f"Updated {fpath}: {updated}/{len(data['questions'])} scripts populated")

if __name__ == '__main__':
    parse_and_inject()
