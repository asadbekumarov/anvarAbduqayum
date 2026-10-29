import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDirName = process.argv[2] || 'before';
const baseOutputDir = path.resolve(process.cwd(), 'screenshots', outDirName);

if (!fs.existsSync(baseOutputDir)) {
  fs.mkdirSync(baseOutputDir, { recursive: true });
}

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
];

const sections = [
  { name: 'navbar', selector: 'header' },
  { name: 'hero', selector: '#hero' },
  { name: 'hamkorlar', selector: '#hamkorlar' },
  { name: 'xizmatlar', selector: '#xizmatlar' },
  { name: 'bosqichlar', selector: '#bosqichlar' },
  { name: 'ekspert', selector: '#ekspert' },
  { name: 'natijalar', selector: '#natijalar' },
  { name: 'kitob', selector: '#kitob' },
  { name: 'faq', selector: '#faq' },
  { name: 'aloqa', selector: '#aloqa' },
  { name: 'footer', selector: 'footer' }
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrollToBottomSlowly(page) {
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 100;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise((r) => setTimeout(r, delay));
    }
    window.scrollTo(0, 0);
  });
  await sleep(1500);
}

async function run() {
  console.log(`Starting screenshots capture into: ${baseOutputDir}`);
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader']
  });

  try {
    for (const vp of viewports) {
      console.log(`\n=== Processing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1
      });
      const page = await context.newPage();

      // Go to /
      await page.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 30000 });
      await sleep(2500);

      // Scroll down to trigger dynamic imports and scroll reveals
      await scrollToBottomSlowly(page);
      await sleep(2000);

      // Fullpage screenshot
      const fullPagePath = path.join(baseOutputDir, `${vp.name}_fullpage.png`);
      console.log(`Taking fullpage screenshot: ${fullPagePath}`);
      await page.screenshot({ path: fullPagePath, fullPage: true });

      // Each section
      for (const sec of sections) {
        try {
          const el = await page.$(sec.selector);
          if (el) {
            await el.scrollIntoViewIfNeeded();
            await sleep(2000); // 2 soniya kut
            const secPath = path.join(baseOutputDir, `${vp.name}_${sec.name}.png`);
            console.log(`Taking section screenshot: ${sec.name} -> ${secPath}`);
            await el.screenshot({ path: secPath });
          } else {
            console.warn(`Section element not found: ${sec.selector}`);
          }
        } catch (err) {
          console.error(`Failed to capture ${sec.name} on ${vp.name}:`, err.message);
        }
      }

      await context.close();
    }

    // Additional check for RU locale on mobile & desktop to detect text overflow
    for (const vp of [viewports[0], viewports[2]]) {
      console.log(`\n=== Checking RU locale on ${vp.name} ===`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1
      });
      const page = await context.newPage();
      await page.goto('http://localhost:3000/ru', { waitUntil: 'load', timeout: 30000 });
      await sleep(2500);
      await scrollToBottomSlowly(page);
      await sleep(2000);
      const ruPath = path.join(baseOutputDir, `${vp.name}_ru_fullpage.png`);
      await page.screenshot({ path: ruPath, fullPage: true });
      await context.close();
    }

    console.log('\nAll screenshots taken successfully!');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('Screenshot run failed:', err);
  process.exit(1);
});
