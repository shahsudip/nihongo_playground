import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function getVocabInstruction(qId) {
    if (qId >= 1 && qId <= 8) return '問題1 ______ のことばの読み方として最もよいものを、1・2・3・4から一つえらびなさい。';
    if (qId >= 9 && qId <= 14) return '問題2 ______ のことばを漢字で書くとき、最もよいものを1・2・3・4から一つえらびなさい。';
    if (qId >= 15 && qId <= 25) return '問題3 (　　) に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。';
    if (qId >= 26 && qId <= 30) return '問題4 ______ に意味が最も近いものを、1・2・3・4から一つえらびなさい。';
    if (qId >= 31 && qId <= 35) return '問題5 次のことばの使い方として最もよいものを、一つえらびなさい。';
    return '';
}

function getGrammarInstruction(qId) {
    if (qId >= 1 && qId <= 13) return '問題1 次の文の（　　）に入れるのに最もよいものを、一つえらびなさい。';
    if (qId >= 14 && qId <= 18) return '問題2 次の文の ______★______ に入る最もよいものを、1・2・3・4から一つえらびなさい。';
    if (qId >= 19 && qId <= 23) return '問題3 つぎの文章を読んで 19 から 23 の中に入る最もよいものを、1・2・3・4から一つえらびなさい。';
    return '';
}

