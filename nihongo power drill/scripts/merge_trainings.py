import json
import os

# Base N1 file path
base_file = r'D:\sudip_software\nihongo_playground\nihongo power drill\power_drill_n1_data.json'
with open(base_file, 'r', encoding='utf-8') as f:
    n1_data = json.load(f)

# Filter out old training chapters if they exist (we'll replace them)
filtered_chapters = [ch for ch in n1_data.get('chapters', []) if not ch['id'].startswith('training_')]
n1_data['chapters'] = filtered_chapters

trainings = []
for i in range(1, 13):
    temp_file = rf'D:\sudip_software\nihongo_playground\nihongo power drill\scripts\temp_n1_vocab_training_{i}.json'
    if os.path.exists(temp_file):
        with open(temp_file, 'r', encoding='utf-8') as f:
            chapter = json.load(f)
            trainings.append(chapter)

n1_data['chapters'].extend(trainings)

with open(base_file, 'w', encoding='utf-8') as f:
    json.dump(n1_data, f, ensure_ascii=False, indent=2)

print("Merge complete!")
