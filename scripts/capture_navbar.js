const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop screenshot
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(600);
  await pageDesktop.screenshot({ path: 'public/navbar-desktop.png', clip: { x: 0, y: 0, width: 1440, height: 160 } });

  // 2. Tablet (1080px - previous dead zone) screenshot
  const pageTablet = await browser.newPage({ viewport: { width: 1080, height: 800 } });
  await pageTablet.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await pageTablet.waitForTimeout(600);
  await pageTablet.screenshot({ path: 'public/navbar-tablet-1080.png', clip: { x: 0, y: 0, width: 1080, height: 160 } });

  // 3. Mobile Drawer open screenshot
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(600);
  const burger = await pageMobile.locator('button[aria-controls="mobile-drawer-panel"]').first();
  if (await burger.isVisible()) {
    await burger.click();
    await pageMobile.waitForTimeout(600);
  }
  await pageMobile.screenshot({ path: 'public/navbar-mobile-drawer.png' });

  await browser.close();
  console.log('ALL_SCREENSHOTS_CAPTURED');
})();

