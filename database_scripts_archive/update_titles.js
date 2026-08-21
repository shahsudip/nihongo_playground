import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const titles = {
  "topic_01": "Topic 1: 食事",
  "topic_02": "Topic 2: 家事",
  "topic_03": "Topic 3: 買い物",
  "topic_04": "Topic 4: ファッション",
  "topic_05": "Topic 5: テクノロジー",
  "topic_06": "Topic 6: 流行",
  "topic_07": "Topic 7: 趣味",
  "topic_08": "Topic 8: 言語",
  "topic_09": "Topic 9: 人間関係",
  "topic_10": "Topic 10: 年中行事・文化",
  "topic_11": "Topic 11: スポーツ",
  "topic_12": "Topic 12: 動物",
  "topic_13": "Topic 13: 住",
  "topic_14": "Topic 14: 町"
};

async function update() {
  try {
    for (const [id, title] of Object.entries(titles)) {
      await db.collection('books').doc('tango_n1').collection('topics').doc(id).set({
        id: id,
        title: title
      }, { merge: true });
      console.log(`Updated ${id} to ${title}`);
    }
    console.log("All titles updated successfully!");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
update();
