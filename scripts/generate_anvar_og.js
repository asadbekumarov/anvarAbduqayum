const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // 1. Portrait tayyorlash (o'ng tomonda 520x630 o'lchamda)
  const portraitBuffer = await sharp('public/images/hero/portrait.webp')
    .resize(520, 630, { fit: 'cover', position: 'top' })
    .toBuffer();

  // 2. SVG overlay (fon, matnlar, oltin hoshiyalar, gradientlar)
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradient fon -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#08090C" />
        <stop offset="50%" stop-color="#0D0F16" />
        <stop offset="100%" stop-color="#141722" />
      </linearGradient>

      <!-- Portret ustidagi yumshoq qora tuman (chapdan o'ngga) -->
      <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0D0F16" stop-opacity="1" />
        <stop offset="45%" stop-color="#0D0F16" stop-opacity="0.9" />
        <stop offset="70%" stop-color="#0D0F16" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#0D0F16" stop-opacity="0" />
      </linearGradient>

      <!-- Oltin gradient -->
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E5BE42" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#AA8222" />
      </linearGradient>
    </defs>

    <!-- Asosiy fon -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Oltin nozik ramka -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="rgba(212, 175, 55, 0.25)" stroke-width="1.5" rx="12" />
    <rect x="32" y="32" width="${width - 64}" height="${height - 64}" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" rx="8" />

    <!-- Burchak aksentlari -->
    <path d="M 24 64 L 24 24 L 64 24" fill="none" stroke="#D4AF37" stroke-width="3" />
    <path d="M ${width - 64} 24 L ${width - 24} 24 L ${width - 24} 64" fill="none" stroke="#D4AF37" stroke-width="3" />
    <path d="M 24 ${height - 64} L 24 ${height - 24} L 64 ${height - 24}" fill="none" stroke="#D4AF37" stroke-width="3" />
    <path d="M ${width - 64} ${height - 24} L ${width - 24} ${height - 24} L ${width - 24} ${height - 64}" fill="none" stroke="#D4AF37" stroke-width="3" />

    <!-- Matnlar bloki -->
    <!-- Badge -->
    <g transform="translate(68, 76)">
      <rect x="0" y="0" width="310" height="32" rx="16" fill="rgba(212, 175, 55, 0.12)" stroke="rgba(212, 175, 55, 0.35)" stroke-width="1" />
      <circle cx="16" cy="16" r="4" fill="#D4AF37" />
      <text x="30" y="21" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#D4AF37" letter-spacing="2">
        SANOAT VA BIZNES EKOTIZIMI
      </text>
    </g>

    <!-- Ism -->
    <text x="68" y="175" font-family="'Times New Roman', Georgia, serif" font-size="52" font-weight="bold" fill="#FFFFFF" letter-spacing="1">
      ANVAR ABDUQAYUM
    </text>

    <!-- Unvon / Kasb -->
    <text x="68" y="222" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="url(#goldGrad)" letter-spacing="1">
      Sanoatchi · Ishlab chiqaruvchi · Biznes-mentor
    </text>

    <line x1="68" y1="250" x2="680" y2="250" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

    <!-- Tavsif -->
    <text x="68" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#CBD5E1">
      20 yillik real sanoat zavodlari va xalqaro eksport tajribasi.
    </text>
    <text x="68" y="328" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#CBD5E1">
      Kompaniyalarni shaxsga emas, «Qolip» tizimiga tayangan avtonom
    </text>
    <text x="68" y="361" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#CBD5E1">
      boshqaruv arxitekturasiga o‘tkazish.
    </text>

    <!-- Pastki korxonalar teglari -->
    <g transform="translate(68, 420)">
      <!-- Teg 1 -->
      <rect x="0" y="0" width="135" height="38" rx="6" fill="#141722" stroke="rgba(255, 255, 255, 0.12)" />
      <text x="18" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF">TOYBOLA TOYS</text>

      <!-- Teg 2 -->
      <rect x="147" y="0" width="115" height="38" rx="6" fill="#141722" stroke="rgba(255, 255, 255, 0.12)" />
      <text x="165" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF">SAMTECH</text>

      <!-- Teg 3 -->
      <rect x="274" y="0" width="135" height="38" rx="6" fill="#141722" stroke="rgba(255, 255, 255, 0.12)" />
      <text x="292" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF">AFIYET KEBAB</text>

      <!-- Teg 4 -->
      <rect x="421" y="0" width="100" height="38" rx="6" fill="#141722" stroke="rgba(255, 255, 255, 0.12)" />
      <text x="439" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF">UZBIC</text>
    </g>

    <!-- Pastki qism: Rasmiy domen -->
    <g transform="translate(68, 550)">
      <text x="0" y="0" font-family="monospace" font-size="14" font-weight="600" fill="#D4AF37" letter-spacing="1.5">
        ANVARABDUQAYUM.UZ
      </text>
      <text x="220" y="0" font-family="system-ui, sans-serif" font-size="13" fill="#64748B">
        · Rasmiy korporativ platforma
      </text>
    </g>
  </svg>
  `;

  // 3. Portret ustiga gradient soyani chizamiz
  const shadowOverlay = `
  <svg width="520" height="630" viewBox="0 0 520 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pFade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#08090C" stop-opacity="1" />
        <stop offset="35%" stop-color="#08090C" stop-opacity="0.85" />
        <stop offset="65%" stop-color="#08090C" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#08090C" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="pBottom" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#08090C" stop-opacity="0.9" />
        <stop offset="40%" stop-color="#08090C" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect width="520" height="630" fill="url(#pFade)" />
    <rect width="520" height="630" fill="url(#pBottom)" />
  </svg>
  `;

  // Portret + tuman
  const shadedPortrait = await sharp(portraitBuffer)
    .composite([{ input: Buffer.from(shadowOverlay), blend: 'over' }])
    .toBuffer();

  // Barchasini birlashtirish
  const baseImg = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 8, g: 9, b: 12, alpha: 1 },
    },
  });

  const finalPngBuffer = await baseImg
    .composite([
      { input: shadedPortrait, left: width - 520, top: 0 },
      { input: Buffer.from(svgOverlay), left: 0, top: 0 },
    ])
    .png({ quality: 95 })
    .toBuffer();

  const finalJpgBuffer = await sharp(finalPngBuffer)
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  // Barcha manzillarga saqlash
  const targetsPng = [
    'public/images/brand/og-image.png',
    'public/og-image.png',
    'public/images/og-image.png',
    'src/app/opengraph-image.png',
    'src/app/[locale]/opengraph-image.png',
  ];

  const targetsJpg = [
    'public/images/brand/og-image.jpg',
    'public/og-image.jpg',
  ];

  for (const t of targetsPng) {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    fs.writeFileSync(t, finalPngBuffer);
    console.log(`Saved PNG: ${t}`);
  }

  for (const t of targetsJpg) {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    fs.writeFileSync(t, finalJpgBuffer);
    console.log(`Saved JPG: ${t} (${(finalJpgBuffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log('OG Images successfully generated for Anvar Abduqayum!');
}

generateOgImage().catch(console.error);
