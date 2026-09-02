import fs from 'fs';
import path from 'path';

const bookDataPath = path.resolve('src/data/book_data.jsx');

// Read files
let bookData = fs.readFileSync(bookDataPath, 'utf8');

const newChapterString = `
      {
        "id": "week1-day1",
        "title": "Week 1 Day 1: 案内① (Notices 1)",
        "type": "short-passage",
        "description": "Try to read dates and times correctly!",
        "passages": []
      }`;

// Inject into book_data.jsx
const bookIdIndex = bookData.indexOf('"id": "sou-matome-n3-reading"');
if (bookIdIndex !== -1) {
    const chaptersIndex = bookData.indexOf('"chapters": [', bookIdIndex);
    if (chaptersIndex !== -1) {
        const insertPosition = chaptersIndex + '"chapters": ['.length;
        
        // Insert the new chapter string right after the array starts
        const updatedBookData = bookData.slice(0, insertPosition) + 
            newChapterString + "," + 
            bookData.slice(insertPosition);
            
        fs.writeFileSync(bookDataPath, updatedBookData, 'utf8');
        console.log("Successfully added Week 1 Day 1 list item to book_data.jsx!");
    }
}
