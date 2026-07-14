const fs = require('fs');
const readline = require('readline');

async function extractDiff() {
  const fileStream = fs.createReadStream('C:/Users/sah_sudip_kumar/.gemini/antigravity-cli/brain/57a3a9ad-6156-4f2a-857e-c0eb80757a3b/.system_generated/logs/transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let gitDiffFound = false;
  let diffContent = '';

  for await (const line of rl) {
    try {
      const data = JSON.parse(line);
      if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
        for (const call of data.tool_calls) {
          if (call.name === 'run_command' && call.args.CommandLine && call.args.CommandLine.includes('git diff')) {
            gitDiffFound = true;
          }
        }
      }
      if (data.type === 'TOOL_RESPONSE' && gitDiffFound) {
         if (data.content && data.content.includes('git diff')) {
            diffContent = data.content;
            break;
         }
      }
    } catch (e) {}
  }
  
  fs.writeFileSync('D:/sudip_software/nihongo_playground/recovered_diff.txt', diffContent);
  console.log('Diff extracted');
}

extractDiff();
