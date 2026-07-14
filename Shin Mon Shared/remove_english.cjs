const fs = require('fs');
let data = fs.readFileSync('src/data/book_data.jsx', 'utf8');

// The English text looks like "(It is now 9:45...)" and "(Which of the following...)" and "(The person who wrote...)"
data = data.replace(/\(It is now 9:45, and you want to make 40 copies of A3 size for a 10:00 meeting. What is the best thing to do to get the copies in time\?\)/g, '');
data = data.replace(/\(Which of the following is the correct order for making Oyakodon\?\)/g, '');
data = data.replace(/\(The person who wrote this passage says you should not put on makeup in the train. What is the reason\?\)/g, '');

fs.writeFileSync('src/data/book_data.jsx', data);
console.log("English text removed from questions!");
