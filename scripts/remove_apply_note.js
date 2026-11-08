const fs = require('fs');

let content = fs.readFileSync('src/config/content.ts', 'utf8');

// Update interface if present
content = content.replace('      applyNote: string;\n', '');

// Remove applyNote from uz
content = content.replace(/ +applyNote: "Arizalar navbat asosida qabul qilinadi",\r?\n/, '');

// Remove applyNote from ru
content = content.replace(/ +applyNote: "Заявки принимаются в порядке очереди",\r?\n/, '');

// Remove applyNote from en
content = content.replace(/ +applyNote: "Inquiries processed on a rolling basis",\r?\n/, '');

fs.writeFileSync('src/config/content.ts', content, 'utf8');
console.log('Successfully removed applyNote from content.ts');

