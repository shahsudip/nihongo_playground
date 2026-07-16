# Grammar Drill Workflow

This document explains the workflow for processing, cleaning, and uploading Grammar Drills for Nihongo Power Drill (N3, N2, N1).

## 1. Extract Data
Whenever a new batch of grammar drills (e.g. Drills 16, 17, 18) needs to be added, use the Gemini Vision API or manual transcription to convert the screenshots into JSON arrays. 

## 2. Prepare the Python Script
Create a new Python file (e.g. `update_batch_6.py`) containing the extracted JSON data. 
Import the `insert_grammar` function from `insert_grammar.py` to seamlessly merge the data into the database. 

Example `update_batch_6.py`:
```python
from insert_grammar import insert_grammar

batch_data = [
  {
    "id": "grammar-16",
    "title": "第16回",
    "mondai_1": [...],
    "mondai_2": [...],
    "mondai_3": {...}
  }
]

if __name__ == "__main__":
    insert_grammar(batch_data)
```

## 3. Run the Update Script
Execute the script to update both `power_drill_grammar_data.json` and the unified `power_drill_data.json`:
```bash
python update_batch_6.py
```
This script handles deduplication, sorting, and standardizes all chapter IDs to start with `grammar-` (fixing the UI UI rendering bug).

## 4. Push to Firebase
Run the NodeJS push script to deploy the unified database to your live Firebase backend.
*Note: Make sure your `scraper-test/service-account.json` credentials are valid.*
```bash
node "nihongo power drill/push_power_drill.cjs"
```

## 5. Deploy to Website
Commit the updated JSON files and scripts to Git and push, which will trigger any frontend deployments and keep your code safe:
```bash
git add .
git commit -m "Add grammar batch X"
git push
```
