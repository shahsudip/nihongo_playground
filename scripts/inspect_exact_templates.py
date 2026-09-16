import os
import zipfile
import sqlite3
import json
import zstandard

downloads_dir = r"C:\Users\sah_sudip_kumar\Downloads"
apkg_files = [f for f in os.listdir(downloads_dir) if f.endswith('.apkg')]

results = {}

for apkg_name in apkg_files:
    apkg_path = os.path.join(downloads_dir, apkg_name)
    try:
        with zipfile.ZipFile(apkg_path, 'r') as z:
            names = z.namelist()
            db_bytes = None
            if "collection.anki21b" in names:
                db_bytes = zstandard.ZstdDecompressor().decompress(z.read("collection.anki21b"), max_output_size=300000000)
            elif "collection.anki21" in names:
                db_bytes = z.read("collection.anki21")
            elif "collection.anki2" in names:
                db_bytes = z.read("collection.anki2")

            if not db_bytes:
                continue

            tmp_db = os.path.join(os.path.dirname(__file__), f"temp_{apkg_name}.sqlite")
            with open(tmp_db, "wb") as f_tmp:
                f_tmp.write(db_bytes)

            conn = sqlite3.connect(tmp_db)
            cur = conn.cursor()

            cur.execute("SELECT models, decks FROM col")
            col_row = cur.fetchone()
            models = json.loads(col_row[0]) if (col_row and col_row[0]) else {}
            decks = json.loads(col_row[1]) if (col_row and col_row[1]) else {}

            deck_info = {
                "decks": [d.get("name") for d in decks.values()],
                "models": []
            }

            for mid, m in models.items():
                m_fields = [f.get("name") for f in m.get("flds", [])]
                m_tmpls = [{"name": t.get("name"), "qfmt": t.get("qfmt"), "afmt": t.get("afmt")} for t in m.get("tmpls", [])]
                deck_info["models"].append({
                    "id": mid,
                    "name": m.get("name"),
                    "fields": m_fields,
                    "css": m.get("css", ""),
                    "templates": m_tmpls
                })

            # Sample 2 cards with field names
            cur.execute("SELECT id, mid, flds, tags FROM notes LIMIT 2")
            samples = []
            for r in cur.fetchall():
                nid, mid, flds_raw, tags = r
                m_def = models.get(str(mid), {})
                f_names = [f.get("name") for f in m_def.get("flds", [])]
                f_vals = flds_raw.split("\x1f")
                card_data = {}
                for idx, v in enumerate(f_vals):
                    fn = f_names[idx] if idx < len(f_names) else f"Fld_{idx}"
                    card_data[fn] = v
                samples.append({
                    "noteId": nid,
                    "modelName": m_def.get("name"),
                    "data": card_data
                })

            deck_info["samples"] = samples
            results[apkg_name] = deck_info

            conn.close()
            if os.path.exists(tmp_db):
                os.remove(tmp_db)

    except Exception as e:
        print(f"Error reading {apkg_name}: {e}")

out_path = os.path.join(os.path.dirname(__file__), "deck_patterns_details.json")
with open(out_path, "w", encoding="utf-8") as f_out:
    json.dump(results, f_out, ensure_ascii=False, indent=2)

print(f"Exported deck patterns to {out_path}")
