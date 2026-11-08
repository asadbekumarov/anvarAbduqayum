const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function check404s() {
  const port = 3008;
  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    cwd: 'D:\\projects\\anvarAbduqayum',
    shell: true,
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 4000));

  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('response', res => {
    if (res.status() >= 400) {
      console.log(`HTTP ${res.status()}: ${res.url()}`);
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`Console error: ${msg.text()}`);
    }
  });

  console.log('Testing http://localhost:3008/uz ...');
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });

  console.log('\nTesting http://localhost:3008/uz/bron ...');
  await page.goto(`http://localhost:${port}/uz/bron`, { waitUntil: 'networkidle' });

  // Test Hero Primary button click to see where it actually navigates:
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });
  const heroPrimary = page.locator('#hero a[href*="/bron"]').first();
  const hrefAttr = await heroPrimary.getAttribute('href');
  console.log('Hero CTA href attribute:', hrefAttr);
  await heroPrimary.click();
  await page.waitForTimeout(1000);
  console.log('After clicking Hero CTA, page url is:', page.url());

  await browser.close();
  server.kill('SIGTERM');
  process.exit(0);
}

check404s();

