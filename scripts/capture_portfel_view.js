const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Click #portfel link in navbar
  const link = page.locator('header nav a[href$="#portfel"]').first();
  await link.click();
  await page.waitForTimeout(1000);

  // Take viewport screenshot showing what user sees
  await page.screenshot({ path: 'public/portfolio-clicked-view.png' });

  // Also take full element screenshot without navbar overlay by hiding header
  await page.evaluate(() => {
    const hdr = document.querySelector('header');
    if (hdr) hdr.style.display = 'none';
  });
  const el = page.locator('#portfel');
  await el.screenshot({ path: 'public/portfolio-unobstructed.png' });

  await browser.close();
  console.log('PORTFOLIO_CAPTURES_SUCCESS');
})();

