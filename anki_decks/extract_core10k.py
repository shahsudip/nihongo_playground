# Extractor for AnkiDrone Core10k

import os
import zipfile
import sqlite3
import json
import re
import tempfile

BASE_DIR = r"C:\Users\sah_sudip_kumar\.gemini\antigravity-ide\scratch\anki-deck-builder"
APKG_PATH = r"C:\Users\sah_sudip_kumar\Downloads\AnkiDrone Core10k.apkg"
JSON_PATH = os.path.join(BASE_DIR, "core10k_data.json")

print("Opening AnkiDrone Core10k...")
with zipfile.ZipFile(APKG_PATH, "r") as z:
    data = z.read("collection.anki21")
    with tempfile.NamedTemporaryFile(suffix=".sqlite", delete=False) as tmp:
        tmp.write(data)
        tpath = tmp.name

    conn = sqlite3.connect(tpath)
    cur = conn.cursor()
    cur.execute("""
        SELECT n.id, n.flds, n.tags, c.id
        FROM notes n
        JOIN cards c ON c.nid = n.id
        WHERE n.mid = 1624411489803
        ORDER BY n.id
    """)

    field_names = [
        "sentKanji", "sentFurigana", "sentEng", "sentAudio", "vocabKanji",
        "vocabFurigana", "vocabDef", "vocabAudio", "notes", "netflixFreq", "makeProductionCard"
    ]

    core10k_cards = []
    for row_idx, row in enumerate(cur.fetchall()):
        nid, flds_raw, tags_raw, cid = row
        flds = flds_raw.split("\x1f")

        entry = {
            "id": row_idx + 1,
            "noteId": nid,
            "cardId": cid,
            "tags": tags_raw.strip().split() if tags_raw else []
        }

        for idx, fname in enumerate(field_names):
            val = flds[idx] if idx < len(flds) else ""
            if fname in ["sentAudio", "vocabAudio"]:
                m = re.search(r'\[sound:([^\]]+)\]', val)
                val = m.group(1) if m else ""
            entry[fname] = val

        core10k_cards.append(entry)

    conn.close()
    try:
        os.remove(tpath)
    except:
        pass

    print(f"Extracted {len(core10k_cards)} Core10k cards.")

    with open(JSON_PATH, "w", encoding="utf-8") as f_out:
        json.dump({
            "deckTitle": "AnkiDrone Core 10,000 Vocabulary Deck",
            "cardCount": len(core10k_cards),
            "cards": core10k_cards
        }, f_out, ensure_ascii=False, indent=2)

    print(f"Saved {JSON_PATH} ({os.path.getsize(JSON_PATH)} bytes).")
