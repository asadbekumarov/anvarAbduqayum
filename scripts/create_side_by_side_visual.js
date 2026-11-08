const { chromium } = require('playwright');
const path = require('path');

async function createSideBySideVisual() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        background: #090A0D;
        color: #F5F4F0;
        font-family: 'Plus Jakarta Sans', sans-serif;
        padding: 30px;
        box-sizing: border-box;
      }
      .header {
        text-align: center;
        margin-bottom: 24px;
      }
      .title {
        font-family: 'Playfair Display', serif;
        font-size: 28px;
        font-weight: 700;
        color: #F5F4F0;
      }
      .subtitle {
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        color: #D97736;
        letter-spacing: 0.08em;
        margin-top: 6px;
      }
      .split-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }
      .card-wrap {
        background: #111318;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        overflow: hidden;
      }
      .card-header {
        padding: 12px 18px;
        background: #161920;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        font-weight: 700;
        color: #D97736;
      }
      .name {
        font-size: 14px;
        font-weight: 600;
        color: #FFFFFF;
      }
      .img-frame {
        width: 100%;
        height: 840px;
        overflow: hidden;
      }
      .img-frame img {
        width: 100%;
        height: auto;
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="subtitle">PHASE 2.3 // BIZNES EKOTIZIMI (PORTFOLIO) KONSEPSIYALARI</div>
      <div class="title">Variant A (Editorial Business Grid) vs Variant B (Interactive Showcase)</div>
    </div>
    <div class="split-grid">
      <div class="card-wrap">
        <div class="card-header">
          <span class="badge">VARIANT A</span>
          <span class="name">Editorial Business Grid (Ochiq Ierarxik To‘r)</span>
        </div>
        <div class="img-frame">
          <img src="file:///${path.resolve('screenshots/phase2-3-variant-a-desktop-1440.png').replace(/\\/g, '/')}" />
        </div>
      </div>
      <div class="card-wrap">
        <div class="card-header">
          <span class="badge">VARIANT B</span>
          <span class="name">Interactive Showcase (Markaziy Vitrina + Navigator)</span>
        </div>
        <div class="img-frame">
          <img src="file:///${path.resolve('screenshots/phase2-3-variant-b-desktop-1440.png').replace(/\\/g, '/')}" />
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.resolve('screenshots/phase2-3-side-by-side-visual.png') });
  await browser.close();
  console.log('Side-by-side visual image created at screenshots/phase2-3-side-by-side-visual.png');
}

createSideBySideVisual();

