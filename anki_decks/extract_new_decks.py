# Extractor for Japanese Anime Sentence Mining Deck and Speed Master Standard 2400

import os
import zipfile
import sqlite3
import json
import re
import tempfile

BASE_DIR = r"C:\Users\sah_sudip_kumar\.gemini\antigravity-ide\scratch\anki-deck-builder"
DOWNLOADS_DIR = r"C:\Users\sah_sudip_kumar\Downloads"
MEDIA_DIR = os.path.join(BASE_DIR, "anime_media")
os.makedirs(MEDIA_DIR, exist_ok=True)

# 1. EXTRACT ANIME SENTENCE MINING DECK
anime_apkg = os.path.join(DOWNLOADS_DIR, "Japanese_N3_N2_N4_Anime_Sentence_images_audio.apkg")
if os.path.exists(anime_apkg):
    print("Extracting Anime Sentence Mining Deck...")
    with zipfile.ZipFile(anime_apkg, "r") as z:
        # Extract media files
        if "media" in z.namelist():
            media_map = json.loads(z.read("media").decode("utf-8"))
            print(f"Extracting {len(media_map)} anime media files (audio + screenshots)...")
            extracted_media = 0
            for zip_num, real_name in media_map.items():
                if zip_num in z.namelist():
                    # Clean filename if needed
                    safe_name = re.sub(r'[^\w\.-]', '_', real_name)
                    out_f = os.path.join(MEDIA_DIR, safe_name)
                    if not os.path.exists(out_f):
                        with open(out_f, "wb") as f_out:
                            f_out.write(z.read(zip_num))
                        extracted_media += 1
            print(f"Extracted {extracted_media} new anime media files into anime_media/.")

        # Extract SQLite DB
        db_bytes = z.read("collection.anki21")
        with tempfile.NamedTemporaryFile(suffix=".sqlite", delete=False) as tmp:
            tmp.write(db_bytes)
            tmp_db = tmp.name

        conn = sqlite3.connect(tmp_db)
        cur = conn.cursor()
        cur.execute("""
            SELECT n.id, n.flds, n.tags, c.id
            FROM notes n
            JOIN cards c ON c.nid = n.id
            ORDER BY n.id
        """)

        field_names = [
            "key", "word", "sentence", "englishSentence", "sentenceReading",
            "wordReading", "primaryDefinition", "wordAudio", "sentenceAudio",
            "myPersonalDefinition", "secondaryDefinition", "picture", "comment", "extraDefinitions"
        ]

        anime_cards = []
        for row_idx, row in enumerate(cur.fetchall()):
            nid, flds_raw, tags_raw, cid = row
            flds = flds_raw.split("\x1f")

            card_data = {
                "id": row_idx + 1,
                "noteId": nid,
                "cardId": cid,
                "tags": tags_raw.strip().split() if tags_raw else []
            }

            for f_idx, name in enumerate(field_names):
                val = flds[f_idx] if f_idx < len(flds) else ""
                # Clean audio [sound:file.mp3]
                if name in ["wordAudio", "sentenceAudio"]:
                    m = re.search(r'\[sound:([^\]]+)\]', val)
                    if m:
                        val = re.sub(r'[^\w\.-]', '_', m.group(1))
                    else:
                        val = ""
                elif name == "picture":
                    m = re.search(r'<img[^>]+src=["\']?([^"\'>]+)["\']?', val)
                    if m:
                        val = re.sub(r'[^\w\.-]', '_', m.group(1))
                    else:
                        val = ""

                card_data[name] = val

            anime_cards.append(card_data)

        conn.close()
        try:
            os.remove(tmp_db)
        except:
            pass

        anime_json = os.path.join(BASE_DIR, "anime_sentence_mining_data.json")
        with open(anime_json, "w", encoding="utf-8") as f_out:
            json.dump({
                "deckTitle": "Japanese Anime Sentence Mining Deck (N3-N2)",
                "cardCount": len(anime_cards),
                "cards": anime_cards
            }, f_out, ensure_ascii=False, indent=2)
        print(f"Saved {anime_json} with {len(anime_cards)} cards.")

# 2. EXTRACT SPEED MASTER STANDARD 2400
speed_apkg = os.path.join(DOWNLOADS_DIR, "_Standard_2400.apkg")
if os.path.exists(speed_apkg):
    print("Extracting Speed Master Standard 2400...")
    with zipfile.ZipFile(speed_apkg, "r") as z:
        db_name = "collection.anki21" if "collection.anki21" in z.namelist() else "collection.anki2"
        db_bytes = z.read(db_name)
        with tempfile.NamedTemporaryFile(suffix=".sqlite", delete=False) as tmp:
            tmp.write(db_bytes)
            tmp_db = tmp.name

        conn = sqlite3.connect(tmp_db)
        cur = conn.cursor()
        cur.execute("SELECT id, flds, tags FROM notes ORDER BY id")

        speed_cards = []
        for row_idx, row in enumerate(cur.fetchall()):
            nid, flds_raw, tags_raw = row
            flds = flds_raw.split("\x1f")

            expr = flds[0] if len(flds) > 0 else ""
            reading = flds[1] if len(flds) > 1 else ""
            meaning = flds[2] if len(flds) > 2 else ""
            sentence = flds[3] if len(flds) > 3 else ""

            speed_cards.append({
                "id": row_idx + 1,
                "noteId": nid,
                "expression": expr,
                "reading": reading,
                "meaning": meaning,
                "sentence": sentence,
                "tags": tags_raw.strip().split() if tags_raw else []
            })

        conn.close()
        try:
            os.remove(tmp_db)
        except:
            pass

        speed_json = os.path.join(BASE_DIR, "speed_master_2400_data.json")
        with open(speed_json, "w", encoding="utf-8") as f_out:
            json.dump({
                "deckTitle": "Speed Master Standard 2400",
                "cardCount": len(speed_cards),
                "cards": speed_cards
            }, f_out, ensure_ascii=False, indent=2)
        print(f"Saved {speed_json} with {len(speed_cards)} cards.")

print("All extractions completed.")
