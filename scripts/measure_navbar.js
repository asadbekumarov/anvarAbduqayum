const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  for (const w of [1024, 1150, 1200, 1280, 1366, 1440]) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    await p.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
    const metrics = await p.evaluate(() => {
      const header = document.querySelector('header');
      const container = header.querySelector('.max-w-\\[1320px\\]');
      const cRect = container.getBoundingClientRect();
      const row = container.firstElementChild;
      const rRect = row.getBoundingClientRect();
      const rightTools = row.lastElementChild;
      const rtRect = rightTools.getBoundingClientRect();
      return {
        viewportW: window.innerWidth,
        containerRight: cRect.right,
        containerWidth: cRect.width,
        rowRight: rRect.right,
        rowWidth: rRect.width,
        rightToolsRight: rtRect.right,
        overflowPx: Math.round(rtRect.right - rRect.right)
      };
    });
    console.log(w + 'px:', metrics);
    await p.close();
  }
  await b.close();
})();
