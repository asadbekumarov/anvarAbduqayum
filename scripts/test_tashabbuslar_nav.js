const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  await page.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click TASHABBUSLAR in desktop navbar
  const navLink = page.locator('header nav a[href*="#tashabbuslar"]').first();
  await navLink.click();
  // Wait for Lenis smooth scroll animation to finish
  await page.waitForTimeout(2200);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  await page.screenshot({ path: path.join(outDir, 'initiatives-nav-clicked.png') });
  console.log('Captured initiatives-nav-clicked.png');

  await browser.close();
})();
