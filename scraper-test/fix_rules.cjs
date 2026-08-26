const { initializeApp, cert } = require('firebase-admin/app');
const { getSecurityRules } = require('firebase-admin/security-rules');
const serviceAccount = require('./service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

async function updateRules() {
  const securityRules = getSecurityRules();
  
  try {
    const ruleset = await securityRules.getFirestoreRuleset();
    let source = ruleset.source[0].content;
    
    // Remove the bad rule I added previously
    source = source.replace(/match \/JLPT-matome\/\{document=\*\*\} \{\s*allow read: if true;\s*\}/, '');
    
    // Insert inside the databases match block
    const injectionPoint = "match /practice-test/{document=**} {\n          allow read, write: if request.auth != null;\n        }";
    
    const newRule = `
        match /JLPT-matome/{document=**} {
          allow read: if true;
        }
`;
    
    const newSource = source.replace(injectionPoint, injectionPoint + newRule);
    
    const newRuleset = await securityRules.createRuleset({ name: 'firestore.rules', content: newSource });
    await securityRules.releaseFirestoreRuleset(newRuleset.name);
    console.log("Successfully updated rules!");
  } catch (error) {
    console.error("Error updating rules:", error);
  }
}

updateRules();
