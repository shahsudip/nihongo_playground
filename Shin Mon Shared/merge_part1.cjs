const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../src/data/shinkanzen_reading');

// We are merging mondai-1 to mondai-13 into part-1.json
let passages = [];

for (let i = 1; i <= 13; i++) {
  const filePath = path.join(DIR, `mondai-${i}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    passages.push({
      mondaiNumber: data.mondaiNumber,
      title: data.title,
      mondaiHeader: data.mondaiHeader,
      passageText: data.passageText,
      passageLayout: data.passageLayout,
      passageNotes: data.passageNotes,
      imageSrc: data.imageSrc,
      questions: data.questions
    });
    // Delete the old individual file
    fs.unlinkSync(filePath);
  }
}

const part1Data = {
  bookId: "shinkanzen-master-n3-reading",
  chapterId: "part-1",
  part: 1,
  partTitle: "第1部：内容理解（短文）",
  partTitleEn: "Short Passage Comprehension",
  title: "第1部：内容理解（短文）",
  passages: passages
};

fs.writeFileSync(path.join(DIR, 'part-1.json'), JSON.stringify(part1Data, null, 2));
console.log('Successfully merged mondai-1 to 13 into part-1.json!');
