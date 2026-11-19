const { chromium } = require('playwright');

async function audit() {
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'Mobile 320px', width: 320, height: 600 },
    { name: 'Mobile 375px', width: 375, height: 667 },
    { name: 'Mobile 390px', width: 390, height: 844 },
    { name: 'Tablet 768px', width: 768, height: 1024 },
    { name: 'Laptop 1024px', width: 1024, height: 768 },
    { name: 'Desktop 1280px', width: 1280, height: 800 },
    { name: 'Wide 1440px', width: 1440, height: 900 }
  ];

  const routes = [
    '/uz',
    '/uz/bron',
    '/uz/hamkorlik',
    '/uz/kutubxona',
    '/uz/test',
    '/uz/portfel/toybola',
    '/uz/export'
  ];

  const issues = [];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();

    for (const route of routes) {
      const url = `http://localhost:3055${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      } catch (e) {
        issues.push({ vp: vp.name, route, error: `Navigation failed: ${e.message}` });
        continue;
      }

      // Check horizontal overflow
      const overflowData = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        const hasOverflow = docWidth > winWidth || bodyWidth > winWidth;
        
        // Find elements that exceed winWidth
        const overflowingElements = [];
        if (hasOverflow) {
          const all = document.querySelectorAll('*');
          for (const el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > winWidth + 1 && el.offsetWidth > 0 && el.offsetHeight > 0) {
              const tag = el.tagName.toLowerCase();
              const id = el.id ? `#${el.id}` : '';
              const cls = el.className && typeof el.className === 'string' ? `.${el.className.split(' ').slice(0, 3).join('.')}` : '';
              overflowingElements.push({
                selector: `${tag}${id}${cls}`,
                right: rect.right,
                width: rect.width,
                windowWidth: winWidth
              });
              if (overflowingElements.length >= 5) break;
            }
          }
        }
        return { hasOverflow, docWidth, winWidth, overflowingElements };
      });

      if (overflowData.hasOverflow) {
        issues.push({
          vp: vp.name,
          route,
          type: 'OVERFLOW',
          docWidth: overflowData.docWidth,
          winWidth: overflowData.winWidth,
          elements: overflowData.overflowingElements
        });
      }
    }
    await context.close();
  }

  await browser.close();
  console.log(JSON.stringify(issues, null, 2));
}

audit().catch(console.error);
