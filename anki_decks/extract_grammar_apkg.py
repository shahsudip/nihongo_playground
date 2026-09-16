# Extractor for Shin Kanzen Master N3 Grammar Sentence Deck (.apkg)

import os
import zipfile
import sqlite3
import json
import re
import tempfile

APKG_PATH = r"C:\Users\sah_sudip_kumar\Downloads\Shin_Kanzen_Master_N3_Grammar__Sentence_Deck.apkg"
OUT_DIR = r"C:\Users\sah_sudip_kumar\.gemini\antigravity-ide\scratch\anki-deck-builder"
AUDIO_DIR = os.path.join(OUT_DIR, "audio")
JSON_PATH = os.path.join(OUT_DIR, "shin_kanzen_n3_grammar_data.json")

os.makedirs(AUDIO_DIR, exist_ok=True)

print("Opening Shin Kanzen Master apkg...")
with zipfile.ZipFile(APKG_PATH, "r") as z:
    # 1. Extract media files if present
    if "media" in z.namelist():
        try:
            media_map = json.loads(z.read("media").decode("utf-8"))
            print(f"Found {len(media_map)} media files in manifest.")
            for zip_num, real_name in media_map.items():
                if zip_num in z.namelist():
                    out_path = os.path.join(AUDIO_DIR, real_name)
                    if not os.path.exists(out_path):
                        with open(out_path, "wb") as f_out:
                            f_out.write(z.read(zip_num))
                        print(f"Extracted audio: {real_name}")
        except Exception as e:
            print("Media extraction note:", e)

    # 2. Extract SQLite database
    db_bytes = z.read("collection.anki21")
    with tempfile.NamedTemporaryFile(suffix=".sqlite", delete=False) as tmp:
        tmp.write(db_bytes)
        tmp_db_path = tmp.name

    conn = sqlite3.connect(tmp_db_path)
    cur = conn.cursor()

    # Get decks map
    cur.execute("SELECT decks FROM col LIMIT 1")
    col_row = cur.fetchone()
    decks_dict = json.loads(col_row[0]) if col_row else {}

    # Query notes and cards
    cur.execute("""
        SELECT n.id, n.flds, n.tags, c.id, c.did
        FROM notes n
        JOIN cards c ON c.nid = n.id
        ORDER BY n.sfld, n.id
    """)

    grammar_cards = []
    field_names = [
        "sortField", "frontSentence", "deckName", "grammarPattern", "lessonInfo",
        "backSentence", "translation", "audioFile", "richGrammarFormation",
        "grammarExplanation", "styleNotes", "additionalNotes", "detailedExplanation",
        "level", "rowNum", "isSample"
    ]

    for row_idx, row in enumerate(cur.fetchall()):
        nid, flds_raw, tags_raw, cid, did = row
        flds = flds_raw.split("\x1f")

        entry = {
            "id": row_idx + 1,
            "noteId": nid,
            "cardId": cid,
            "deckId": did,
            "deckName": decks_dict.get(str(did), {}).get("name", "Lesson"),
            "tags": tags_raw.strip().split() if tags_raw else []
        }

        for idx, fname in enumerate(field_names):
            val = flds[idx] if idx < len(flds) else ""
            if fname == "audioFile":
                m = re.search(r'\[sound:([^\]]+)\]', val)
                val = m.group(1) if m else ""
            entry[fname] = val

        # Clean lesson number for grouping
        lesson_match = re.search(r'Lesson\s*(\d+)', entry["deckName"], re.IGNORECASE)
        entry["lessonNumber"] = int(lesson_match.group(1)) if lesson_match else 1

        grammar_cards.append(entry)

    conn.close()
    try:
        os.remove(tmp_db_path)
    except:
        pass

    print(f"Extracted {len(grammar_cards)} grammar cards.")

    # Save to JSON
    output_data = {
        "deckTitle": "Shin Kanzen Master N3 Grammar - Sentence Deck",
        "cardCount": len(grammar_cards),
        "cards": grammar_cards
    }

    with open(JSON_PATH, "w", encoding="utf-8") as f_out:
        json.dump(output_data, f_out, ensure_ascii=False, indent=2)

    print(f"Saved {JSON_PATH} ({os.path.getsize(JSON_PATH)} bytes).")
