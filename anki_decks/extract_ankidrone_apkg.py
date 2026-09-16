# Extractor for Ankidrone Essentials V9 (.apkg)

import os
import zipfile
import sqlite3
import json
import re
import tempfile
import zstandard

APKG_PATH = r"C:\Users\sah_sudip_kumar\Downloads\Ankidrone Essentials V9.apkg"
OUT_DIR = r"C:\Users\sah_sudip_kumar\.gemini\antigravity-ide\scratch\anki-deck-builder"
JSON_PATH = os.path.join(OUT_DIR, "ankidrone_essentials_data.json")

print("Opening Ankidrone Essentials V9 apkg...")
with zipfile.ZipFile(APKG_PATH, "r") as z:
    decomp = zstandard.ZstdDecompressor().decompress(z.read("collection.anki21b"), max_output_size=100000000)
    with tempfile.NamedTemporaryFile(suffix=".sqlite", delete=False) as tmp:
        tmp.write(decomp)
        tmp_db_path = tmp.name

    conn = sqlite3.connect(tmp_db_path)
    cur = conn.cursor()

    # Get deck mapping
    cur.execute("SELECT id, name FROM decks")
    deck_map = {}
    for r in cur.fetchall():
        clean_name = r[1].replace("\x1f", " -> ")
        deck_map[r[0]] = clean_name

    # Query notes and cards
    cur.execute("""
        SELECT n.id, n.mid, n.flds, n.tags, c.id, c.did
        FROM notes n
        JOIN cards c ON c.nid = n.id
        WHERE n.mid = 1666627418178
        ORDER BY c.did, n.sfld, n.id
    """)

    fields_names = [
        "sentKanji", "sentFurigana", "sentEng", "sentAudio", "vocabKanji",
        "vocabFurigana", "vocabPitchPattern", "vocabPitchNum", "vocabDef",
        "vocabAudio", "image", "notes", "makeProductionCard", "focus"
    ]

    all_cards = []
    for row_idx, row in enumerate(cur.fetchall()):
        nid, mid, flds_raw, tags_raw, cid, did = row
        flds = flds_raw.split("\x1f")

        raw_deck_name = deck_map.get(did, "General")
        # Extract JLPT Level (N5, N4, N3, N2, N1)
        level = "N3"
        m_lvl = re.search(r'Tango\s*(N[1-5])', raw_deck_name, re.IGNORECASE)
        if m_lvl:
            level = m_lvl.group(1).upper()

        entry = {
            "id": row_idx + 1,
            "noteId": nid,
            "cardId": cid,
            "deckId": did,
            "deckName": raw_deck_name,
            "level": level,
            "tags": tags_raw.strip().split() if tags_raw else []
        }

        for idx, fname in enumerate(fields_names):
            val = flds[idx] if idx < len(flds) else ""
            if fname in ["sentAudio", "vocabAudio"]:
                m = re.search(r'\[sound:([^\]]+)\]', val)
                val = m.group(1) if m else ""
            entry[fname] = val

        # Clean vocabKanji if it contains bracket reading
        if "[" in entry["vocabKanji"] and not entry["vocabFurigana"]:
            entry["vocabFurigana"] = entry["vocabKanji"]
            entry["vocabKanji"] = re.sub(r'\[.*?\]', '', entry["vocabKanji"]).replace(' ', '')
        elif "[" in entry["vocabKanji"] and entry["vocabFurigana"]:
            entry["vocabKanji"] = re.sub(r'\[.*?\]', '', entry["vocabKanji"]).replace(' ', '')

        all_cards.append(entry)

    conn.close()
    try:
        os.remove(tmp_db_path)
    except:
        pass

    print(f"Extracted {len(all_cards)} cards across all JLPT levels.")

    output_data = {
        "deckTitle": "Ankidrone Essentials V9 (All JLPT Levels)",
        "cardCount": len(all_cards),
        "cards": all_cards
    }

    with open(JSON_PATH, "w", encoding="utf-8") as f_out:
        json.dump(output_data, f_out, ensure_ascii=False, indent=2)

    print(f"Saved {JSON_PATH} ({os.path.getsize(JSON_PATH)} bytes).")