function parseSetQuestions(txt) {
    let gStart = txt.indexOf('\n### **文法**');
    if (gStart === -1) gStart = txt.indexOf('\n**文法**');
    if (gStart === -1) gStart = txt.indexOf('\n### 文法');
    if (gStart === -1) gStart = txt.length;
    
    let vocabTxt = txt.substring(0, gStart);
    let grammarTxt = txt.substring(gStart);
    
    function extractQ(textBlock) {
        let qs = [];
        let qMatches = Array.from(textBlock.matchAll(/(?:^|\n)(\d+)\.\s+([\s\S]*?)(?=(?:\n\d+\.\s+)|\n\*\*|###|\nAnswer|$)/g));
        
        for (let m of qMatches) {
            let qNum = parseInt(m[1]);
            let block = m[2].trim();
            
            let optionsMatch = block.match(/\n\s*(?:\*\*)?1\.\s+([\s\S]*)/);
            let qText = block;
            let optionsStr = "";
            if (optionsMatch) {
                qText = block.substring(0, optionsMatch.index).trim();
                optionsStr = block.substring(optionsMatch.index).trim(); 
            }
            
            let currentQ = {
                id: qNum,
                questionText: qText.replace(/\*\*/g, '').trim(),
                options: [],
                correctIndex: -1,
                instruction: ''
            };
            
            if (optionsStr) {
                let optRaw = optionsStr.replace(/\*\*/g, '@@');
                let matches = [...optRaw.matchAll(/(?:^|\s+|　+)(?:@@)?([1234])[\.\s]\s*(?:@@)?([\s\S]*?)(?=(?:\s+|　+)(?:@@)?[1234][\.\s]|$)/g)];
                if (matches.length > 0) {
                    currentQ.options = matches.map(m => m[2].replace(/@@/g, '').replace(/[\r\n]+/g, ' ').trim());
                } else {
                    currentQ.options = [optionsStr.replace(/\*\*/g, '').replace(/@@/g, '').replace(/[\r\n]+/g, ' ').trim()];
                }
            }
            qs.push(currentQ);
        }
        return qs;
    }
    
    let vocabQs = extractQ(vocabTxt).slice(0, 35);
    let grammarQs = extractQ(grammarTxt).slice(0, 23);
    
    // Extract passage
    let passageMatch = grammarTxt.match(/問題\s*3[^\n]*\n([\s\S]*?)(?=\n\s*\[?19\]?\.?\s)/);
    let passageText = passageMatch ? passageMatch[1].trim() : null;
    
    // Extract answers
    let ansMatches = [...txt.matchAll(/(?:Answer List|解答)[\s\S]*?(?=\nTEST|$)/gi)];
    let answers = [];
    for(let m of ansMatches) {
        let t = m[0].replace(/\*\*/g, '').replace(/TEST.*$/g, '');
        let inl = [...t.matchAll(/(?:^|\s|\n)\d+\.\s+(\d)(?=\s|$|\n|T)/g)];
        if(inl.length > 5) {
            inl.forEach(x => answers.push(parseInt(x[1])));
            continue;
        }
        let lines = t.split('\n');
        for(let l of lines) {
            let lTrim = l.trim();
            if(lTrim.match(/^\d$/)) answers.push(parseInt(lTrim));
            else if (lTrim.match(/^\d+\.\s+(\d)$/)) answers.push(parseInt(lTrim.match(/^\d+\.\s+(\d)$/)[1]));
        }
    }
    
    // Apply answers
    if (answers.length >= 58) {
        vocabQs.forEach((q, idx) => { q.correctIndex = answers[idx] - 1; });
        grammarQs.forEach((q, idx) => { q.correctIndex = answers[35 + idx] - 1; });
    } else {
        console.warn(`WARNING: Only found ${answers.length} answers!`);
    }
    
    // Apply passage to Q19-23
    if (passageText) {
        grammarQs.forEach(q => {
            if (q.id >= 19 && q.id <= 23) q.passageText = passageText;
        });
    }
    
    return { vocabQs, grammarQs };
}

async function run() {
    console.log('Fetching from Firebase...');
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();

    for (let i = 11; i <= 15; i++) {
        console.log(`Building Set ${i}...`);
        let txt = readFileSync(`set${i}_raw.txt`, 'utf8');
        let { vocabQs, grammarQs } = parseSetQuestions(txt);
        
        let s = data.sets[i - 1]; // Firebase array is 0-indexed
        
        // Rebuild sections
        s.sections['vocabulary-kanji'].questions = vocabQs;
        s.sections['grammar-reading'].questions = grammarQs;
        
        // Global ID and Ruby tags
        let globalId = i * 1000;
        
        // Vocab
        s.sections['vocabulary-kanji'].questions.forEach((q, idx) => {
            q.id = globalId++;
            q.instruction = getVocabInstruction(idx + 1);
            q.sectionType = 'vocabulary-kanji';
            
            if (q.correctIndex !== -1 && q.options[q.correctIndex]) {
                let optText = q.options[q.correctIndex].replace(/<[^>]*>/g, '').trim();
                // Q1-8
                if (idx >= 0 && idx <= 7) {
                    let kanjiMatch = q.questionText.match(/(?:<u>)?([一-龯]+)(?:<\/u>)?/); // Find kanji since underlining might be lost
                    if (q.questionText.includes('<u>')) kanjiMatch = q.questionText.match(/<u>(.*?)<\/u>/);
                    
                    if (kanjiMatch && kanjiMatch[1] && !kanjiMatch[1].includes('<ruby>')) {
                        let kanji = kanjiMatch[1];
                        if (q.questionText.includes(`<u>${kanji}</u>`)) {
                            q.questionText = q.questionText.replace(`<u>${kanji}</u>`, `<u><ruby>${kanji}<rt>${optText}</rt></ruby></u>`);
                        } else {
                            q.questionText = q.questionText.replace(kanji, `<u><ruby>${kanji}<rt>${optText}</rt></ruby></u>`);
                        }
                    }
                }
                // Q9-14
                else if (idx >= 8 && idx <= 13) {
                    let hiraMatch = q.questionText.match(/<u>(.*?)<\/u>/);
                    if (hiraMatch && hiraMatch[1] && !hiraMatch[1].includes('<ruby>')) {
                        let hiragana = hiraMatch[1];
                        q.questionText = q.questionText.replace(`<u>${hiragana}</u>`, `<u><ruby>${optText}<rt>${hiragana}</rt></ruby></u>`);
                        q.options[q.correctIndex] = `<ruby>${optText}<rt>${hiragana}</rt></ruby>`;
                    }
                }
            }
        });
        
        // Grammar
        s.sections['grammar-reading'].questions.forEach((q, idx) => {
            q.id = globalId++;
            q.instruction = getGrammarInstruction(idx + 1);
            q.sectionType = 'grammar-reading';
        });
    }
    
    console.log('Pushing to Firebase...');
    await docRef.set(data);
    console.log('SUCCESS!');
    process.exit(0);
}
run();
