const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function capture() {
  const port = 3010;
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
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'mobile-360', width: 360, height: 740 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const res = await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });
    console.log(`[${vp.name}] Status:`, res.status());

    const filePath = path.join(dir, `phase2-prod-${vp.name}-hero.png`);
    await page.screenshot({
      path: filePath,
      clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) }
    });
    console.log(`Saved screenshot: ${filePath}`);
  }

  // Capture mobile menu open
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });
  const hamburger = page.locator('button[aria-label*="Menyuni"]');
  await hamburger.click();
  await page.waitForTimeout(300);
  const mobileMenuFile = path.join(dir, 'phase2-prod-mobile-390-menu-open.png');
  await page.screenshot({
    path: mobileMenuFile,
    clip: { x: 0, y: 0, width: 390, height: 500 }
  });
  console.log(`Saved mobile menu screenshot: ${mobileMenuFile}`);

  await browser.close();
  server.kill('SIGTERM');
  console.log('All screenshots captured successfully.');
}

capture().catch(console.error);
