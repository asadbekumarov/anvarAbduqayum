const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const outputDir = path.resolve(__dirname, '../public/audit-screenshots');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const networkErrors = [];
  page.on('response', resp => {
    if (resp.status() >= 400) {
      networkErrors.push({ url: resp.url(), status: resp.status() });
    }
  });

  console.log('Navigating to http://localhost:3015/uz ...');

  // 1. Desktop 1440x900
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => {
    const img = document.querySelector('.portrait-image-wrapper img');
    return img && img.complete && img.naturalWidth > 0 && img.offsetHeight > 100;
  }, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);

  // Desktop Hero screenshot (1440x900 viewport crop)
  await page.screenshot({
    path: path.join(outputDir, 'phase3_hero_desktop_1440px.png'),
    fullPage: false
  });
  console.log('Saved phase3_hero_desktop_1440px.png');

  // Portrait element screenshot
  const portraitFrame = await page.$('.portrait-archival-mat');
  if (portraitFrame) {
    await portraitFrame.screenshot({
      path: path.join(outputDir, 'phase3_portrait_presentation.png')
    });
    console.log('Saved phase3_portrait_presentation.png');
  }

  // 2. Mobile 390x844
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => {
    const img = document.querySelector('.portrait-image-wrapper img');
    return img && img.complete && img.naturalWidth > 0 && img.offsetHeight > 100;
  }, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(outputDir, 'phase3_hero_mobile_390px.png'),
    fullPage: false
  });
  console.log('Saved phase3_hero_mobile_390px.png');

  // Mobile drawer open state
  const burgerBtn = await page.$('button[aria-controls="mobile-drawer-panel"]');
  if (burgerBtn) {
    await burgerBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outputDir, 'phase3_mobile_nav_open.png'),
      fullPage: false
    });
    console.log('Saved phase3_mobile_nav_open.png');

    // Test Escape key closes drawer
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const isOpenAfterEscape = await page.evaluate(() => {
      const panel = document.getElementById('mobile-drawer-panel');
      return panel ? panel.classList.contains('translate-x-0') : false;
    });
    console.log('Drawer closed after Escape:', !isOpenAfterEscape);
  }

  // 3. Mobile 320x650
  await page.setViewportSize({ width: 320, height: 650 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(outputDir, 'phase3_hero_mobile_320px.png'),
    fullPage: false
  });
  console.log('Saved phase3_hero_mobile_320px.png');

  // 4. Viewport Overflow Check across all required sizes
  const viewports = [320, 360, 390, 768, 1024, 1440];
  const overflowResults = {};

  for (const w of viewports) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    overflowResults[w] = { hasOverflow, scrollWidth, innerWidth: w };
  }

  // 5. Test Language Switcher in Next.js
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  
  // Click RU
  const ruBtn = await page.$('button[aria-label="RU tiliga o\'tish"]');
  let ruUrl = '';
  if (ruBtn) {
    await ruBtn.click();
    await page.waitForURL('**/ru', { timeout: 5000 }).catch(() => {});
    ruUrl = page.url();
  }

  // 6. Test CTA Booking Routing
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  const ctaBtn = await page.$('#hero a[href*="/bron"]');
  let bookingUrl = '';
  if (ctaBtn) {
    await ctaBtn.click();
    await page.waitForURL('**/bron', { timeout: 5000 }).catch(() => {});
    bookingUrl = page.url();
  }

  // 7. Check Cyan & Yellow in Next.js Portrait
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  const portraitPixelStats = await page.evaluate(() => {
    const wrap = document.querySelector('.portrait-image-wrapper');
    if (!wrap) return null;
    const rect = wrap.getBoundingClientRect();
    const cvs = document.createElement('canvas');
    cvs.width = Math.round(rect.width);
    cvs.height = Math.round(rect.height);
    const ctx = cvs.getContext('2d');
    const img = wrap.querySelector('img');
    if (!img) return null;
    // Check computed styles
    const cs = window.getComputedStyle(img);
    return {
      objectFit: cs.objectFit,
      objectPosition: cs.objectPosition,
      transform: cs.transform,
      filter: cs.filter,
      rect: { width: rect.width, height: rect.height }
    };
  });

  // 8. Create Side-by-Side Before/After Image (Base64 data URIs to avoid file:// security blocks)
  const beforeHeroFile = path.resolve(outputDir, 'phase3_before_hero_1440x900.png');
  const afterHeroFile = path.resolve(outputDir, 'phase3_hero_desktop_1440px.png');
  
  if (fs.existsSync(beforeHeroFile) && fs.existsSync(afterHeroFile)) {
    const beforeBase64 = fs.readFileSync(beforeHeroFile).toString('base64');
    const afterBase64 = fs.readFileSync(afterHeroFile).toString('base64');

    const comparePage = await browser.newPage();
    await comparePage.setViewportSize({ width: 1600, height: 1050 });
    await comparePage.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 30px;
            background: #0e1015;
            color: #EDE8DF;
            font-family: 'Segoe UI', system-ui, sans-serif;
          }
          .title-bar {
            text-align: center;
            margin-bottom: 24px;
          }
          .title-bar h1 {
            font-size: 22px;
            margin: 0 0 6px 0;
            letter-spacing: 0.08em;
          }
          .title-bar p {
            color: #9499A5;
            font-size: 13px;
            margin: 0;
            font-family: monospace;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .card {
            background: #171920;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .card-header {
            padding: 12px 16px;
            background: #20232B;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .card-title {
            font-weight: 700;
            font-size: 12px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
          .badge-before {
            background: #3A3E4B;
            color: #D1D5DB;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 10.5px;
            font-family: monospace;
          }
          .badge-after {
            background: #B8860B;
            color: #FFFFFF;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 10.5px;
            font-family: monospace;
            font-weight: bold;
          }
          .preview-img {
            width: 100%;
            height: auto;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="title-bar">
          <h1>PHASE 3.1: NEXT.JS NAVBAR & HERO MIGRATION (BEFORE vs AFTER)</h1>
          <p>Concept D Dark Obsidian (Baseline) &rarr; Concept 3 Contemporary Luxury Editorial</p>
        </div>
        <div class="grid">
          <div class="card">
            <div class="card-header">
              <span class="card-title">OLD BASELINE (Concept D)</span>
              <span class="badge-before">BEFORE MIGRATION</span>
            </div>
            <img src="data:image/png;base64,${beforeBase64}" class="preview-img">
          </div>
          <div class="card">
            <div class="card-header">
              <span class="card-title" style="color:#D4AF37;">NEW MIGRATED (Concept 3)</span>
              <span class="badge-after">AFTER PHASE 3.1</span>
            </div>
            <img src="data:image/png;base64,${afterBase64}" class="preview-img">
          </div>
        </div>
      </body>
      </html>
    `);
    await comparePage.waitForTimeout(500);
    await comparePage.screenshot({
      path: path.join(outputDir, 'phase3_before_after_comparison.png'),
      fullPage: true
    });
    console.log('Saved phase3_before_after_comparison.png with base64 images');
    await comparePage.close();
  }

  const report = {
    timestamp: new Date().toISOString(),
    overflowResults,
    consoleErrors,
    networkErrors,
    languageSwitching: { target: 'ru', resultUrl: ruUrl, ok: ruUrl.includes('/ru') },
    bookingCtaRouting: { target: '/uz/bron', resultUrl: bookingUrl, ok: bookingUrl.includes('/bron') },
    portraitPixelStats
  };

  fs.writeFileSync(
    path.join(outputDir, 'phase3_migration_report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('Phase 3.1 Migration Verification Complete:');
  console.log(JSON.stringify(report, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error('Error running verification:', err);
  process.exit(1);
});
