const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'nihongo power drill', 'power_drill_grammar_data.json');

const newBatch = [
  {
    "id": "grammar-drill-19",
    "title": "第19回",
    "type": "drill",
    "pages": [
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0048.jpg",
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0049.jpg"
    ]
  },
  {
    "id": "grammar-drill-20",
    "title": "第20回",
    "type": "drill",
    "pages": [
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0050.jpg",
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0051.jpg"
    ]
  },
  {
    "id": "grammar-training-7",
    "title": "集中トレーニング ⑦",
    "type": "training",
    "pages": [
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0052.jpg"
    ]
  },
  {
    "id": "grammar-training-8",
    "title": "集中トレーニング ⑧",
    "type": "training",
    "pages": [
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0053.jpg"
    ]
  },
  {
    "id": "grammar-drill-21",
    "title": "第21回",
    "type": "drill",
    "pages": [
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0054.jpg",
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0055.jpg"
    ]
  },
  {
    "id": "grammar-drill-22",
    "title": "第22回",
    "type": "drill",
    "pages": [
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0056.jpg",
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0057.jpg"
    ]
  },
  {
    "id": "grammar-drill-23",
    "title": "第23回",
    "type": "drill",
    "pages": [
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0058.jpg",
      "weeblibrary.wordpress.com_Nihongo_Power_Drill_N3_Moji_Goi/Power drill/N3 grammar/N3_grammar_page-0059.jpg"
    ]
  }
];

try {
  let rawdata = fs.readFileSync(dataFile, 'utf8');
  let grammarBook = JSON.parse(rawdata);
  let chapters = grammarBook.chapters || [];

  const existingIds = new Set(chapters.map(c => c.id));
  
  for (const item of newBatch) {
    if (!existingIds.has(item.id)) {
      chapters.push(item);
      console.log(`Added: ${item.id}`);
    } else {
      console.log(`Already exists: ${item.id}`);
    }
  }

  // Sort: drills first, then trainings, each sorted by their number
  chapters.sort((a, b) => {
    let matchA = a.id.match(/(drill|training)-(\d+)/);
    let matchB = b.id.match(/(drill|training)-(\d+)/);
    
    if (matchA && matchB) {
      let typeA = matchA[1] === 'drill' ? 0 : 1;
      let typeB = matchB[1] === 'drill' ? 0 : 1;
      if (typeA !== typeB) return typeA - typeB;
      return parseInt(matchA[2]) - parseInt(matchB[2]);
    }
    return 0;
  });

  grammarBook.chapters = chapters;
  
  fs.writeFileSync(dataFile, JSON.stringify(grammarBook, null, 2), 'utf8');
  console.log('Successfully updated power_drill_grammar_data.json');
} catch (error) {
  console.error('Error:', error);
}
