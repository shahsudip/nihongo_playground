import winocr, sys, os, json, re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\sudip_software\nihongo_playground"
INSPECT_DIR = os.path.join(BASE_DIR, "tmp_inspect", "zenkamoku_n1")
OUT_DIR = os.path.join(BASE_DIR, "src", "data", "zenkamoku_n1")
os.makedirs(OUT_DIR, exist_ok=True)

# Let's inspect pages 19 to 58 (Weeks 1 to 4)
# Printed Book page X -> file page_{X+3:03d}.jpg
print("Extracting Weeks 1 to 4 text from scans...")

for w in range(1, 5):
    print(f"\n--- Checking Week {w} ---")
    for d in range(1, 6):
        fn = f"w{w:02d}-d{d:02d}.json"
        target_path = os.path.join(OUT_DIR, fn)
        exists = os.path.exists(target_path)
        q_count = 0
        if exists:
            with open(target_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            if 'questions' in data:
                q_count += len(data['questions'])
            if 'sections' in data:
                for s in data['sections']:
                    q_count += len(s.get('questions', []))
        print(f"  {fn}: exists={exists}, questions={q_count}")
