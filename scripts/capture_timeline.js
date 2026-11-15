const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const link = page.locator('header nav a[href$="#yol"]').first();
  await link.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/timeline-clicked-view.png' });

  // Hide header for clean element shot
  await page.evaluate(() => {
    const hdr = document.querySelector('header');
    if (hdr) hdr.style.display = 'none';
  });
  const el = page.locator('#yol');
  await el.screenshot({ path: 'public/timeline-full.png' });
  await browser.close();
  console.log('TIMELINE_CAPTURES_SUCCESS');
})();

