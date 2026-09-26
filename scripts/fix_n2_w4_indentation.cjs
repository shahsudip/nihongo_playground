const fs = require('fs');
const path = require('path');

// Each entry: [filename, indented passage with 　 at paragraph starts]
const fixes = [
  {
    file: 'w04-d02.json',
    // ヘアドネーション — 4 paragraphs, all indented
    oldPassage: '<div class=\\"speed-master-lined-paper\\">\\n先日、テレビ番組',
    newPassage: '<div class=\\"speed-master-lined-paper\\">\\n　先日、テレビ番組',
    paragraphFixes: [
      ['"ヘアドネーション"とは病気', '　"ヘアドネーション"とは病気'],
      ['\\nこのボランティア活動は、年齢', '\\n　このボランティア活動は、年齢'],
      ['\\n日本では1995年の阪神', '\\n　日本では1995年の阪神'],
    ]
  },
  {
    file: 'w04-d03.json',
    paragraphFixes: [
      ['\\n少し前まで', '\\n　少し前まで'],
      ['\\nデジタルカメラ', '\\n　デジタルカメラ'],
      ['\\nこのような新しい技術', '\\n　このような新しい技術'],
    ]
  },
  {
    file: 'w04-d04.json',
    paragraphFixes: [
      ['\\n私の家は駅から', '\\n　私の家は駅から'],
      ['\\nあるとき、残業', '\\n　あるとき、残業'],
    ]
  },
  {
    file: 'w04-d05.json',
    paragraphFixes: [
      ['\\n皆さんは、言葉', '\\n　皆さんは、言葉'],
      ['\\nある研究によると', '\\n　ある研究によると'],
      ['\\nそこで、自分の言いたい', '\\n　そこで、自分の言いたい'],
      ['\\n言葉を通じて', '\\n　言葉を通じて'],
    ]
  }
];

fixes.forEach(({ file, paragraphFixes }) => {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'zenkamoku_n2', file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  paragraphFixes.forEach(([from, to]) => {
    if (content.includes(from)) {
      content = content.replace(from, to);
      console.log(`  Fixed: ${from.substring(0, 30)}... in ${file}`);
    } else {
      console.warn(`  WARNING: Not found: ${from.substring(0, 30)}... in ${file}`);
    }
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved ${file}`);
});

console.log('Done');
