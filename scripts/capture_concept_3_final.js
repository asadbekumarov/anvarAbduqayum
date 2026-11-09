const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const outputDir = path.resolve(__dirname, '../public/audit-screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const fileUrl = 'file:///' + path.resolve(__dirname, '../public/hallmark-exploration/concept-3-final.html').replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);

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

  // 1. Desktop 1440x900
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Hero crop at 1440x900
  await page.screenshot({
    path: path.join(outputDir, 'concept3_final_hero_1440x900.png'),
    fullPage: false
  });
  console.log('Saved hero 1440x900');

  // Dedicated portrait presentation screenshot
  const portraitEl = await page.$('.hero-portrait-frame');
  if (portraitEl) {
    await portraitEl.screenshot({
      path: path.join(outputDir, 'portrait_presentation.png')
    });
    console.log('Saved portrait presentation screenshot');
  }

  // Full page desktop 1440
  await page.screenshot({
    path: path.join(outputDir, 'concept3_final_desktop_1440px.png'),
    fullPage: true
  });
  console.log('Saved desktop fullpage 1440px');

  // Dossier interaction preview
  const dossierTab2 = await page.$('#tab-manufacturing');
  if (dossierTab2) {
    await dossierTab2.click();
    await page.waitForTimeout(400);
    const dossierSec = await page.$('#dossier');
    if (dossierSec) {
      await dossierSec.screenshot({
        path: path.join(outputDir, 'concept3_final_dossier.png')
      });
      console.log('Saved dossier preview');
    }
  }

  // Portfolio modal open
  const detailBtn = await page.$('button[data-target="toybola"]');
  if (detailBtn) {
    await detailBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outputDir, 'concept3_final_modal_open.png'),
      fullPage: false
    });
    console.log('Saved modal open state');
    // Close modal
    const closeBtn = await page.$('#modal-close-trigger');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(400);
  }

  // Timeline crop
  const timelineSec = await page.$('#timeline');
  if (timelineSec) {
    await timelineSec.screenshot({
      path: path.join(outputDir, 'concept3_final_timeline.png')
    });
    console.log('Saved timeline preview');
  }

  // 2. Mobile 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  await page.screenshot({
    path: path.join(outputDir, 'concept3_final_mobile_390px.png'),
    fullPage: true
  });
  console.log('Saved mobile 390px');

  // Open mobile nav drawer
  const burgerBtn = await page.$('#mobile-toggle-btn');
  if (burgerBtn) {
    await burgerBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outputDir, 'concept3_final_mobile_nav_open.png'),
      fullPage: false
    });
    console.log('Saved mobile nav open state');
    const drawerClose = await page.$('#drawer-close-btn');
    if (drawerClose) await drawerClose.click();
    await page.waitForTimeout(400);
  }

  // 3. Mobile 320px
  await page.setViewportSize({ width: 320, height: 650 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  await page.screenshot({
    path: path.join(outputDir, 'concept3_final_mobile_320px.png'),
    fullPage: true
  });
  console.log('Saved mobile 320px');

  // 4. Viewport Overflow Check
  const viewports = [320, 360, 390, 768, 1024, 1440];
  const overflowResults = {};

  for (const w of viewports) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    overflowResults[w] = { hasOverflow, scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth) };
  }

  // 5. Image & Font check
  const imagesStatus = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      ok: img.complete && img.naturalWidth > 0
    }));
  });

  const auditReport = {
    fileUrl,
    consoleErrors,
    networkErrors,
    overflowResults,
    imagesStatus
  };

  fs.writeFileSync(
    path.join(outputDir, 'concept3_final_audit.json'),
    JSON.stringify(auditReport, null, 2)
  );

  console.log('Audit completed successfully:', JSON.stringify(overflowResults, null, 2));
  await browser.close();
}

run().catch(err => {
  console.error('Error running capture:', err);
  process.exit(1);
});

