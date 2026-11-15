const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto('http://localhost:3000/uz#portfel', { waitUntil: 'networkidle' });
  await page.click('button:has-text("Eksport Koridorlari")');
  await page.waitForTimeout(2000);

  const mapContainer = page.locator('[aria-label*="eksport koridorlari"]').first();
  await mapContainer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await mapContainer.screenshot({ path: 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6/maplibre-inner-view.png' });

  // Test clicking EU or CN directly on map canvas:
  // Let's test hover over China:
  const bbox = await mapContainer.boundingBox();
  if (bbox) {
    // Hover near China coordinates (right of Tashkent)
    await page.mouse.move(bbox.x + bbox.width * 0.72, bbox.y + bbox.height * 0.5);
    await page.waitForTimeout(500);
    await mapContainer.screenshot({ path: 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6/maplibre-hover-tooltip.png' });
  }

  await browser.close();
  console.log('Saved map screenshots.');
})();

