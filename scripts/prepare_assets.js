const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
const path = require('path');

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
  });
}

async function prepareAssets() {
  console.log('Downloading YouTube HD portraits...');
  
  // 1. Hero Portrait from Anvar Abduqayum interview video (73WXbwiMBzI or wQpjlNfFzpo)
  const heroBuffer = await downloadBuffer('https://img.youtube.com/vi/73WXbwiMBzI/maxresdefault.jpg');
  const expertBuffer = await downloadBuffer('https://img.youtube.com/vi/wQpjlNfFzpo/maxresdefault.jpg');

  const heroPath = path.join(__dirname, '../public/images/hero/portrait.webp');
  const expertPath = path.join(__dirname, '../public/images/expert/portrait.webp');
  const bookCoverPath = path.join(__dirname, '../public/images/book/cover.jpg');

  // Hero portrait: crop focused on portrait area, 900x1100 WebP
  await sharp(heroBuffer)
    .resize(900, 1100, {
      fit: 'cover',
      position: 'center'
    })
    .modulate({
      brightness: 1.02,
      saturation: 1.05
    })
    .webp({ quality: 92 })
    .toFile(heroPath);
  console.log('Hero portrait generated at', heroPath);

  // Expert portrait: crop focused on portrait area, 800x1000 WebP
  await sharp(expertBuffer)
    .resize(800, 1000, {
      fit: 'cover',
      position: 'center'
    })
    .modulate({
      brightness: 1.0,
      saturation: 1.05
    })
    .webp({ quality: 92 })
    .toFile(expertPath);
  console.log('Expert portrait generated at', expertPath);

  // 3. Book Cover: "TADBIRKORLIKNING YOZILMAGAN QONUNLARI" luxury gold on obsidian 3D design (700x900 JPEG)
  const bookSvg = `
  <svg width="700" height="900" viewBox="0 0 700 900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#141414" />
        <stop offset="50%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#050505" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F3E5AB" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#AA7C11" />
      </linearGradient>
      <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2a2a2a" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
    </defs>

    <!-- Main Background -->
    <rect width="700" height="900" fill="url(#bgGrad)" />

    <!-- Spine shadow effect -->
    <rect x="0" y="0" width="35" height="900" fill="url(#spineGrad)" opacity="0.8" />
    <line x1="35" y1="0" x2="35" y2="900" stroke="#D4AF37" stroke-width="1.5" stroke-opacity="0.3" />

    <!-- Luxury Gold Border Frame -->
    <rect x="55" y="45" width="590" height="810" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.6" />
    <rect x="65" y="55" width="570" height="790" fill="none" stroke="#D4AF37" stroke-width="0.7" opacity="0.3" />

    <!-- Corner Accents -->
    <path d="M55 75 L75 55 M645 75 L625 55 M55 825 L75 845 M645 825 L625 845" stroke="url(#goldGrad)" stroke-width="1.5" />

    <!-- Top Badge -->
    <rect x="230" y="100" width="240" height="32" rx="4" fill="#1A1A1A" stroke="url(#goldGrad)" stroke-width="1" />
    <text x="350" y="121" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" letter-spacing="4" fill="#D4AF37" text-anchor="middle">MUALLIFLIK NASHRI</text>

    <!-- Author Name -->
    <text x="350" y="210" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="6" fill="#FFFFFF" text-anchor="middle">ANVAR ABDUQAYUM</text>
    <text x="350" y="235" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="3" fill="#D4AF37" text-anchor="middle">20+ YILLIK AMALIYOTCHI TADBIRKOR</text>

    <line x1="220" y1="270" x2="480" y2="270" stroke="url(#goldGrad)" stroke-width="1.5" />

    <!-- Book Title -->
    <text x="350" y="380" font-family="Arial, sans-serif" font-size="34" font-weight="900" letter-spacing="2" fill="#FFFFFF" text-anchor="middle">TADBIRKORLIKNING</text>
    <text x="350" y="435" font-family="Arial, sans-serif" font-size="36" font-weight="900" letter-spacing="3" fill="url(#goldGrad)" text-anchor="middle">YOZILMAGAN</text>
    <text x="350" y="490" font-family="Arial, sans-serif" font-size="38" font-weight="900" letter-spacing="4" fill="#FFFFFF" text-anchor="middle">QONUNLARI</text>

    <!-- Subtitle / Focus -->
    <text x="350" y="560" font-family="Georgia, serif" font-size="18" font-style="italic" fill="#E0E0E0" text-anchor="middle">Kichik savdodan — yirik zavodlar va eksportgacha</text>

    <!-- Geometric Center Emblem -->
    <circle cx="350" cy="650" r="45" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.5" />
    <circle cx="350" cy="650" r="38" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.3" />
    <text x="350" y="658" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">AA</text>

    <!-- Bottom Features Checklist -->
    <text x="350" y="750" font-family="Arial, sans-serif" font-size="13" letter-spacing="2" fill="#B0B0B0" text-anchor="middle">7 TA ASOSIY XATO · REGLAMENTLAR · MOLIYAVIY NAZORAT</text>
    <text x="350" y="775" font-family="'JetBrains Mono', monospace" font-size="11" letter-spacing="3" fill="#D4AF37" text-anchor="middle">«TOY BOLA» &amp; UZBIC EKOTIZIMI TAJRIBASI</text>
  </svg>
  `;

  await sharp(Buffer.from(bookSvg))
    .jpeg({ quality: 95 })
    .toFile(bookCoverPath);
  console.log('Book cover generated at', bookCoverPath);
}

prepareAssets().catch(console.error);

