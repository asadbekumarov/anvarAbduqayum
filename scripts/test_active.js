const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/ru', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scroll to section #tamoyil
  await page.evaluate(() => {
    const el = document.getElementById('tamoyil');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top - 80);
    }
  });
  await page.waitForTimeout(1000);

  const activeData = await page.evaluate(() => {
    const activeLink = document.querySelector('header nav a[aria-current="true"]');
    return {
      activeText: activeLink ? activeLink.innerText : 'NONE',
      innerHTML: activeLink ? activeLink.innerHTML : 'NONE',
      scrollY: window.scrollY
    };
  });

  console.log(JSON.stringify(activeData, null, 2));
  await page.screenshot({ path: 'public/test-tamoyil-exact.png', clip: { x: 300, y: 0, width: 800, height: 80 } });
  await browser.close();
})();

