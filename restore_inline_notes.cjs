const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function restoreInlineNotes() {
  console.log("Restoring inline note markers as <sub>...");
  let originalData = fs.readFileSync('original_for_notes.jsx', 'utf8');
  let currentData = fs.readFileSync('src/data/book_data.jsx', 'utf8');
  
  const origMatch = originalData.match(/export const sampleBooks = (\[.*\]);/s);
  const curMatch = currentData.match(/export const sampleBooks = (\[.*\]);/s);
  
  if (origMatch && curMatch) {
    let origBooks = eval(origMatch[1]);
    let curBooks = eval(curMatch[1]);
    
    let origSkm = origBooks.find(b => b.id === 'shinkanzen-master-n3-reading');
    let curSkm = curBooks.find(b => b.id === 'shinkanzen-master-n3-reading');
    
    let changedChapters = new Set();

    curSkm.chapters.forEach(c => {
      c.passages.forEach(curP => {
        // Find corresponding original passage
        let origP = origSkm.chapters.flatMap(ch => ch.passages).find(p => p.title.includes(curP.title.replace(/第.部 /, '')));
        if (!origP && curP.title.includes('問題2')) origP = origSkm.chapters.flatMap(ch => ch.passages).find(p => p.title.includes('問題2'));
        
        if (origP && origP.passageText) {
          // Find all note markers in original passageText
          let regex = /(.{0,10})([(（]注\d+[)）])(.{0,10})/g;
          let match;
          while ((match = regex.exec(origP.passageText)) !== null) {
            let before = match[1].replace(/[(（]注\d+[)）]/g, '');
            let note = match[2];
            let after = match[3].replace(/[(（]注\d+[)）]/g, '');
            
            // Clean up regex characters
            let searchBefore = before.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let searchAfter = after.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Look for this context in current passage text
            let curRegex = new RegExp(`(${searchBefore})(${searchAfter})`);
            if (curRegex.test(curP.passageText)) {
              let styledNote = `<sup class="text-xs text-gray-500 font-normal">${note}</sup>`;
              curP.passageText = curP.passageText.replace(curRegex, `$1${styledNote}$2`);
              changedChapters.add(c);
              console.log(`Restored ${note} in: ${curP.title}`);
            }
          }
        }
      });
    });

    // Manually fix the ones that were swallowed and re-attached by me, since they weren't in the original text in the correct place!
    const manualFixes = [
      {
        title: "問題2",
        find: "引き取りや展示",
        replace: '引き取り<sup class="text-xs text-gray-500 font-normal">(注1)</sup>や展示'
      },
      {
        title: "問題4",
        find: "上司から",
        replace: '上司<sup class="text-xs text-gray-500 font-normal">(注1)</sup>から'
      },
      {
        title: "問題4",
        find: "目に浮かぶ。",
        replace: '目に浮かぶ<sup class="text-xs text-gray-500 font-normal">(注2)</sup>。'
      },
      {
        title: "問題5",
        find: "したってくる",
        replace: 'したって<sup class="text-xs text-gray-500 font-normal">(注1)</sup>くる'
      },
      {
        title: "問題8",
        find: "取り組めば、",
        replace: '取り組めば<sup class="text-xs text-gray-500 font-normal">(注3)</sup>、'
      }
    ];

    manualFixes.forEach(fix => {
      let c = curSkm.chapters.find(ch => ch.passages.some(p => p.title.includes(fix.title)));
      if (c) {
        let p = c.passages.find(p => p.title.includes(fix.title));
        if (p && p.passageText.includes(fix.find) && !p.passageText.includes(fix.replace)) {
          p.passageText = p.passageText.replace(fix.find, fix.replace);
          changedChapters.add(c);
          console.log(`Manually restored note in: ${p.title}`);
        }
      }
    });

    if (changedChapters.size > 0) {
      const serialized = JSON.stringify(curBooks, null, 2);
      fs.writeFileSync('src/data/book_data.jsx', currentData.replace(curMatch[1], serialized));
      console.log('Fixed book_data.jsx locally.');

      const bookDocRef = db.collection('books').doc(curSkm.id);
      for (const c of changedChapters) {
        const chapterDocRef = bookDocRef.collection('chapters').doc(c.id);
        await chapterDocRef.update({ passages: c.passages });
        console.log(`Pushed fix to Firebase for chapter ${c.id}`);
      }
    } else {
      console.log("No notes restored.");
    }
  }
}

restoreInlineNotes();
