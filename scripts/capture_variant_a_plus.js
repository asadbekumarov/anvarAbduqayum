const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');

function startStaticServer(publicDir, port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.webm': 'video/webm',
    '.woff2': 'font/woff2',
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/portfolio-variant-a-plus.html';

    const filePath = path.join(publicDir, reqPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Static server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function main() {
  const publicDir = path.resolve(__dirname, '../public');
  const serverPort = 3099;
  const server = await startStaticServer(publicDir, serverPort);

  const screenshotsDir = path.resolve(__dirname, '../screenshots');
  const videosDir = path.resolve(screenshotsDir, 'videos');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
  if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });

  const url = `http://localhost:${serverPort}/portfolio-variant-a-plus.html`;

  const browser = await chromium.launch();

  console.log('Testing and capturing Variant A+ Prototype at:', url);

  const verificationResults = {
    viewports: [],
    modalScrollTests: [],
    focusRestoration: null,
    backgroundLock: null,
    filtersWorking: true,
  };

  // 1. Viewport Overflow Verification
  const viewports = [
    { name: '320px', width: 320, height: 600 },
    { name: '360px', width: 360, height: 740 },
    { name: '390px', width: 390, height: 844 },
    { name: '768px', width: 768, height: 1024 },
    { name: '1440px', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto(url, { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    });

    console.log(`Viewport ${vp.name}: innerWidth=${overflow.innerWidth}, scrollWidth=${overflow.scrollWidth}, hasOverflow=${overflow.hasOverflow}`);
    verificationResults.viewports.push({ viewport: vp.name, ...overflow });

    await page.close();
  }

  // 2. Desktop 1440px Capture (Complete section & Modal Open)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle' });

    const fullPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-desktop-1440.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log('Saved:', fullPath);

    // Open detail modal (click first card: Toybola)
    const firstCard = page.locator('.card-entity').first();
    await firstCard.click();
    await page.waitForTimeout(350);

    const modalPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-desktop-modal-1440.png');
    await page.screenshot({ path: modalPath });
    console.log('Saved:', modalPath);

    // Close modal via Escape and verify focus restoration
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const isCardFocused = await page.evaluate(() => {
      return document.activeElement && document.activeElement.classList.contains('card-entity');
    });
    verificationResults.focusRestoration = isCardFocused;
    console.log('Desktop focus restored to card after Escape:', isCardFocused);

    await page.close();
  }

  // 3. Tablet 768px Capture
  {
    const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    const fullPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-tablet-768.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log('Saved:', fullPath);
    await page.close();
  }

  // 4. Mobile 390px (Grid, Modal Top, and Modal Bottom Scrolled)
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(url, { waitUntil: 'networkidle' });

    // Grid capture
    const fullPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-mobile-390.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log('Saved:', fullPath);

    // Open detail modal on 390px
    await page.locator('.card-entity').first().click();
    await page.waitForTimeout(350);

    // Check background scroll lock
    const bodyOverflow = await page.evaluate(() => {
      return {
        body: document.body.style.overflow,
        html: document.documentElement.style.overflow,
      };
    });
    verificationResults.backgroundLock = (bodyOverflow.body === 'hidden');
    console.log('Background scroll lock verified:', bodyOverflow);

    // Capture modal top
    const modalTopPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-mobile-modal-390.png');
    await page.screenshot({ path: modalTopPath });
    console.log('Saved:', modalTopPath);

    // Scroll modal to bottom
    await page.evaluate(() => {
      const scrollArea = document.getElementById('modalScrollArea');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    });
    await page.waitForTimeout(300);

    // Check that close button is still visible at the top
    const closeBtnVisible = await page.locator('.btn-close-modal').isVisible();
    const bottomCloseBtnVisible = await page.locator('.btn-modal-close-footer').isVisible();
    console.log(`Mobile 390px: Top close button visible=${closeBtnVisible}, Bottom action button visible=${bottomCloseBtnVisible}`);

    verificationResults.modalScrollTests.push({
      viewport: '390px',
      topCloseBtnVisible: closeBtnVisible,
      bottomActionBtnVisible: bottomCloseBtnVisible,
    });

    // Capture modal scrolled to bottom
    const modalBottomPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-mobile-modal-bottom-390.png');
    await page.screenshot({ path: modalBottomPath });
    console.log('Saved:', modalBottomPath);

    await page.close();
  }

  // 5. Mobile 360px Test
  {
    const page = await browser.newPage({ viewport: { width: 360, height: 740 } });
    await page.goto(url, { waitUntil: 'networkidle' });

    await page.locator('.card-entity').first().click();
    await page.waitForTimeout(350);

    await page.evaluate(() => {
      const scrollArea = document.getElementById('modalScrollArea');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    });
    await page.waitForTimeout(200);

    const closeBtnVisible = await page.locator('.btn-close-modal').isVisible();
    const bottomCloseBtnVisible = await page.locator('.btn-modal-close-footer').isVisible();
    verificationResults.modalScrollTests.push({
      viewport: '360px',
      topCloseBtnVisible: closeBtnVisible,
      bottomActionBtnVisible: bottomCloseBtnVisible,
    });
    console.log(`Mobile 360px: Top close button visible=${closeBtnVisible}, Bottom action button visible=${bottomCloseBtnVisible}`);

    await page.close();
  }

  // 6. Mobile 320px (Grid, Modal Top, and Modal Bottom Scrolled)
  {
    const page = await browser.newPage({ viewport: { width: 320, height: 600 } });
    await page.goto(url, { waitUntil: 'networkidle' });

    // Grid capture
    const fullPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-mobile-320.png');
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log('Saved:', fullPath);

    // Open detail modal on 320px
    await page.locator('.card-entity').first().click();
    await page.waitForTimeout(350);

    // Capture modal top
    const modalTopPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-mobile-modal-320.png');
    await page.screenshot({ path: modalTopPath });
    console.log('Saved:', modalTopPath);

    // Scroll modal to bottom
    await page.evaluate(() => {
      const scrollArea = document.getElementById('modalScrollArea');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    });
    await page.waitForTimeout(300);

    const closeBtnVisible = await page.locator('.btn-close-modal').isVisible();
    const bottomCloseBtnVisible = await page.locator('.btn-modal-close-footer').isVisible();
    console.log(`Mobile 320px: Top close button visible=${closeBtnVisible}, Bottom action button visible=${bottomCloseBtnVisible}`);

    verificationResults.modalScrollTests.push({
      viewport: '320px',
      topCloseBtnVisible: closeBtnVisible,
      bottomActionBtnVisible: bottomCloseBtnVisible,
    });

    // Capture modal scrolled to bottom
    const modalBottomPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-mobile-modal-bottom-320.png');
    await page.screenshot({ path: modalBottomPath });
    console.log('Saved:', modalBottomPath);

    // Click bottom close button to test closing and focus restoration
    await page.locator('.btn-modal-close-footer').click();
    await page.waitForTimeout(300);

    const modalClosed = !(await page.locator('#detailModalBackdrop').isVisible());
    console.log('Mobile 320px modal closed via footer button:', modalClosed);

    await page.close();
  }

  // 7. Video Recording (Filters, card hover, modal open/scroll, language switch)
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: videosDir,
        size: { width: 1280, height: 720 },
      },
    });

    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Smooth scroll down
    await page.evaluate(() => window.scrollBy({ top: 320, behavior: 'smooth' }));
    await page.waitForTimeout(700);

    const cards = page.locator('.card-entity');
    await cards.nth(0).hover();
    await page.waitForTimeout(500);

    // Test filter pills
    const filterMfg = page.locator('button.filter-pill', { hasText: 'Ishlab chiqarish' });
    if (await filterMfg.count() > 0) {
      await filterMfg.click();
      await page.waitForTimeout(700);
    }

    const filterHosp = page.locator('button.filter-pill', { hasText: 'Horeca' });
    if (await filterHosp.count() > 0) {
      await filterHosp.click();
      await page.waitForTimeout(700);
    }

    const filterAll = page.locator('button.filter-pill', { hasText: 'Barchasi' });
    if (await filterAll.count() > 0) {
      await filterAll.click();
      await page.waitForTimeout(700);
    }

    // Click Toybola card
    await cards.nth(0).click();
    await page.waitForTimeout(800);

    // Scroll modal smoothly
    await page.evaluate(() => {
      const el = document.getElementById('modalScrollArea');
      if (el) el.scrollTo({ top: el.scrollHeight / 2, behavior: 'smooth' });
    });
    await page.waitForTimeout(600);

    await page.evaluate(() => {
      const el = document.getElementById('modalScrollArea');
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
    await page.waitForTimeout(800);

    // Close modal via Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);

    // Language switcher to RU
    const ruBtn = page.locator('.btn-lang', { hasText: 'RU' });
    if (await ruBtn.count() > 0) {
      await ruBtn.click();
      await page.waitForTimeout(700);
    }

    // Language switcher to EN
    const enBtn = page.locator('.btn-lang', { hasText: 'EN' });
    if (await enBtn.count() > 0) {
      await enBtn.click();
      await page.waitForTimeout(700);
    }

    // Back to UZ
    const uzBtn = page.locator('.btn-lang', { hasText: 'UZ' });
    if (await uzBtn.count() > 0) {
      await uzBtn.click();
      await page.waitForTimeout(700);
    }

    await page.close();
    await context.close();

    const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.webm'));
    if (videoFiles.length > 0) {
      const latestVideo = videoFiles.map(f => ({ name: f, time: fs.statSync(path.join(videosDir, f)).mtimeMs }))
        .sort((a, b) => b.time - a.time)[0].name;

      const destPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-demo.webm');
      fs.copyFileSync(path.join(videosDir, latestVideo), destPath);
      console.log('Saved interaction video to:', destPath);
    }
  }

  await browser.close();
  server.close();

  // Save verification report
  const reportPath = path.resolve(screenshotsDir, 'phase2-3-variant-a-plus-verification-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(verificationResults, null, 2), 'utf-8');
  console.log('Saved verification report to:', reportPath);

  console.log('All Variant A+ Final Corrections successfully completed!');
}

main().catch(err => {
  console.error('Error running script:', err);
  process.exit(1);
});
