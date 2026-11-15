const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto('http://localhost:3000/uz#portfel', { waitUntil: 'networkidle' });
  await page.click('button:has-text("Eksport Koridorlari")');
  await page.waitForTimeout(2000);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  const mapContainer = page.locator('[aria-label*="eksport koridorlari"]').first();
  const bbox = await mapContainer.boundingBox();

  if (bbox) {
    // Click on China (east of Kazakhstan / Uzbekistan)
    await page.mouse.click(bbox.x + bbox.width * 0.75, bbox.y + bbox.height * 0.55);
    await page.waitForTimeout(1200);

    const rightPanelTitle = await page.locator('.lg\\:col-span-5 h4').first().innerText();
    console.log('Right panel title after map click:', rightPanelTitle);

    // Verify top button states (none of KZ, RU, KG, TJ, MENA should be selected if China was clicked)
    const activePill = page.locator('[data-layoutid="activeCorridorPill"]');
    console.log('Active button pill count:', await activePill.count());

    await page.screenshot({ path: path.join(outDir, 'maplibre-clicked-map-region.png') });
  }

  await browser.close();
  console.log('Tested map click.');
})();

