const admin = require('firebase-admin');

// Initialize Firebase Admin (assuming default credentials from environment)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function deleteChapters() {
  try {
    console.log("Deleting 'chapters' subcollection from tango_n1...");
    
    // In our case, we only created 'topic_01' inside 'chapters', so we can just delete it
    // If there was a 'stories' subcollection inside it, we'd delete that too
    
    // 1. Delete the stories subcollection inside chapters
    await db.collection('books').doc('tango_n1')
            .collection('chapters').doc('topic_01')
            .collection('stories').doc('story_1')
            .delete();
            
    // 2. Delete the topic_01 document inside chapters
    await db.collection('books').doc('tango_n1')
            .collection('chapters').doc('topic_01')
            .delete();

    console.log("Successfully deleted 'chapters' collection artifacts from tango_n1!");
  } catch (err) {
    console.error("Error deleting chapters:", err);
  }
}

deleteChapters();
