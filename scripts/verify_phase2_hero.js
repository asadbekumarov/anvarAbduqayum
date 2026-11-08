const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function main() {
  console.log('Starting Next.js production server on port 3006...');
  const nextServer = spawn('npx', ['next', 'start', '-p', '3006'], {
    cwd: 'D:\\projects\\anvarAbduqayum',
    shell: true,
    stdio: 'pipe'
  });

  // Wait for server to start
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve(); // Proceed anyway after 6s
    }, 6000);

    nextServer.stdout.on('data', (data) => {
      const msg = data.toString();
      console.log('[Server stdout]', msg.trim());
      if (msg.includes('Ready') || msg.includes('started server on') || msg.includes('http://localhost:3006')) {
        clearTimeout(timer);
        resolve();
      }
    });

    nextServer.stderr.on('data', (data) => {
      console.error('[Server stderr]', data.toString().trim());
    });
  });

  console.log('Server initialized. Launching browser...');
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'mobile-360', width: 360, height: 740 }
  ];

  const screenshotsDir = path.join('D:\\projects\\anvarAbduqayum', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const results = [];

  for (const vp of viewports) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    
    console.log(`Navigating to http://localhost:3006/uz at ${vp.width}x${vp.height}...`);
    await page.goto('http://localhost:3006/uz', { waitUntil: 'networkidle' });
    
    // Evaluate horizontal overflow
    const overflowInfo = await page.evaluate(() => {
      const docEl = document.documentElement;
      const body = document.body;
      const docScrollWidth = docEl.scrollWidth;
      const docClientWidth = docEl.clientWidth;
      const winInnerWidth = window.innerWidth;
      const bodyScrollWidth = body ? body.scrollWidth : 0;
      return {
        docScrollWidth,
        docClientWidth,
        winInnerWidth,
        bodyScrollWidth,
        hasOverflow: docScrollWidth > winInnerWidth || (body && bodyScrollWidth > winInnerWidth)
      };
    });

    console.log(`Viewport ${vp.name} (${vp.width}px):`, overflowInfo);
    results.push({ viewport: vp.name, width: vp.width, ...overflowInfo });

    // Hero screenshot (first ~1000px)
    const heroScreenshotPath = path.join(screenshotsDir, `phase2-prod-${vp.name}-hero.png`);
    await page.screenshot({
      path: heroScreenshotPath,
      clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 950) }
    });
    console.log(`Saved screenshot: ${heroScreenshotPath}`);

    await page.close();
  }

  await browser.close();
  nextServer.kill('SIGTERM');

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.table(results);
  const anyOverflow = results.some(r => r.hasOverflow);
  console.log(`Overflow Check: ${anyOverflow ? 'FAILED' : 'PASSED (0px horizontal overflow across all viewports)'}`);
  process.exit(anyOverflow ? 1 : 0);
}

main().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});

