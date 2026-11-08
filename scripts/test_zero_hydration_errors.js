const { chromium } = require('playwright');

async function testHydration() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push({ url: page.url(), text: msg.text() });
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push({ url: page.url(), text: err.message });
  });

  console.log('Testing /ru direct load...');
  await page.goto('http://localhost:3015/ru', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const ruServicesText = await page.locator('nav a[href="#xizmatlar"] span').nth(1).textContent();
  console.log('RU Nav link text:', ruServicesText);

  console.log('Testing language switch to UZ...');
  const uzBtn = page.locator('button[aria-label="UZ tiliga o\'tish"], button[aria-label="UZ tili"]').first();
  await uzBtn.click();
  await page.waitForTimeout(1000);

  const uzServicesText = await page.locator('nav a[href="#xizmatlar"] span').nth(1).textContent();
  console.log('UZ Nav link text:', uzServicesText);

  console.log('Testing language switch to EN...');
  const enBtn = page.locator('button[aria-label="EN tiliga o\'tish"], button[aria-label="EN tili"]').first();
  await enBtn.click();
  await page.waitForTimeout(1000);

  const enServicesText = await page.locator('nav a[href="#xizmatlar"] span').nth(1).textContent();
  console.log('EN Nav link text:', enServicesText);

  console.log('Testing root / redirect...');
  await page.goto('http://localhost:3015/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  console.log('Final URL after /:', page.url());

  console.log('--------------------------------------------------');
  console.log('Total console errors captured:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors:', JSON.stringify(consoleErrors, null, 2));
    process.exit(1);
  } else {
    console.log('ALL HYDRATION TESTS PASSED WITH 0 ERRORS!');
  }

  await browser.close();
}

testHydration();

