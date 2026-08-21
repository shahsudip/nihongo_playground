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

async function checkTangoN1() {
  try {
    console.log('=== Checking tango_n1 topics in Firestore ===\n');

    const topicsSnap = await db.collection('books').doc('tango_n1').collection('topics').get();
    console.log(`Total topics found: ${topicsSnap.size}\n`);

    const issues = [];

    for (const topicDoc of topicsSnap.docs) {
      const topicId = topicDoc.id;
      const topicData = topicDoc.data();

      // Check for missing fields on topic itself
      const missingTopicFields = [];
      if (!topicData.title) missingTopicFields.push('title');
      if (!topicData.id) missingTopicFields.push('id');

      const storiesSnap = await db
        .collection('books').doc('tango_n1')
        .collection('topics').doc(topicId)
        .collection('stories').get();

      const storyCount = storiesSnap.size;
      const corruptedStories = [];

      for (const storyDoc of storiesSnap.docs) {
        const s = storyDoc.data();
        const missing = [];
        if (!s.japanese_text)       missing.push('japanese_text');
        if (!s.english_translation) missing.push('english_translation');
        if (!s.title)               missing.push('title');
        if (!Array.isArray(s.annotated_words)) missing.push('annotated_words');
        else if (s.annotated_words.length === 0) missing.push('annotated_words(empty)');

        if (missing.length > 0) {
          corruptedStories.push({ storyId: storyDoc.id, missing });
        }
      }

      const status = corruptedStories.length > 0 || missingTopicFields.length > 0 ? '⚠️  ISSUE' : '✅ OK';
      console.log(`${status} | ${topicId.padEnd(12)} | ${(topicData.title || '(no title)').padEnd(30)} | stories: ${storyCount}`);

      if (missingTopicFields.length > 0) {
        console.log(`         Missing topic fields: ${missingTopicFields.join(', ')}`);
        issues.push({ topicId, type: 'topic_fields', missing: missingTopicFields });
      }
      if (corruptedStories.length > 0) {
        for (const cs of corruptedStories) {
          console.log(`         Story ${cs.storyId}: missing [${cs.missing.join(', ')}]`);
        }
        issues.push({ topicId, type: 'story_data', corruptedStories });
      }
    }

    console.log('\n=== Summary ===');
    if (issues.length === 0) {
      console.log('✅ No corrupted topics or stories found!');
    } else {
      console.log(`⚠️  Found ${issues.length} topic(s) with issues:`);
      for (const issue of issues) {
        console.log(`  - ${issue.topicId} (${issue.type})`);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkTangoN1();
