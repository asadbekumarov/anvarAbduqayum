const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  console.log('Navigating to http://localhost:3000/uz#tashabbuslar...');
  await page.goto('http://localhost:3000/uz#tashabbuslar', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const section = page.locator('#tashabbuslar');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  await page.screenshot({ path: path.join(outDir, 'initiatives-current-view.png') });
  console.log('Captured initiatives-current-view.png');

  // Mobile viewport capture
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'initiatives-mobile-view.png') });
  console.log('Captured initiatives-mobile-view.png');

  await browser.close();
})();

