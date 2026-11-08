const https = require('https');

const url = 'https://www.spot.uz/uz/2022/11/17/anvar-abduqayum/';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi) || [];
    const unique = [...new Set(matches)].filter(img => /spot|upload|anvar|media/i.test(img));
    console.log(JSON.stringify(unique, null, 2));
  });
}).on('error', err => console.error(err));
