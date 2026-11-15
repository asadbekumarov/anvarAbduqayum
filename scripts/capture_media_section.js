const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  
  console.log('Navigating to http://localhost:3000/uz#media...');
  await page.goto('http://localhost:3000/uz#media', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const section = page.locator('#media');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  await page.screenshot({ path: path.join(outDir, 'media-current-view.png') });
  console.log('Captured media-current-view.png');

  // Also scroll a bit down to capture the carousel and press ledger
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'media-carousel-view.png') });
  console.log('Captured media-carousel-view.png');

  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'media-press-view.png') });
  console.log('Captured media-press-view.png');

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'media-mobile-view.png') });
  console.log('Captured media-mobile-view.png');

  await browser.close();
})();
