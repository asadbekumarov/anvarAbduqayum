const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  
  console.log('Navigating to http://localhost:3000/uz...');
  await page.goto('http://localhost:3000/uz', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Click on the MEDIA link in navbar
  console.log('Clicking MEDIA in navbar...');
  const mediaLink = page.locator('header nav a[href*="#media"]');
  await mediaLink.click();
  await page.waitForTimeout(1000);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  await page.screenshot({ path: path.join(outDir, 'media-header-docked.png') });
  console.log('Captured media-header-docked.png');

  // Also capture press view
  const pressEl = page.locator('#media-press');
  await pressEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'media-press-docked.png') });
  console.log('Captured media-press-docked.png');

  await browser.close();
})();

