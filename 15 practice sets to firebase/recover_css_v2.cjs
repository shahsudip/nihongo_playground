const fs = require('fs');
const readline = require('readline');

async function recoverCSS() {
  const fileStream = fs.createReadStream('C:/Users/sah_sudip_kumar/.gemini/antigravity-cli/brain/57a3a9ad-6156-4f2a-857e-c0eb80757a3b/.system_generated/logs/transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let recoveredContent = '';

  for await (const line of rl) {
    try {
      const data = JSON.parse(line);
      if (data.type === 'TOOL_RESPONSE') {
         if (data.content && data.content.includes('.flashcard-navigation {')) {
            recoveredContent = data.content;
            break;
         }
      }
    } catch (e) {}
  }
  
  fs.writeFileSync('D:/sudip_software/nihongo_playground/recovered_css.txt', recoveredContent);
  console.log('Done searching');
}

recoverCSS();
