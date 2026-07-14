const fs = require('fs');

const scrapedFile = 'scraper-test/jlpt_n3_201007_vocab.json';
const dataFile = 'src/data/practice_sets_data.js';

const scrapedData = JSON.parse(fs.readFileSync(scrapedFile, 'utf8'));

let newQuestions = [];
let qId = 775; // the last set had up to 774
scrapedData.forEach((q, index) => {
  let correctIndex = q.options.findIndex(o => o.isCorrect);
  if (correctIndex === -1) correctIndex = 0; // fallback
  
  newQuestions.push({
    id: qId++,
    questionText: q.question,
    options: q.options.map(o => o.text),
    correctIndex: correctIndex,
    sectionType: "vocabulary-kanji"
  });
});

const newSet = {
  id: "set-16",
  title: "Set 16 (N3 201007 Vocabulary)",
  description: "Authentic past exam questions scraped from jlptpracticetest.com",
  sections: {
    "vocabulary-kanji": {
      title: "Vocabulary & Kanji",
      titleJa: "文字・語彙",
      questions: newQuestions
    }
  }
};

let jsContent = fs.readFileSync(dataFile, 'utf8');

// Find the last set in the array and append
// The sets array ends near the end of the file. Let's find the end of the sets array.
// It ends with:
//         }
//       }
//     }
//   ]
// };

const insertionPoint = jsContent.lastIndexOf('    }\n  ]\n};');
if (insertionPoint !== -1) {
  // We need to inject a comma after the last set, then the new set string
  // Let's find the precise closing brace of the last set
  const lastSetEnd = jsContent.lastIndexOf('    }', insertionPoint);
  
  const formattedNewSet = JSON.stringify(newSet, null, 6)
      .replace(/\n/g, '\n    ') // proper indentation
      .replace(/"([^"]+)":/g, '$1:'); // optionally remove quotes from keys for js object look, but valid JSON is fine too
      
  const newContent = jsContent.substring(0, lastSetEnd + 5) + ',\n    ' + JSON.stringify(newSet, null, 4).replace(/\n/g, '\n    ') + '\n' + jsContent.substring(insertionPoint + 5);
  
  // also update totalQuestions
  const newContent2 = newContent.replace(/totalQuestions: \d+,/, `totalQuestions: ${qId - 1},`);
  
  fs.writeFileSync(dataFile, newContent2);
  console.log("Successfully injected Set 16!");
} else {
  console.log("Failed to find insertion point.");
}
