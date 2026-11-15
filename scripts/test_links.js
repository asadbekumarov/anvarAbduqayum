const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const testResults = [];

  // Links to test: yol, tashabbuslar, portfel, tamoyil, media, aloqa
  const links = ['#yol', '#tashabbuslar', '#tamoyil', '#media', '#aloqa'];

  for (const href of links) {
    const linkLocator = page.locator(`header nav a[href$="${href}"]`).first();
    if (await linkLocator.isVisible()) {
      await linkLocator.click();
      await page.waitForTimeout(500);
      const targetId = href.replace('#', '');
      const data = await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (!el) return { found: false, y: -1 };
        const rect = el.getBoundingClientRect();
        return { found: true, top: rect.top, scrollY: window.scrollY };
      }, targetId);

      testResults.push({ href, ...data });
    } else {
      testResults.push({ href, visible: false });
    }
  }

  console.log(JSON.stringify(testResults, null, 2));
  await browser.close();
})();

