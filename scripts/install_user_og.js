const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function installUploadedOg() {
  const src = 'C:/Users/VICTUS/.gemini/antigravity/brain/86be693b-b8e1-4185-885c-0e8b57e8aa2b/.user_uploaded/media_1795244648762_77f4e43a.jpg';

  // Standart Open Graph o'lchami: 1200 x 630
  const jpgBuffer = await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const pngBuffer = await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .png({ quality: 95 })
    .toBuffer();

  const jpgTargets = [
    'public/images/brand/og-image.jpg',
    'public/og-image.jpg',
    'src/app/opengraph-image.jpg',
    'src/app/[locale]/opengraph-image.jpg',
  ];

  const pngTargets = [
    'public/images/brand/og-image.png',
    'public/og-image.png',
    'public/images/og-image.png',
    'src/app/opengraph-image.png',
    'src/app/[locale]/opengraph-image.png',
  ];

  for (const t of jpgTargets) {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    fs.writeFileSync(t, jpgBuffer);
    console.log(`Saved JPG: ${t} (${(jpgBuffer.length / 1024).toFixed(1)} KB)`);
  }

  for (const t of pngTargets) {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    fs.writeFileSync(t, pngBuffer);
    console.log(`Saved PNG: ${t} (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log('User provided official OG image installed successfully!');
}

installUploadedOg().catch(console.error);
