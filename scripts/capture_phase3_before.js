const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const outputDir = path.resolve(__dirname, '../public/audit-screenshots');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Desktop 1440x900
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(outputDir, 'phase3_before_hero_1440x900.png'),
    fullPage: false
  });
  console.log('Saved phase3_before_hero_1440x900.png');

  // Mobile 390x844
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(outputDir, 'phase3_before_hero_390px.png'),
    fullPage: false
  });
  console.log('Saved phase3_before_hero_390px.png');

  // Open mobile nav in before state
  const burger = await page.$('button[aria-label="Menyuni ochish yoki yopish"]');
  if (burger) {
    await burger.click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outputDir, 'phase3_before_mobile_nav_open.png'),
      fullPage: false
    });
    console.log('Saved phase3_before_mobile_nav_open.png');
  }

  await browser.close();
})();

