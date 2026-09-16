# Extractor for Shin Kanzen Master N3 Vocabulary (Official Definitions)

import os
import zipfile
import sqlite3
import json
import tempfile

APKG_PATH = r"C:\Users\sah_sudip_kumar\Downloads\Shin_Kanzen_Master_Vocabulary_JLPT_N3_Official_Definitions.apkg"
OUT_DIR = r"C:\Users\sah_sudip_kumar\.gemini\antigravity-ide\scratch\anki-deck-builder"
JSON_PATH = os.path.join(OUT_DIR, "shin_kanzen_n3_vocab_data.json")

print("Opening Shin Kanzen Master Vocabulary apkg...")
with zipfile.ZipFile(APKG_PATH, "r") as z:
    db_bytes = z.read("collection.anki21")
    with tempfile.NamedTemporaryFile(suffix=".sqlite", delete=False) as tmp:
        tmp.write(db_bytes)
        tmp_db_path = tmp.name

    conn = sqlite3.connect(tmp_db_path)
    cur = conn.cursor()

    cur.execute("""
        SELECT n.id, n.flds, n.tags, c.id
        FROM notes n
        JOIN cards c ON c.nid = n.id
        ORDER BY n.id
    """)

    cards = []
    for row_idx, row in enumerate(cur.fetchall()):
        nid, flds_raw, tags_raw, cid = row
        flds = flds_raw.split("\x1f")

        expr = flds[0] if len(flds) > 0 else ""
        reading = flds[1] if len(flds) > 1 else ""
        meaning = flds[2] if len(flds) > 2 else ""
        notes = flds[3] if len(flds) > 3 else ""

        tags = tags_raw.strip().split() if tags_raw else []

        cards.append({
            "id": row_idx + 1,
            "noteId": nid,
            "cardId": cid,
            "expression": expr,
            "reading": reading,
            "meaning": meaning,
            "notes": notes,
            "tags": tags
        })

    conn.close()
    try:
        os.remove(tmp_db_path)
    except:
        pass

    print(f"Extracted {len(cards)} vocabulary cards.")

    output_data = {
        "deckTitle": "Shin Kanzen Master N3 Vocabulary (Official Definitions)",
        "cardCount": len(cards),
        "cards": cards
    }

    with open(JSON_PATH, "w", encoding="utf-8") as f_out:
        json.dump(output_data, f_out, ensure_ascii=False, indent=2)

    print(f"Saved {JSON_PATH} ({os.path.getsize(JSON_PATH)} bytes).")
