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
    
    // Insert inside the databases match block
    const injectionPoint = "match /JLPT-matome/{document=**} {\n          allow read: if true;\n        }";
    
    const newRule = `
        match /jlpt/{document=**} {
          allow read: if request.auth != null;
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
