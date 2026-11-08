const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureFinalComparison() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../public/audit-screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const baseDir = path.resolve(__dirname, '../public/hallmark-exploration');

  const concepts = [
    {
      id: 'concept1',
      name: 'concept1_refined_authority',
      file: path.join(baseDir, 'concept-1-refined-authority.html')
    },
    {
      id: 'concept2',
      name: 'concept2_industrial_cinematic',
      file: path.join(baseDir, 'concept-2-industrial-cinematic.html')
    },
    {
      id: 'concept3',
      name: 'concept3_luxury_editorial',
      file: path.join(baseDir, 'concept-3-luxury-editorial.html')
    }
  ];

  console.log('--- 1. Capturing Individual Concepts (Hero Viewport, Full Desktop, Full Mobile) ---');

  for (const c of concepts) {
    const fileUrl = 'file:///' + c.file.replace(/\\/g, '/');

    // Desktop Hero Viewport (1440 x 900)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    await page.screenshot({
      path: path.join(outDir, `${c.id}_hero_1440x900.png`),
      fullPage: false
    });
    console.log(`Saved: ${c.id}_hero_1440x900.png`);

    // Full-page Desktop at 1440px
    await page.screenshot({
      path: path.join(outDir, `${c.id}_full_desktop_1440px.png`),
      fullPage: true
    });
    console.log(`Saved: ${c.id}_full_desktop_1440px.png`);

    // Full-page Mobile at 390px
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    await page.screenshot({
      path: path.join(outDir, `${c.id}_full_mobile_390px.png`),
      fullPage: true
    });
    console.log(`Saved: ${c.id}_full_mobile_390px.png`);
  }

  // 2. Capture Side-by-Side Mobile Comparison
  console.log('--- 2. Capturing 3 Mobile Concepts Side-by-Side ---');
  const mobileCompUrl = 'file:///' + path.join(baseDir, 'side-by-side-mobile.html').replace(/\\/g, '/');
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(mobileCompUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(outDir, 'hallmark_3concepts_side_by_side_mobile.png'),
    fullPage: false
  });
  console.log('Saved: hallmark_3concepts_side_by_side_mobile.png');

  // 3. Capture Side-by-Side Desktop Comparison (Scaled/Wide Viewport)
  console.log('--- 3. Capturing 3 Desktop Concepts Side-by-Side ---');
  // For side-by-side desktop, 3 columns of 1440px = 4400px width.
  await page.setViewportSize({ width: 4400, height: 2000 });
  const desktopCompUrl = 'file:///' + path.join(baseDir, 'side-by-side-desktop.html').replace(/\\/g, '/');
  await page.goto(desktopCompUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  await page.screenshot({
    path: path.join(outDir, 'hallmark_3concepts_side_by_side_desktop.png'),
    fullPage: false
  });
  console.log('Saved: hallmark_3concepts_side_by_side_desktop.png');

  await browser.close();
  console.log('All comparisons captured successfully!');
}

captureFinalComparison().catch(err => {
  console.error('Error during comparison capture:', err);
  process.exit(1);
});

