const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1080 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/uz#yol...');
  await page.goto('http://localhost:3000/uz#yol', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const yolSection = page.locator('#yol');
  await yolSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  await page.screenshot({ path: path.join(outDir, 'timeline-upgraded-view.png') });
  console.log('Captured timeline-upgraded-view.png');

  // Click on a filter, e.g., "Shaxsiy loyihalar" or second tab
  const filterBtns = page.locator('#yol [role="tab"]');
  const count = await filterBtns.count();
  if (count > 1) {
    await filterBtns.nth(1).click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'timeline-filtered-view.png') });
    console.log('Captured timeline-filtered-view.png');
  }

  // Switch back to "All" (first tab) and toggle verification note
  await filterBtns.first().click();
  await page.waitForTimeout(600);

  // Click first verification button
  const verifyBtn = page.locator('#yol button[aria-controls^="tl-note-drawer-"]').first();
  if (await verifyBtn.count() > 0) {
    await verifyBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'timeline-accordion-view.png') });
    console.log('Captured timeline-accordion-view.png');
  }

  await browser.close();
  console.log('Finished visual capture.');
})();

