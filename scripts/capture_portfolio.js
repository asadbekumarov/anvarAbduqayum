const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const element = await page.locator('#portfel');
  if (element) {
    await element.screenshot({ path: 'public/portfolio-redesign.png' });
    console.log('Saved screenshot to public/portfolio-redesign.png');
  } else {
    console.log('Element #portfel not found');
  }
  await browser.close();
})();

