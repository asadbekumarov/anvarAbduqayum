const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.goto('http://localhost:3000/uz', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(1000);
  const text = await p.locator('body').innerText();
  console.log('Body text snippet:\n', text.slice(0, 500));
  await b.close();
})();
