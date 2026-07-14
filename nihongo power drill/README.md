# Nihongo Power Drill Import Scripts

This folder contains the scripts and data files for processing and uploading pages from the **Nihongo Power Drill** books.

## Files

1. `push_power_drill.cjs`: The uploader script that pushes the parsed chapters in `power_drill_data.json` directly to Firestore under the configured book ID.
2. `power_drill_data.json`: The database file storing the structured book metadata and chapters/questions.

## Workflow

1. Provide the screenshot or screenshot image link of the textbook page to the AI.
2. The AI will parse the image using vision and format the extracted questions, options, and answer key.
3. The AI will write the structured data directly into the `power_drill_data.json` file in this folder.
4. You can then run the following command to upload the updated database file directly to Firestore:
   ```bash
   node "nihongo power drill/push_power_drill.cjs"
   ```
