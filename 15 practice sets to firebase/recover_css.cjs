const fs = require('fs');
const readline = require('readline');

async function recoverCSS() {
  const fileStream = fs.createReadStream('C:/Users/sah_sudip_kumar/.gemini/antigravity-cli/brain/57a3a9ad-6156-4f2a-857e-c0eb80757a3b/.system_generated/logs/transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let recoveredStyles = [];

  for await (const line of rl) {
    try {
      const data = JSON.parse(line);
      if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
        for (const call of data.tool_calls) {
          if (call.name === 'multi_replace_file_content' || call.name === 'replace_file_content') {
            if (call.args.TargetFile && call.args.TargetFile.includes('app_style.css')) {
              if (call.args.ReplacementContent) {
                recoveredStyles.push(call.args.ReplacementContent);
              }
              if (call.args.ReplacementChunks) {
                for (const chunk of call.args.ReplacementChunks) {
                  recoveredStyles.push(chunk.ReplacementContent);
                }
              }
            }
          }
          if (call.name === 'write_to_file' && call.args.TargetFile && call.args.TargetFile.includes('app_style.css')) {
            recoveredStyles.push(call.args.CodeContent);
          }
          if (call.name === 'run_command' && call.args.CommandLine && call.args.CommandLine.includes('app_style.css')) {
            recoveredStyles.push(call.args.CommandLine);
          }
        }
      }
    } catch (e) {}
  }
  
  fs.writeFileSync('D:/sudip_software/nihongo_playground/recovered_css.txt', recoveredStyles.join('\n\n=====\n\n'));
  console.log('CSS recovered length:', recoveredStyles.length);
}

recoverCSS();
