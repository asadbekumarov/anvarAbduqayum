const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3000/uz#portfel', { waitUntil: 'networkidle' });
  const btn = page.locator('button:has-text("Eksport Koridorlari")');
  await btn.click();
  await page.waitForTimeout(3000);

  await browser.close();
})();

