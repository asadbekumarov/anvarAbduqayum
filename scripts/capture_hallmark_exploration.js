const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureExploration() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../public/audit-screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const baseDir = path.resolve(__dirname, '../public/hallmark-exploration');

  const items = [
    {
      name: 'concept1_refined_authority',
      file: path.join(baseDir, 'concept-1-refined-authority.html')
    },
    {
      name: 'concept2_industrial_cinematic',
      file: path.join(baseDir, 'concept-2-industrial-cinematic.html')
    },
    {
      name: 'concept3_luxury_editorial',
      file: path.join(baseDir, 'concept-3-luxury-editorial.html')
    }
  ];

  console.log('--- Capturing 3 Concepts at 1440px & 390px via direct file URL ---');

  for (const item of items) {
    const fileUrl = 'file:///' + item.file.replace(/\\/g, '/');

    // 1. Desktop 1440px
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(outDir, `${item.name}_desktop_1440px.png`),
      fullPage: false
    });
    console.log(`Captured: ${item.name}_desktop_1440px.png`);

    // Also capture full page desktop for full visual context
    await page.screenshot({
      path: path.join(outDir, `${item.name}_desktop_full.png`),
      fullPage: true
    });

    // 2. Mobile 390px
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(outDir, `${item.name}_mobile_390px.png`),
      fullPage: false
    });

    await page.screenshot({
      path: path.join(outDir, `${item.name}_mobile_full.png`),
      fullPage: true
    });
    console.log(`Captured: ${item.name}_mobile_390px.png`);
  }

  // 3. Capture Exploration Hub & Matrix
  console.log('--- Capturing Exploration Hub & Comparison Matrix ---');
  const hubUrl = 'file:///' + path.join(baseDir, 'index.html').replace(/\\/g, '/');
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto(hubUrl, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(outDir, 'hallmark_exploration_hub_1440px.png'),
    fullPage: false
  });

  // Switch to comparison view in hub
  await page.evaluate(() => {
    switchConcept('comparison');
  });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(outDir, 'hallmark_comparison_matrix_1440px.png'),
    fullPage: false
  });
  console.log('Captured: hallmark_comparison_matrix_1440px.png');

  await browser.close();
  console.log('All exploration captures completed successfully!');
}

captureExploration().catch(err => {
  console.error('Failed to capture:', err);
  process.exit(1);
});
