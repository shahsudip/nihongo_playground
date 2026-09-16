import os
import zipfile
import sqlite3
import json
import zstandard

downloads_dir = r"C:\Users\sah_sudip_kumar\Downloads"
apkg_files = [f for f in os.listdir(downloads_dir) if f.endswith('.apkg')]

for apkg_name in apkg_files:
    apkg_path = os.path.join(downloads_dir, apkg_name)
    print(f"\n==========================================")
    print(f"ANALYZING: {apkg_name}")
    print(f"==========================================")
    try:
        with zipfile.ZipFile(apkg_path, 'r') as z:
            names = z.namelist()
            print(f"Files in zip: {len(names)}")
            
            # Media inspection
            if "media" in names:
                m_raw = z.read("media")
                print(f"'media' file size: {len(m_raw)} bytes. First 50 bytes: {m_raw[:50]}")
                if len(m_raw) > 0:
                    try:
                        m_json = json.loads(m_raw.decode('utf-8'))
                        print(f"Media map contains {len(m_json)} entries. Sample entries: {list(m_json.items())[:3]}")
                    except Exception as e:
                        print(f"Media is not plain JSON: {e}")

            # Database selection
            db_bytes = None
            if "collection.anki21b" in names:
                print("--> Extracting collection.anki21b (zstd)")
                raw = z.read("collection.anki21b")
                db_bytes = zstandard.ZstdDecompressor().decompress(raw, max_output_size=300000000)
            elif "collection.anki21" in names:
                print("--> Extracting collection.anki21")
                db_bytes = z.read("collection.anki21")
            elif "collection.anki2" in names:
                print("--> Extracting collection.anki2")
                db_bytes = z.read("collection.anki2")

            tmp_db = os.path.join(os.path.dirname(__file__), f"tmp_{apkg_name}.sqlite")
            with open(tmp_db, "wb") as f_tmp:
                f_tmp.write(db_bytes)

            conn = sqlite3.connect(tmp_db)
            cur = conn.cursor()

            # Models
            cur.execute("SELECT models, decks FROM col")
            col_row = cur.fetchone()
            models = json.loads(col_row[0]) if (col_row and col_row[0]) else {}
            decks = json.loads(col_row[1]) if (col_row and col_row[1]) else {}

            cur.execute("SELECT COUNT(*) FROM notes")
            note_cnt = cur.fetchone()[0]
            cur.execute("SELECT COUNT(*) FROM cards")
            card_cnt = cur.fetchone()[0]
            print(f"Total Notes: {note_cnt} | Total Cards: {card_cnt}")

            print("Decks:")
            for did, dinfo in decks.items():
                print(f"  Deck [{did}]: {dinfo.get('name')}")

            print("Note Models & Fields:")
            for mid, minfo in models.items():
                f_names = [f.get('name') for f in minfo.get('flds', [])]
                tmpls = minfo.get('tmpls', [])
                print(f"  Model [{mid}] '{minfo.get('name')}': {len(f_names)} fields -> {f_names}")
                for t in tmpls:
                    print(f"    - Card Template '{t.get('name')}':")
                    print(f"      Q: {t.get('qfmt')[:100]}...")
                    print(f"      A: {t.get('afmt')[:100]}...")

            # 2 sample notes with field names mapped
            cur.execute("SELECT id, mid, flds, tags FROM notes LIMIT 2")
            print("Sample Notes Data:")
            for n in cur.fetchall():
                nid, mid, flds_raw, tags = n
                m_def = models.get(str(mid), {})
                field_defs = [f.get('name') for f in m_def.get('flds', [])]
                field_vals = flds_raw.split('\x1f')
                mapped = {}
                for idx, val in enumerate(field_vals):
                    fname = field_defs[idx] if idx < len(field_defs) else f"fld_{idx}"
                    mapped[fname] = val[:100] + ("..." if len(val) > 100 else "")
                print(f"  Note #{nid} (Model: {m_def.get('name')}):")
                print(f"    Fields: {json.dumps(mapped, ensure_ascii=False, indent=6)}")

            conn.close()
            if os.path.exists(tmp_db):
                os.remove(tmp_db)

    except Exception as e:
        print(f"Error analyzing {apkg_name}: {e}")
