const fs = require('fs');
const content = fs.readFileSync('src/config/content.ts', 'utf8');

const uzIdx = content.indexOf('uz: {');
const ruIdx = content.indexOf('ru: {');
const enIdx = content.indexOf('en: {');

console.log('Indices:', { uzIdx, ruIdx, enIdx });

function getDossier(sub) {
  const dIdx = sub.indexOf('dossier: {');
  if (dIdx === -1) return 'NO DOSSIER';
  const endIdx = sub.indexOf('portfolio: {', dIdx);
  return sub.substring(dIdx, endIdx);
}

console.log('--- UZ DOSSIER SNIPPET ---');
console.log(getDossier(content.substring(uzIdx, ruIdx)).slice(0, 200));

console.log('--- RU DOSSIER SNIPPET ---');
console.log(getDossier(content.substring(ruIdx, enIdx)).slice(0, 200));

console.log('--- EN DOSSIER SNIPPET ---');
console.log(getDossier(content.substring(enIdx)).slice(0, 200));

