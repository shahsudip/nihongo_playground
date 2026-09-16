# Extractor for JLPT Tango N3 Anki Package (.apkg)
# Extracts collection data and decompresses audio files

import os
import sys
import zipfile
import zstandard
import sqlite3
import json
import re
import tempfile

APKG_PATH = r"C:\Users\sah_sudip_kumar\Downloads\JLPT Tango N3.apkg"
OUT_DIR = r"C:\Users\sah_sudip_kumar\.gemini\antigravity-ide\scratch\anki-deck-builder"
AUDIO_DIR = os.path.join(OUT_DIR, "audio")
JSON_PATH = os.path.join(OUT_DIR, "deck_data.json")

os.makedirs(AUDIO_DIR, exist_ok=True)

print("Opening apkg archive...")
with zipfile.ZipFile(APKG_PATH, "r") as z:
    # 1. Decompress media map
    print("Reading media manifest...")
    raw_media = z.read("media")
    dctx = zstandard.ZstdDecompressor()
    decomp_media = dctx.decompress(raw_media, max_output_size=50000000)
    
    # Extract ordered filenames
    matches = re.findall(rb'\n[\x01-\x7f]([a-zA-Z0-9_\.-]+\.[a-zA-Z0-9]+)\x10', decomp_media)
    media_map = {} # zip_entry_index_str -> real_filename
    filename_to_zip = {}
    for idx, m in enumerate(matches):
        fname = m.decode("ascii")
        idx_str = str(idx)
        media_map[idx_str] = fname
        filename_to_zip[fname] = idx_str
        
    print(f"Mapped {len(media_map)} media files.")

    # 2. Decompress SQLite database
    print("Decompressing collection.anki21b...")
    decomp_db = dctx.decompress(z.read("collection.anki21b"), max_output_size=100000000)
    
    with tempfile.NamedTemporaryFile(suffix=".anki21", delete=False) as tmp:
        tmp.write(decomp_db)
        tmp_db_path = tmp.name

    conn = sqlite3.connect(tmp_db_path)
    cur = conn.cursor()

    # Query notes
    cur.execute("""
        SELECT n.id, n.mid, n.flds, n.tags, c.id, c.ord, c.did
        FROM notes n
        JOIN cards c ON c.nid = n.id
        ORDER BY CAST(n.sfld AS INTEGER), n.id
    """)

    all_cards = []
    needed_audio_files = set()

    for row in cur.fetchall():
        nid, mid, flds_raw, tags_raw, cid, ord_num, did = row
        flds = flds_raw.split("\x1f")

        expression = ""
        reading = ""
        vocab_meaning = ""
        sentence = ""
        sentence_meaning = ""
        audio_file = ""
        sort_id = len(all_cards) + 1

        if mid == 1642356517877:
            # Model: JLPT Tango N3 Japanese Alpha
            # 0: Sort, 1: Grammar, 2: Meaning, 3: Expression, 4: Reading, 5: Vocab Meaning, 6: Notes, 7: Audio, 8: Audio on Front, 9: FocusMorph
            try:
                sort_id = int(flds[0]) if flds[0].isdigit() else sort_id
            except:
                pass
            sentence = flds[1] if len(flds) > 1 else ""
            sentence_meaning = flds[2] if len(flds) > 2 else ""
            expression = flds[3] if len(flds) > 3 else ""
            reading = flds[4] if len(flds) > 4 else ""
            vocab_meaning = flds[5] if len(flds) > 5 else ""
            
            # Audio tag: [sound:0001_Chap1-Sec1.mp3]
            raw_audio = flds[7] if len(flds) > 7 else ""
            m_audio = re.search(r'\[sound:([^\]]+)\]', raw_audio)
            if m_audio:
                audio_file = m_audio.group(1)

        elif mid == 1648634866506:
            # Model: Japanese - Yomichan
            # 0: Expression, 1: Meaning, 2: Sentence, 3: Reading, 4: Sentence_Furigana, 5: Sentence_Meaning, 6: Audio, 7: Pitch, ...
            expression = flds[0] if len(flds) > 0 else ""
            vocab_meaning = flds[1] if len(flds) > 1 else ""
            sentence = flds[2] if len(flds) > 2 else ""
            reading = flds[3] if len(flds) > 3 else ""
            sentence_meaning = flds[5] if len(flds) > 5 else ""
            raw_audio = flds[6] if len(flds) > 6 else ""
            m_audio = re.search(r'\[sound:([^\]]+)\]', raw_audio)
            if m_audio:
                audio_file = m_audio.group(1)

        if audio_file:
            needed_audio_files.add(audio_file)

        card_entry = {
            "id": sort_id,
            "noteId": nid,
            "cardId": cid,
            "expression": expression,
            "reading": reading,
            "vocabMeaning": vocab_meaning,
            "sentence": sentence,
            "sentenceMeaning": sentence_meaning,
            "audio": audio_file,
            "tags": tags_raw.strip().split() if tags_raw else []
        }
        all_cards.append(card_entry)

    conn.close()
    try:
        os.remove(tmp_db_path)
    except:
        pass

    # Sort cards by id
    all_cards.sort(key=lambda x: x["id"])
    print(f"Parsed {len(all_cards)} cards. Audio files referenced: {len(needed_audio_files)}")

    # Save JSON data
    deck_output = {
        "deckName": "JLPT Tango N3",
        "cardCount": len(all_cards),
        "cards": all_cards
    }
    with open(JSON_PATH, "w", encoding="utf-8") as f_json:
        json.dump(deck_output, f_json, ensure_ascii=False, indent=2)
    print(f"Saved {JSON_PATH} ({os.path.getsize(JSON_PATH)} bytes)")

    # 3. Extract audio files
    print("Extracting audio files to audio/ directory...")
    extracted_count = 0
    for fname in needed_audio_files:
        if fname in filename_to_zip:
            zip_entry = filename_to_zip[fname]
            out_file = os.path.join(AUDIO_DIR, fname)
            if not os.path.exists(out_file):
                try:
                    compressed_audio = z.read(zip_entry)
                    if compressed_audio.startswith(b'\x28\xb5\x2f\xfd'):
                        raw_audio = dctx.decompress(compressed_audio, max_output_size=20000000)
                    else:
                        raw_audio = compressed_audio
                    with open(out_file, "wb") as f_out:
                        f_out.write(raw_audio)
                    extracted_count += 1
                except Exception as e:
                    pass

    print(f"Finished. Extracted {extracted_count} audio files into {AUDIO_DIR}.")
