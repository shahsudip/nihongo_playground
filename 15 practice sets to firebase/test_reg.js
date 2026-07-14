let text = "\n<strong>     1. つんで　2. ならんで　3. つつんで　4. しずんで</strong>\n";
const reg = /(?:<strong>)?\s*1[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*2[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*3[.)](?:<\/strong>)?\s+(.+?)[　\s]+(?:<strong>)?\s*4[.)](?:<\/strong>)?\s+(.+?)(?=\n|<\/strong>)/g;
text = text.replace(reg, '1 $1\n2 $2\n3 $3\n4 $4\n');
console.log(text);
