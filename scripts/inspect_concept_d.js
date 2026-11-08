const fs = require('fs');
const html = fs.readFileSync('public/concept-d.html', 'utf8');
const mediaIdx = html.indexOf('@media');
let curr = mediaIdx;
while (curr !== -1) {
  const snippet = html.substring(curr, curr + 800);
  if (snippet.includes('dossier')) {
    console.log(snippet);
  }
  curr = html.indexOf('@media', curr + 1);
}
