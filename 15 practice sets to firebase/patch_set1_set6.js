import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./scraper-test/service-account.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function run() {
    console.log('Fetching from Firebase...');
    const docRef = db.collection('books').doc('jlpt-n3-practice-sets');
    const docSnap = await docRef.get();
    const data = docSnap.data();

    // Fix Set 1
    console.log('Fixing Set 1...');
    let set1 = data.sets[0];
    let g1 = set1.sections['grammar-reading'].questions;
    
    // Q14 Fix
    g1[13].questionText = '池田「では明日、午前11時に駅前で会いましょう。」\n大木「午前中は用があるので、__________ __________ ★ __________ 。」';
    g1[13].options = ['いただけませんか', '午後に', 'して', '待ち合わせは'];
    
    // Q23 Option 4 Fix
    if (g1[22].options[3].includes('問題')) {
        g1[22].options[3] = 'すぐに決められなかっただろう';
    }
    
    // Q19-23 Passage Fix
    let txt1 = readFileSync('set1_raw.txt', 'utf8');
    let gStart1 = txt1.indexOf('文法');
    let m1 = txt1.substring(gStart1).match(/問題\s*3[^\n]*\n([\s\S]*?)(?=\n\s*19\.\s)/);
    if (m1) {
        let passage1 = m1[1].trim();
        for(let i=18; i<=22; i++) {
            g1[i].passageText = passage1;
        }
    }
    
    // Fix Set 6
    console.log('Fixing Set 6...');
    let set6 = data.sets[5];
    let g6 = set6.sections['grammar-reading'].questions;
    
    let passage6 = `「初めての銭湯」
ピエール・マルタン
あなたは、日本のお風呂といえば何を考えますか。温泉でしょうか、露天風呂でしょうか。いろいろありますが、私の場合は「銭湯」です。
私の故郷には、毎日お風呂に入るという習慣はありません。[ 19 ]、日本へ来たばかりのときは、日本人が毎日お風呂に入るということを知って、とても驚きました。
家にお風呂がある人は、家にお風呂に毎日入りますし、家にお風呂がない場合も、毎日のように家の近所にある「銭湯」に行きます。[ 20 ]習慣を持っている民族は、広い世界の中でもあまりないと思います。
初めて銭湯に行ったときに、驚いたことがたくさんありました。[ 21-a ]、建物がお寺や神社のようなとても古い建物だったこと。第二に、入口が「男湯」と「女湯」に分かれていたこと。第三に、ほかの人の前で服を全部脱いでお風呂に入らなければならなかったこと。[ 21-b ]、お風呂のお湯の温度がとても高かったことです。
しかし、今では日本の銭湯にも[ 22 ]。なにも気にせずに熱いお湯にゆっくり入れるようになりました。私もかなり「日本人」に近づいてきたという[ 23 ]。`;

    for(let i=18; i<=22; i++) {
        g6[i].passageText = passage6;
    }
    
    console.log('Pushing to Firebase...');
    await docRef.set(data);
    console.log('SUCCESS!');
    process.exit(0);
}
run();
