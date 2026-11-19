const { chromium } = require('playwright');

async function detailedAudit() {
  const browser = await chromium.launch({ headless: true });
  const checks = [];

  // Check 1: 1024px Navbar space
  const page1024 = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page1024.goto('http://localhost:3055/uz', { waitUntil: 'networkidle' });
  
  const navEvaluation = await page1024.evaluate(() => {
    const nav = document.querySelector('header nav');
    const header = document.querySelector('header');
    const brand = document.querySelector('header a[href="/uz"]');
    const tools = document.querySelector('header div.flex.items-center.gap-1\\.5');
    return {
      headerWidth: header ? header.clientWidth : 0,
      navVisible: nav ? window.getComputedStyle(nav).display !== 'none' : false,
      navWidth: nav ? nav.offsetWidth : 0,
      brandWidth: brand ? brand.offsetWidth : 0,
    };
  });
  checks.push({ test: '1024px Navbar', ...navEvaluation });

  // Check 2: Mobile drawer on 320px
  const page320 = await browser.newPage({ viewport: { width: 320, height: 600 } });
  await page320.goto('http://localhost:3055/uz', { waitUntil: 'networkidle' });
  const menuBtn = page320.locator('button[aria-label="Menyuni ochish"], button[aria-controls="mobile-drawer-panel"]').first();
  await menuBtn.click();
  await page320.waitForTimeout(300);

  const drawerState = await page320.evaluate(() => {
    const drawer = document.getElementById('mobile-drawer-panel');
    if (!drawer) return { found: false };
    const rect = drawer.getBoundingClientRect();
    const scrollHeight = drawer.scrollHeight;
    const clientHeight = drawer.clientHeight;
    return {
      found: true,
      width: rect.width,
      height: rect.height,
      scrollHeight,
      clientHeight,
      scrollable: scrollHeight > clientHeight
    };
  });
  checks.push({ test: 'Mobile Drawer 320px', ...drawerState });

  // Check 3: Portfolio Modal on 320px
  const cardTrigger = page320.locator('[data-portfolio-trigger="true"]').first();
  if (await cardTrigger.count() > 0) {
    // close drawer first
    await page320.keyboard.press('Escape');
    await page320.waitForTimeout(200);
    await cardTrigger.click();
    await page320.waitForTimeout(300);
    const modalState = await page320.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return { found: false };
      const content = modal.querySelector('div.bg-\\[var\\(--bg-surface-warm\\)\\]');
      const rect = content ? content.getBoundingClientRect() : null;
      return {
        found: true,
        dialogWidth: rect ? rect.width : 0,
        dialogHeight: rect ? rect.height : 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      };
    });
    checks.push({ test: 'Portfolio Modal 320px', ...modalState });
  }

  // Check 4: Check other pages at 320px
  const otherPages = ['/uz/bron', '/uz/hamkorlik', '/uz/kutubxona', '/uz/test', '/uz/portfel/toybola', '/uz/export'];
  for (const p of otherPages) {
    await page320.goto(`http://localhost:3055${p}`, { waitUntil: 'networkidle' });
    const pState = await page320.evaluate(() => {
      const h1 = document.querySelector('h1');
      const h1Rect = h1 ? h1.getBoundingClientRect() : null;
      return {
        h1Found: !!h1,
        h1Width: h1Rect ? h1Rect.width : 0,
        h1Text: h1 ? h1.textContent.slice(0, 30) : '',
        windowWidth: window.innerWidth
      };
    });
    checks.push({ test: `Page ${p} at 320px`, ...pState });
  }

  await browser.close();
  console.log(JSON.stringify(checks, null, 2));
}

detailedAudit().catch(console.error);
