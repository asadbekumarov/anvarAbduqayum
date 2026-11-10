const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const outDir = path.resolve(__dirname, '../public/audit-screenshots');

  // Check RU & EN Desktop
  for (const loc of ['ru', 'en']) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:3015/${loc}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => {
      const img = document.querySelector('.portrait-image-wrapper img');
      return img && img.complete && img.naturalWidth > 0 && img.offsetHeight > 100;
    }, { timeout: 10000 }).catch(() => {});
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const titleText = await page.locator('#hero-heading').innerText();
    const metricsText = await page.locator('#hero [aria-label="Tasdiqlangan Sanoat Ko\'rsatkichlari"]').innerText();
    console.log(`[${loc.toUpperCase()}] Overflow: ${overflow} | Title: ${titleText}`);
    console.log(`[${loc.toUpperCase()}] Metrics:\n${metricsText}\n`);
  }

  // Capture 360px mobile & 390px hero-bottom clearance screenshot
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'phase3_hero_mobile_360px.png'), fullPage: false });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const hero = document.getElementById('hero');
    if (hero) {
      const bottomScroll = hero.offsetTop + hero.offsetHeight - window.innerHeight;
      window.scrollTo({ top: Math.max(0, bottomScroll), behavior: 'instant' });
    }
  });
  await page.waitForFunction(() => {
    const img = document.querySelector('.portrait-image-wrapper img');
    return img && img.complete && img.naturalWidth > 0 && img.offsetHeight > 100;
  }, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, 'phase3_hero_mobile_390px_bottom.png'), fullPage: false });

  await browser.close();
})();

