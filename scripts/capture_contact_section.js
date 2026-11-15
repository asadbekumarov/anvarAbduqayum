const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating to http://localhost:3000/uz...');
  await page.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click on the ALOQA link in navbar
  console.log('Clicking ALOQA in navbar...');
  const contactLink = page.locator('header nav a[href*="#aloqa"]');
  await contactLink.click();
  await page.waitForTimeout(1500);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  await page.screenshot({ path: path.join(outDir, 'contact-header-docked-upgraded.png') });
  console.log('Captured contact-header-docked-upgraded.png');

  // Scroll down to Band 2 (Directory & Form)
  const formEl = page.locator('#aloqa-kanallar');
  if (formEl) {
    const box = await formEl.boundingBox();
    await page.evaluate((top) => window.scrollTo(0, top - 80), box.y);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, 'contact-form-docked-upgraded.png') });
    console.log('Captured contact-form-docked-upgraded.png');
  }

  // Mobile viewport
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000/uz#aloqa', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(outDir, 'contact-mobile-docked-upgraded.png') });
  console.log('Captured contact-mobile-docked-upgraded.png');

  await browser.close();
})();
