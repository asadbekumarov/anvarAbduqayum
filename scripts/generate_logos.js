const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const partners = [
  { id: 'toy_bola', name: 'TOY BOLA', sub: 'TOYS &amp; FACTORY' },
  { id: 'uzbic', name: 'UZBIC', sub: 'BUSINESS COMMUNITY' },
  { id: 'afiyet', name: 'AFİYET', sub: 'RESTAURANT GROUP' },
  { id: 'puro', name: 'PURO', sub: 'PREMIUM LOUNGE' },
  { id: 'atla_plast', name: 'ATA PLAST', sub: 'PACKAGING CORP' },
  { id: 'eputy', name: 'EPUTY', sub: 'TEXTILE &amp; APPAREL' },
  { id: 'tekhno', name: 'TEXNO DUNYOSI', sub: 'INDUSTRIAL TECH' },
  { id: 'logistika', name: 'SILK ROAD', sub: 'CARGO &amp; LOGISTICS' },
  { id: 'way', name: 'GLOBAL EXPORT', sub: 'TRADE &amp; COMMERCE' },
  { id: 'mir', name: 'ZAMON', sub: 'DISTRIBUTION HUB' },
  { id: 'nafis', name: 'SANOAT', sub: 'HOLDING GROUP' },
];

const partnersDir = path.join(__dirname, '../public/images/partners');

async function generateLogos() {
  for (const p of partners) {
    const svg = `
    <svg width="280" height="96" viewBox="0 0 280 96" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="none" />
      <g fill="#FFFFFF" fill-opacity="0.88">
        <text x="140" y="44" font-family="Arial, sans-serif" font-size="19" font-weight="bold" letter-spacing="3" text-anchor="middle">${p.name}</text>
        <text x="140" y="62" font-family="Courier, monospace" font-size="9" font-weight="bold" letter-spacing="2" text-anchor="middle" fill="#D4AF37" fill-opacity="0.95">${p.sub}</text>
      </g>
    </svg>
    `;

    const outPath = path.join(partnersDir, `${p.id}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 95 })
      .toFile(outPath);
    console.log('Created logo:', p.id);
  }
}

generateLogos().catch(console.error);
