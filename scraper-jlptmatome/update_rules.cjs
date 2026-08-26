const { initializeApp, cert } = require('firebase-admin/app');
const { getSecurityRules } = require('firebase-admin/security-rules');
const serviceAccount = require('../scraper-test/service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

async function updateRules() {
  const securityRules = getSecurityRules();
  
  try {
    // Get current rules
    const ruleset = await securityRules.getFirestoreRuleset();
    console.log("Current rules fetched.");
    
    // We just want to ensure JLPT-matome is readable. 
    // We'll write a basic rule block if we can't easily parse and modify the existing one.
    // Actually, Firebase Admin SDK can only set the entire ruleset. 
    // We should try to read the source, append our rule before the final closing brace, and set it.
    
    let source = ruleset.source[0].content;
    
    if (source.includes('JLPT-matome')) {
        console.log("Rules already contain JLPT-matome.");
        return;
    }

    // Find the last closing brace and insert our rule right before it
    const lastBraceIndex = source.lastIndexOf('}');
    if (lastBraceIndex === -1) {
        throw new Error("Could not parse existing rules.");
    }
    
    const newRule = `
    match /JLPT-matome/{document=**} {
      allow read: if true;
    }
`;
    
    const newSource = source.slice(0, lastBraceIndex) + newRule + source.slice(lastBraceIndex);
    
    // Create new ruleset
    const newRuleset = await securityRules.createRuleset({ name: 'firestore.rules', content: newSource });
    
    // Deploy it
    await securityRules.releaseFirestoreRuleset(newRuleset.name);
    
    console.log("Successfully updated and released new Firestore rules!");
  } catch (error) {
    console.error("Error updating rules:", error);
  }
}

updateRules();
