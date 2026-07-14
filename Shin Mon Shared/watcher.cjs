const fs = require('fs');
const path = require('path');

const watchDir = 'C:\\Users\\sah_sudip_kumar\\OneDrive\\Pictures\\Screenshots';

console.log(`Starting to watch directory: ${watchDir}`);
console.log('Whenever you take a screenshot, I will automatically detect it and tell the AI to process it!');

// Get the initial list of files to avoid processing existing ones
let initialFiles = new Set();
try {
  const files = fs.readdirSync(watchDir);
  files.forEach(f => initialFiles.add(f));
} catch (e) {
  console.log("Error reading dir initially", e);
}

fs.watch(watchDir, (eventType, filename) => {
  if (filename && filename.endsWith('.png') && eventType === 'rename') {
    // Check if the file actually exists (rename fires for both creation and deletion)
    const filepath = path.join(watchDir, filename);
    if (fs.existsSync(filepath) && !initialFiles.has(filename)) {
      // Add to initial files so we don't process it twice
      initialFiles.add(filename);
      // Wait a tiny bit to ensure the file is fully written before telling the AI to read it
      setTimeout(() => {
        console.log(`\n==================================================`);
        console.log(`NEW_SCREENSHOT_DETECTED`);
        console.log(`FILE: ${filepath}`);
        console.log(`==================================================\n`);
      }, 1000);
    }
  }
});

// Keep process alive
setInterval(() => {}, 100000);
