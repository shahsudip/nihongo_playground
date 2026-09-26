const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccountPath = path.join(__dirname, 'scraper-test', 'service-account.json');
initializeApp({ credential: cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))) });
const db = getFirestore();

const topicTitles = {
  "topic_01": "Topic 1 食事 Eating",
  "topic_02": "Topic 2 料理 Cooking",
  "topic_03": "Topic 3 買い物 Shopping",
  "topic_04": "Topic 4 生活 Daily Life",
  "topic_05": "Topic 5 家 House & Home",
  "topic_06": "Topic 6 健康 Health",
  "topic_07": "Topic 7 交通 Transport",
  "topic_08": "Topic 8 人の性格 People",
  "topic_09": "Topic 9 コミュニケーション Communication",
  "topic_10": "Topic 10 町 Cities"
};

async function run() {
  console.log("Updating topic titles...");
  for (const [topicId, title] of Object.entries(topicTitles)) {
    await db.collection('books').doc('tango_n3')
      .collection('topics').doc(topicId)
      .set({ title: title, id: topicId }, { merge: true });
    console.log(`Updated ${topicId} to ${title}`);
  }
  console.log("All titles updated!");
}

run().catch(console.error);
