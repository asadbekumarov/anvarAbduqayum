const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1080 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/uz#portfel...');
  await page.goto('http://localhost:3000/uz#portfel', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // In the Portfolio tools tablist, click the Export Corridors tab
  const exportTab = page.locator('button:has-text("Eksport Koridorlari")');
  console.log('Export tab visible:', await exportTab.isVisible());
  await exportTab.click();
  console.log('Clicked Export Corridors tab.');

  await page.waitForTimeout(2500);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';

  // Scroll into view of the map section
  const exportSection = page.locator('text=EKSPORT GEOGRAFIYASI').first();
  await exportSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // 1. Initial view (KZ selected)
  const mapContainer = page.locator('.lg\\:col-span-7').first();
  await mapContainer.screenshot({ path: path.join(outDir, 'maplibre-card-exact.png') });
  console.log('Captured maplibre-card-exact.png');

  await page.screenshot({ path: path.join(outDir, 'maplibre-initial-kz.png') });
  console.log('Captured maplibre-initial-kz.png');

  // 2. Click MENA button in top button row
  const menaBtn = page.locator('button:has-text("MENA")');
  if (await menaBtn.count() > 0) {
    await menaBtn.first().click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, 'maplibre-selected-mena.png') });
    console.log('Captured maplibre-selected-mena.png');
  }

  // 3. Click RU button in top button row
  const ruBtn = page.locator('button:has-text("RU")');
  if (await ruBtn.count() > 0) {
    await ruBtn.first().click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, 'maplibre-selected-ru.png') });
    console.log('Captured maplibre-selected-ru.png');
  }

  // 4. Test clicking China directly on the map canvas
  // We can simulate clicking around coordinates or select via click
  // Let's test TJ button as well
  const tjBtn = page.locator('button:has-text("TJ")');
  if (await tjBtn.count() > 0) {
    await tjBtn.first().click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, 'maplibre-selected-tj.png') });
    console.log('Captured maplibre-selected-tj.png');
  }

  // 5. Mobile viewport check
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1200);
  await exportSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'maplibre-mobile-view.png') });
  console.log('Captured maplibre-mobile-view.png');

  await browser.close();
  console.log('Playwright test completed successfully.');
})();
