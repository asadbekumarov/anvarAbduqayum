const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  console.log('Navigating to http://localhost:3000/uz#tamoyil...');
  await page.goto('http://localhost:3000/uz#tamoyil', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const section = page.locator('#tamoyil');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  await page.screenshot({ path: path.join(outDir, 'principles-current-view.png') });
  console.log('Captured principles-current-view.png');

  // Click on the second tab
  const tabs = page.locator('#tamoyil [role="tab"]');
  if (await tabs.count() > 1) {
    await tabs.nth(1).click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, 'principles-tab2-view.png') });
    console.log('Captured principles-tab2-view.png');
  }

  // Mobile viewport capture
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'principles-mobile-view.png') });
  console.log('Captured principles-mobile-view.png');

  await browser.close();
})();

