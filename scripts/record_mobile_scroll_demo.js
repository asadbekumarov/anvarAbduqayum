const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function recordScrollDemo() {
  const videoDir = path.resolve('screenshots/video');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: videoDir,
      size: { width: 390, height: 844 },
    },
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Smooth scroll from Hero to Dossier
  await page.evaluate(async () => {
    const el = document.getElementById('xizmatlar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1500);

  // Toggle item 2
  const acc2 = page.locator('#accordion-btn-manufacturing');
  await acc2.click();
  await page.waitForTimeout(800);

  // Scroll to CTA in item 2
  const cta2 = page.locator('#accordion-panel-manufacturing a[href="/uz/bron"]');
  await cta2.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  // Toggle item 3
  const acc3 = page.locator('#accordion-btn-export');
  await acc3.click();
  await page.waitForTimeout(800);

  const cta3 = page.locator('#accordion-panel-export a[href="/uz/bron"]');
  await cta3.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  // Close context to save video
  await page.close();
  await context.close();
  await browser.close();

  // Find the video file generated
  const files = fs.readdirSync(videoDir).filter((f) => f.endsWith('.webm'));
  if (files.length > 0) {
    const latest = files[files.length - 1];
    const targetPath = path.resolve('screenshots/phase2-2-mobile-scroll-demo.webm');
    fs.copyFileSync(path.join(videoDir, latest), targetPath);
    console.log('Video saved to screenshots/phase2-2-mobile-scroll-demo.webm');
  }
}

recordScrollDemo();

