const https = require('https');
const fs = require('fs');

const videoIds = ['73WXbwiMBzI', 'wQpjlNfFzpo', '9k5x1WmGAjM', 'sKMsIe7_YOk', 'qD0ydhh9o10', 'OEAEM2qXxyg'];

videoIds.forEach(id => {
  const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  https.get(url, res => {
    console.log(id, 'maxres status:', res.statusCode);
  });
});
