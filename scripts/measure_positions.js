const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1000);
  
  await p.evaluate(() => {
    document.getElementById('media').style.scrollMarginTop = '-12px';
  });

  await p.locator('header nav a[href*="#media"]').click();
  await p.waitForTimeout(2000);
  
  const res = await p.evaluate(() => {
    const h = document.querySelector('header');
    const m = document.getElementById('media');
    return {
      headerHeight: h ? h.offsetHeight : 0,
      headerBottom: h ? h.getBoundingClientRect().bottom : 0,
      mediaTop: m ? m.getBoundingClientRect().top : 0,
      gap: m.getBoundingClientRect().top - h.getBoundingClientRect().bottom,
      scrollY: window.scrollY
    };
  });
  console.log(JSON.stringify(res, null, 2));

  await p.screenshot({ path: 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6/media-flush.png' });
  await b.close();
})();
