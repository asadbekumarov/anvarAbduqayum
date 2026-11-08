const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function main() {
  console.log('--- TESTING NEXT.JS PRODUCTION IMPLEMENTATION (VARIANT A MOBILE HERO) ---');

  const port = 3014;
  console.log(`Starting server on port ${port}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    cwd: 'D:\\projects\\anvarAbduqayum',
    shell: true,
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 4500));

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const dir = path.join('D:\\projects\\anvarAbduqayum', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const viewports = [
    { name: 'mobile-320', width: 320, height: 620 },
    { name: 'mobile-360', width: 360, height: 740 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1440', width: 1440, height: 900 }
  ];

  const results = [];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const res = await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        innerWidth: window.innerWidth,
        hasOverflow: doc.scrollWidth > window.innerWidth
      };
    });

    const isMobile = vp.width < 768;
    const shotName = isMobile
      ? `phase2-prod-${vp.name}-variant-a.png`
      : `phase2-prod-${vp.name}-hero.png`;
    const shotPath = path.join(dir, shotName);

    await page.screenshot({
      path: shotPath,
      clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) }
    });

    results.push({
      name: vp.name,
      width: vp.width,
      status: res.status(),
      hasOverflow: overflow.hasOverflow,
      path: shotPath
    });
    console.log(`  ✓ ${vp.name} (${vp.width}px): Status=${res.status()}, Overflow=${overflow.hasOverflow ? 'FAIL' : '0px (PASS)'}`);
  }

  // Verify navigation destinations
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });

  const servicesNavHref = await page.locator('header nav a[href*="#xizmatlar"]').getAttribute('href');
  const portfolioNavHref = await page.locator('header nav a[href*="#portfel"]').getAttribute('href');
  const heroSecondaryHref = await page.locator('#hero a[href*="#xizmatlar"]').first().getAttribute('href');
  const anchorExists = await page.$('#xizmatlar');

  console.log('\n--- NAVIGATION DESTINATIONS VERIFICATION ---');
  console.log('Services Nav href:', servicesNavHref);
  console.log('Businesses Nav href:', portfolioNavHref);
  console.log('Hero Secondary CTA href:', heroSecondaryHref);
  console.log('#xizmatlar anchor exists in DOM:', !!anchorExists);

  await browser.close();
  server.kill('SIGTERM');

  console.log('\n--- VERIFICATION FINISHED SUCCESSFULLY ---');
  fs.writeFileSync('screenshots/variant-a-production-verification.json', JSON.stringify({
    results,
    navigation: {
      servicesNavHref,
      portfolioNavHref,
      heroSecondaryHref,
      anchorExists: !!anchorExists
    }
  }, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

