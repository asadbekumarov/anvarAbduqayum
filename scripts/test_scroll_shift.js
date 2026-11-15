const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2000);

  const beforeOffset = await p.evaluate(() => document.getElementById('media').offsetTop);
  console.log('before click, media offsetTop:', beforeOffset);

  await p.locator('header nav a[href*="#media"]').click();
  await p.waitForTimeout(2500);

  const afterRect = await p.evaluate(() => document.getElementById('media').getBoundingClientRect().top);
  const afterOffset = await p.evaluate(() => document.getElementById('media').offsetTop);
  const scrollY = await p.evaluate(() => window.scrollY);

  console.log('after click, media getBoundingClientRect:', afterRect);
  console.log('after click, media offsetTop:', afterOffset);
  console.log('scrollY:', scrollY);

  await b.close();
})();

