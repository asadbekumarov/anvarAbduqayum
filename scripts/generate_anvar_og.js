const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateOgImage() {
  const width = 1200;
  const height = 630;
  const portraitWidth = 480;

  // 1. Portretni tayyorlaymiz (480x630, o'ng tomonga joylashtirish uchun)
  // Anvar Abduqayumning yuzi va gavdasi aniq ko'rinadigan qilib kesamiz
  const portraitResized = await sharp('public/images/hero/portrait.webp')
    .resize(portraitWidth, height, { fit: 'cover', position: 'north' })
    .toBuffer();

  // 2. Portretning chap chekkasini fonga silliq o'tishi uchun gradient mask
  const fadeGradientSvg = `
  <svg width="${portraitWidth}" height="${height}" viewBox="0 0 ${portraitWidth} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fadeEdge" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0A0C11" stop-opacity="1" />
        <stop offset="18%" stop-color="#0A0C11" stop-opacity="0.8" />
        <stop offset="38%" stop-color="#0A0C11" stop-opacity="0.2" />
        <stop offset="60%" stop-color="#0A0C11" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="bottomShadow" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#0A0C11" stop-opacity="0.85" />
        <stop offset="25%" stop-color="#0A0C11" stop-opacity="0" />
      </linearGradient>
    </defs>
    <rect width="${portraitWidth}" height="${height}" fill="url(#fadeEdge)" />
    <rect width="${portraitWidth}" height="${height}" fill="url(#bottomShadow)" />
  </svg>
  `;

  // Portretga yumshoq chekka beramiz
  const portraitWithEdge = await sharp(portraitResized)
    .composite([{ input: Buffer.from(fadeGradientSvg), blend: 'over' }])
    .toBuffer();

  // 3. Matnlar va dizayn SVG qavati (FON SHAFFOF! Shunda portretni yopib qo'ymaydi)
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#F5D77F" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#AA8222" />
      </linearGradient>
    </defs>

    <!-- Oltin nozik ramka -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="rgba(212, 175, 55, 0.3)" stroke-width="1.5" rx="10" />

    <!-- Burchak aksentlari -->
    <path d="M 24 64 L 24 24 L 64 24" fill="none" stroke="#D4AF37" stroke-width="3" />
    <path d="M ${width - 64} 24 L ${width - 24} 24 L ${width - 24} 64" fill="none" stroke="#D4AF37" stroke-width="3" />
    <path d="M 24 ${height - 64} L 24 ${height - 24} L 64 ${height - 24}" fill="none" stroke="#D4AF37" stroke-width="3" />
    <path d="M ${width - 64} ${height - 24} L ${width - 24} ${height - 24} L ${width - 24} ${height - 64}" fill="none" stroke="#D4AF37" stroke-width="3" />

    <!-- Badge -->
    <g transform="translate(68, 70)">
      <rect x="0" y="0" width="295" height="32" rx="16" fill="rgba(212, 175, 55, 0.14)" stroke="rgba(212, 175, 55, 0.4)" stroke-width="1" />
      <circle cx="16" cy="16" r="4.5" fill="#D4AF37" />
      <text x="30" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="11.5" font-weight="700" fill="#D4AF37" letter-spacing="1.8">
        SANOAT VA BIZNES EKOTIZIMI
      </text>
    </g>

    <!-- Ism -->
    <text x="68" y="170" font-family="'Times New Roman', Georgia, serif" font-size="52" font-weight="bold" fill="#FFFFFF" letter-spacing="1">
      ANVAR ABDUQAYUM
    </text>

    <!-- Unvon -->
    <text x="68" y="216" font-family="system-ui, -apple-system, sans-serif" font-size="21" font-weight="600" fill="url(#goldText)" letter-spacing="0.8">
      Sanoatchi · Ishlab chiqaruvchi · Biznes-mentor
    </text>

    <line x1="68" y1="244" x2="680" y2="244" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />

    <!-- Tavsif matnlari -->
    <text x="68" y="286" font-family="system-ui, -apple-system, sans-serif" font-size="17.5" font-weight="400" fill="#CBD5E1">
      20 yillik real sanoat zavodlari va xalqaro eksport tajribasi.
    </text>
    <text x="68" y="318" font-family="system-ui, -apple-system, sans-serif" font-size="17.5" font-weight="400" fill="#CBD5E1">
      Kompaniyalarni shaxsga emas, «Qolip» tizimiga tayangan avtonom
    </text>
    <text x="68" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="17.5" font-weight="400" fill="#CBD5E1">
      boshqaruv arxitekturasiga o‘tkazish.
    </text>

    <!-- Korxonalar teglari -->
    <g transform="translate(68, 405)">
      <rect x="0" y="0" width="135" height="36" rx="6" fill="#131620" stroke="rgba(255, 255, 255, 0.12)" />
      <text x="16" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">TOYBOLA TOYS</text>

      <rect x="145" y="0" width="110" height="36" rx="6" fill="#131620" stroke="rgba(255, 255, 255, 0.12)" />
      <text x="161" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">SAMTECH</text>

      <rect x="265" y="0" width="135" height="36" rx="6" fill="#131620" stroke="rgba(255, 255, 255, 0.12)" />
      <text x="281" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">AFIYET KEBAB</text>

      <rect x="410" y="0" width="95" height="36" rx="6" fill="#131620" stroke="rgba(255, 255, 255, 0.12)" />
      <text x="426" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">UZBIC</text>
    </g>

    <!-- Pastki qism: Rasmiy domen -->
    <g transform="translate(68, 545)">
      <text x="0" y="0" font-family="monospace" font-size="14" font-weight="600" fill="#D4AF37" letter-spacing="1.5">
        ANVARABDUQAYUM.UZ
      </text>
      <text x="215" y="0" font-family="system-ui, sans-serif" font-size="13" fill="#64748B">
        · Rasmiy korporativ platforma
      </text>
    </g>
  </svg>
  `;

  // 4. Asosiy fon (Solid background)
  const baseImg = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 10, g: 12, b: 17, alpha: 1 }, // #0A0C11
    },
  });

  // Birlashtirish:
  // 1-qavat: Asosiy qora fon
  // 2-qavat: O'ng tomonda portret (left: 720)
  // 3-qavat: Shaffof SVG overlay (matnlar, hoshiya, teglari)
  const finalPngBuffer = await baseImg
    .composite([
      { input: portraitWithEdge, left: width - portraitWidth, top: 0 },
      { input: Buffer.from(svgOverlay), left: 0, top: 0 },
    ])
    .png({ quality: 95 })
    .toBuffer();

  const finalJpgBuffer = await sharp(finalPngBuffer)
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

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

  console.log('OG Image with visible right-side portrait generated successfully!');
}

generateOgImage().catch(console.error);
