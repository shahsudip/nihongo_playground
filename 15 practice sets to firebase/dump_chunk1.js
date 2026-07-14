import mammoth from 'mammoth';
import { writeFileSync } from 'fs';

async function run() {
    const { value: html } = await mammoth.convertToHtml({ path: '15 sets of question.docx' });
    let text = html;
    text = text.replace(/<\/?(p|h[1-6]|div|br|li|ul|ol|table|tr|td|th)[^>]*>/gi, '\n');
    text = text.replace(/<(?!u|\/u|strong|\/strong)[^>]+>/g, '');
    text = text.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/<u>/g, '').replace(/<\/u>/g, '');
    
    writeFileSync('chunk1.txt', text.substring(0, 5000));
    console.log('done');
}
run();
