const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Capturing S01: Hero...');
  await page.goto('http://localhost:3000/uz', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'replica/clone-screens/S01-hero.png' });

  console.log('Capturing S02: Portfolio...');
  await page.goto('http://localhost:3000/uz#portfel', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'replica/clone-screens/S02-portfolio.png' });

  console.log('Capturing S03: Timeline...');
  await page.goto('http://localhost:3000/uz#yol', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'replica/clone-screens/S03-timeline.png' });

  console.log('Capturing S04: Contact...');
  await page.goto('http://localhost:3000/uz#aloqa', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'replica/clone-screens/S04-contact.png' });

  console.log('Capturing S05: Bron...');
  await page.goto('http://localhost:3000/uz/bron', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'replica/clone-screens/S05-bron.png' });

  await browser.close();
  console.log('Done capturing clone screens!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
