const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function main() {
  console.log('--- STARTING PHASE 2.1 FINAL POLISH VERIFICATION ---');

  const port = 3012;
  console.log(`Starting Next.js production server on port ${port}...`);
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
    { name: 'mobile-320', width: 320, height: 600 },
    { name: 'mobile-360', width: 360, height: 740 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1440', width: 1440, height: 900 }
  ];

  const results = {
    viewports: [],
    mobileMenu: {},
    navigationLabels: [],
    variantsCaptured: []
  };

  // 1. Production viewports & overflow test
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

    const shotPath = path.join(dir, `phase2-prod-${vp.name}-hero.png`);
    await page.screenshot({
      path: shotPath,
      clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 880) }
    });

    results.viewports.push({
      name: vp.name,
      width: vp.width,
      status: res.status(),
      hasOverflow: overflow.hasOverflow,
      path: shotPath
    });
    console.log(`  ✓ ${vp.name} (${vp.width}px): Status=${res.status()}, Overflow=${overflow.hasOverflow ? 'FAIL' : '0px (PASS)'}`);
  }

  // 2. Test Mobile Menu at 320px (extreme narrow width) to verify NO OVERLAP
  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });
  const hamburger = page.locator('button[aria-label*="Menyuni"]');
  await hamburger.click();
  await page.waitForTimeout(300);

  // Check overlap of text and section number
  const overlapCheck = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('[role="dialog"] a'));
    return items.map(item => {
      const label = item.querySelector('span:first-child');
      const num = item.querySelector('span:last-child');
      if (!label || !num) return { hasOverlap: false };
      const labelRect = label.getBoundingClientRect();
      const numRect = num.getBoundingClientRect();
      // Check if rectangles intersect horizontally
      const overlapsHorizontally = !(labelRect.right <= numRect.left || numRect.right <= labelRect.left);
      return {
        labelText: label.innerText.trim(),
        numText: num.innerText.trim(),
        labelRight: labelRect.right,
        numLeft: numRect.left,
        overlaps: overlapsHorizontally
      };
    });
  });

  const menuShotPath = path.join(dir, 'phase2-prod-mobile-320-menu.png');
  await page.screenshot({
    path: menuShotPath,
    clip: { x: 0, y: 0, width: 320, height: 480 }
  });
  console.log('  ✓ 320px Mobile Menu captured:', menuShotPath);
  console.log('  ✓ Overlap analysis at 320px:', overlapCheck);
  results.mobileMenu = { at320px: overlapCheck, screenshot: menuShotPath };

  // 3. Capture Isolated Mobile Hero Variants (Variant A & Variant B)
  console.log('\nCapturing isolated mobile hero variants from mobile-hero-variants.html...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${port}/mobile-hero-variants.html`, { waitUntil: 'networkidle' });

  // Full comparison screenshot
  await page.setViewportSize({ width: 860, height: 950 });
  const bothShot = path.join(dir, 'mobile-hero-comparison-both.png');
  await page.screenshot({ path: bothShot, fullPage: true });
  console.log('  ✓ Saved both variants comparison screenshot:', bothShot);

  // Variant A isolated shot at 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => showOnly('variant-a'));
  await page.waitForTimeout(200);
  const varAShot = path.join(dir, 'variant-a-mobile-390.png');
  await page.screenshot({ path: varAShot, fullPage: true });
  console.log('  ✓ Saved Variant A screenshot:', varAShot);

  // Variant B isolated shot at 390px
  await page.evaluate(() => showOnly('variant-b'));
  await page.waitForTimeout(200);
  const varBShot = path.join(dir, 'variant-b-mobile-390.png');
  await page.screenshot({ path: varBShot, fullPage: true });
  console.log('  ✓ Saved Variant B screenshot:', varBShot);

  await browser.close();
  server.kill('SIGTERM');

  console.log('\n--- VERIFICATION FINISHED SUCCESSFULLY ---');
  fs.writeFileSync('screenshots/polish-verification.json', JSON.stringify(results, null, 2));
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

