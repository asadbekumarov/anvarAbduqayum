const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capturePortfolioPerfect() {
  const browser = await chromium.launch({ headless: true });
  const htmlFile = 'file:///' + path.resolve('public/portfolio-variants.html').replace(/\\/g, '/');

  console.log('1. Capturing Pure Variant A & Variant B Section Screenshots...');

  // --- DESKTOP CAPTURES (1440px) ---
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto(htmlFile, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(500);

  // Hide the control bar during section screenshots so we capture pure portfolio designs
  await desktopPage.evaluate(() => {
    const bar = document.querySelector('.control-bar');
    if (bar) bar.style.display = 'none';
  });

  // Variant A Desktop
  const varAElement = desktopPage.locator('#view-variant-a');
  const pathVarADesktop = path.resolve('screenshots/phase2-3-variant-a-desktop-1440.png');
  await varAElement.screenshot({ path: pathVarADesktop });
  fs.copyFileSync(pathVarADesktop, path.resolve('public/previews/phase2-3-variant-a-desktop-1440.png'));
  console.log('Saved Variant A Desktop 1440px');

  // Switch to Variant B
  await desktopPage.evaluate(() => {
    switchView('variant-b');
  });
  await desktopPage.waitForTimeout(400);

  const varBElement = desktopPage.locator('#view-variant-b');
  const pathVarBDesktop = path.resolve('screenshots/phase2-3-variant-b-desktop-1440.png');
  await varBElement.screenshot({ path: pathVarBDesktop });
  fs.copyFileSync(pathVarBDesktop, path.resolve('public/previews/phase2-3-variant-b-desktop-1440.png'));
  console.log('Saved Variant B Desktop 1440px');

  await desktopCtx.close();

  // --- MOBILE CAPTURES (390px) ---
  console.log('2. Capturing Mobile 390px Screenshots...');
  const m390Ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const m390Page = await m390Ctx.newPage();
  await m390Page.goto(htmlFile, { waitUntil: 'networkidle' });
  await m390Page.waitForTimeout(500);

  // Hide control bar for clean section shot
  await m390Page.evaluate(() => {
    const bar = document.querySelector('.control-bar');
    if (bar) bar.style.display = 'none';
    switchView('variant-a');
  });
  await m390Page.waitForTimeout(300);

  const m390AShot = path.resolve('screenshots/phase2-3-variant-a-mobile-390.png');
  await m390Page.locator('#view-variant-a').screenshot({ path: m390AShot });
  fs.copyFileSync(m390AShot, path.resolve('public/previews/phase2-3-variant-a-mobile-390.png'));

  // Variant B Mobile 390
  await m390Page.evaluate(() => switchView('variant-b'));
  await m390Page.waitForTimeout(300);
  const m390BShot = path.resolve('screenshots/phase2-3-variant-b-mobile-390.png');
  await m390Page.locator('#view-variant-b').screenshot({ path: m390BShot });
  fs.copyFileSync(m390BShot, path.resolve('public/previews/phase2-3-variant-b-mobile-390.png'));
  console.log('Saved Mobile 390px Screenshots');

  await m390Ctx.close();

  // --- MOBILE CAPTURES (320px) ---
  console.log('3. Capturing Mobile 320px Screenshots...');
  const m320Ctx = await browser.newContext({
    viewport: { width: 320, height: 600 },
    deviceScaleFactor: 2,
  });
  const m320Page = await m320Ctx.newPage();
  await m320Page.goto(htmlFile, { waitUntil: 'networkidle' });
  await m320Page.waitForTimeout(400);

  await m320Page.evaluate(() => {
    const bar = document.querySelector('.control-bar');
    if (bar) bar.style.display = 'none';
    switchView('variant-a');
  });
  await m320Page.waitForTimeout(300);
  await m320Page.locator('#view-variant-a').screenshot({ path: path.resolve('screenshots/phase2-3-variant-a-mobile-320.png') });

  await m320Page.evaluate(() => switchView('variant-b'));
  await m320Page.waitForTimeout(300);
  await m320Page.locator('#view-variant-b').screenshot({ path: path.resolve('screenshots/phase2-3-variant-b-mobile-320.png') });
  console.log('Saved Mobile 320px Screenshots');

  await m320Ctx.close();

  // --- 4. GENERATE FLAWLESS SIDE-BY-SIDE VISUAL WITH BASE64 ---
  console.log('4. Generating High-Definition Side-by-Side Comparison...');
  const aBase64 = fs.readFileSync(pathVarADesktop).toString('base64');
  const bBase64 = fs.readFileSync(pathVarBDesktop).toString('base64');

  const compCtx = await browser.newContext({
    viewport: { width: 1920, height: 1250 },
    deviceScaleFactor: 2,
  });
  const compPage = await compCtx.newPage();

  const comparisonHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        margin: 0;
        background: #090A0D;
        color: #F5F4F0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        padding: 36px 40px;
        box-sizing: border-box;
      }
      .top-banner {
        text-align: center;
        margin-bottom: 28px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.09);
        padding-bottom: 20px;
      }
      .eyebrow {
        font-family: monospace;
        font-size: 13px;
        font-weight: 700;
        color: #D97736;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      .main-title {
        font-family: Georgia, serif;
        font-size: 32px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 8px;
      }
      .main-subtitle {
        font-size: 15px;
        color: #8E95A5;
        max-width: 800px;
        margin: 0 auto;
      }
      .grid-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 28px;
      }
      .concept-card {
        background: #111318;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      }
      .concept-header {
        padding: 16px 22px;
        background: #151820;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .concept-badge {
        font-family: monospace;
        font-size: 12px;
        font-weight: 700;
        color: #090A0D;
        background: #D97736;
        padding: 4px 10px;
        border-radius: 4px;
        text-transform: uppercase;
      }
      .concept-name {
        font-family: Georgia, serif;
        font-size: 18px;
        font-weight: 700;
        color: #FFFFFF;
      }
      .concept-type {
        font-size: 12px;
        color: #8E95A5;
        font-family: monospace;
      }
      .img-container {
        width: 100%;
        height: 720px;
        overflow: hidden;
        background: #090A0D;
        position: relative;
      }
      .img-container img {
        width: 100%;
        height: auto;
        display: block;
      }
      .concept-footer {
        padding: 18px 22px;
        background: #13151D;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .feature-item {
        font-size: 12.5px;
        color: #B2B8C4;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .feature-item strong {
        color: #FFFFFF;
      }
      .check {
        color: #22C55E;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="top-banner">
      <div class="eyebrow">✦ PHASE 2.3 // KONSEPSIYALAR TAQQOSLASH NAMOYISHI</div>
      <div class="main-title">Biznes Ekotizimi: Variant A vs Variant B</div>
      <div class="main-subtitle">
        Har ikkala yo‘nalish ham Concept D standartlariga (Dark Obsidian, Warm Amber, Playfair Display) to‘liq mos holda ishlab chiqilgan.
      </div>
    </div>

    <div class="grid-layout">
      <!-- Variant A -->
      <div class="concept-card">
        <div class="concept-header">
          <div>
            <div class="concept-name">Variant A: Editorial Business Grid</div>
            <div class="concept-type">12 ustunli asimmetrik jurnalistik to‘r</div>
          </div>
          <span class="concept-badge">VARIANT A</span>
        </div>
        <div class="img-container">
          <img id="imgA" src="data:image/png;base64,${aBase64}" alt="Variant A" />
        </div>
        <div class="concept-footer">
          <div class="feature-item"><span class="check">✔</span> <span><strong>Idrok:</strong> 7 ta biznes bir qarashda ko‘rinadi</span></div>
          <div class="feature-item"><span class="check">✔</span> <span><strong>Ierarxiya:</strong> Zavodlar 6 ustunda keng namoyon</span></div>
          <div class="feature-item"><span class="check">✔</span> <span><strong>Qulaylik:</strong> Bosish shart emas, skroll orqali o‘qiladi</span></div>
          <div class="feature-item"><span class="check">✔</span> <span><strong>Filtrlash:</strong> Toifalar bo‘yicha tezkor tugmalar</span></div>
        </div>
      </div>

      <!-- Variant B -->
      <div class="concept-card">
        <div class="concept-header">
          <div>
            <div class="concept-name">Variant B: Interactive Business Showcase</div>
            <div class="concept-type">Vitrina (Featured Stage) + Navigator katalog</div>
          </div>
          <span class="concept-badge">VARIANT B</span>
        </div>
        <div class="img-container">
          <img id="imgB" src="data:image/png;base64,${bBase64}" alt="Variant B" />
        </div>
        <div class="concept-footer">
          <div class="feature-item"><span class="check">✔</span> <span><strong>Nufuz:</strong> Boshqaruv markazi (Executive) taassuroti</span></div>
          <div class="feature-item"><span class="check">✔</span> <span><strong>Chuqurlik:</strong> Har bir korxona spetsifikatsiyasi alohida</span></div>
          <div class="feature-item"><span class="check">✔</span> <span><strong>Ixchamlik:</strong> Sahifa balandligi qisqa va qulay</span></div>
          <div class="feature-item"><span class="check">✔</span> <span><strong>Interaktivlik:</strong> Katalogdan tanlashda tezkor almashinuv</span></div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await compPage.setContent(comparisonHtml);
  await compPage.waitForTimeout(600);

  // Verify that images loaded completely without errors
  const imagesValid = await compPage.evaluate(() => {
    const imgA = document.getElementById('imgA');
    const imgB = document.getElementById('imgB');
    return {
      imgAWidth: imgA ? imgA.naturalWidth : 0,
      imgBWidth: imgB ? imgB.naturalWidth : 0,
      loaded: imgA && imgB && imgA.naturalWidth > 0 && imgB.naturalWidth > 0
    };
  });
  console.log('Image verification result:', imagesValid);

  const finalSideBySidePath = path.resolve('screenshots/phase2-3-side-by-side-visual.png');
  await compPage.screenshot({ path: finalSideBySidePath });
  console.log('Saved working side-by-side comparison to:', finalSideBySidePath);

  // Also save a standard 1440px desktop version of the comparison
  const comp1440Ctx = await browser.newContext({
    viewport: { width: 1440, height: 1050 },
    deviceScaleFactor: 2,
  });
  const comp1440Page = await comp1440Ctx.newPage();
  await comp1440Page.setContent(comparisonHtml);
  await comp1440Page.waitForTimeout(500);
  await comp1440Page.screenshot({ path: path.resolve('screenshots/phase2-3-comparison-desktop-1440.png') });
  console.log('Saved comparison desktop 1440px to screenshots/phase2-3-comparison-desktop-1440.png');

  await comp1440Ctx.close();
  await compCtx.close();
  await browser.close();
  console.log('Capture & Comparison generation completed successfully!');
}

capturePortfolioPerfect();

