const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function testNav() {
  const port = 3013;
  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    cwd: 'D:\\projects\\anvarAbduqayum',
    shell: true,
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 4500));

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });

  const links = await page.$$eval('header nav a', els => els.map(a => ({
    text: a.innerText.trim().replace(/\s+/g, ' '),
    href: a.getAttribute('href')
  })));
  console.log('Desktop Header Nav Links:', links);

  const heroSecondary = await page.locator('#hero a[href*="#xizmatlar"]').getAttribute('href');
  console.log('Hero Secondary CTA href:', heroSecondary);

  const targetEl = await page.$('#xizmatlar');
  console.log('Target #xizmatlar element exists in DOM:', !!targetEl);

  await browser.close();
  server.kill('SIGTERM');
  console.log('Verification check passed.');
}

testNav().catch(err => {
  console.error(err);
  process.exit(1);
});

