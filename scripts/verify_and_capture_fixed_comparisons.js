const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verifyAndCapture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../public/audit-screenshots');
  const baseDir = path.resolve(__dirname, '../public/hallmark-exploration');

  const verificationResults = {
    timestamp: new Date().toISOString(),
    desktopComparison: {},
    mobileComparison: {},
    individualConcepts: {}
  };

  // 1. Verify and Capture Individual Concepts
  const concepts = [
    {
      id: 'concept1',
      name: 'Concept 1 — Refined Authority',
      file: path.join(baseDir, 'concept-1-refined-authority.html'),
      headlineCheck: 'Egasisiz ishlaydigan'
    },
    {
      id: 'concept2',
      name: 'Concept 2 — Industrial Cinematic',
      file: path.join(baseDir, 'concept-2-industrial-cinematic.html'),
      headlineCheck: 'SANOAT. AVTONOMIYA. EKSPORT.'
    },
    {
      id: 'concept3',
      name: 'Concept 3 — Luxury Editorial',
      file: path.join(baseDir, 'concept-3-luxury-editorial.html'),
      headlineCheck: 'Biznesni egasisiz boshqarish'
    }
  ];

  console.log('--- 1. Capturing and Verifying Individual Concepts ---');
  for (const c of concepts) {
    const fileUrl = 'file:///' + c.file.replace(/\\/g, '/');

    // Desktop Hero 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    const desktopHeroInfo = await page.evaluate((headlineCheck) => {
      const h1 = document.querySelector('h1');
      const bodyText = document.body.innerText;
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        loaded: img.complete && img.naturalWidth > 0
      }));

      return {
        hasHeadline: bodyText.includes(headlineCheck),
        h1Text: h1 ? h1.innerText.replace(/\s+/g, ' ').trim() : null,
        imagesLoaded: images.every(i => i.loaded),
        imageCount: images.length
      };
    }, c.headlineCheck);

    await page.screenshot({
      path: path.join(outDir, `${c.id}_hero_1440x900.png`),
      fullPage: false
    });

    // Full Mobile 390px
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(fileUrl, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    await page.screenshot({
      path: path.join(outDir, `${c.id}_full_mobile_390px.png`),
      fullPage: true
    });

    verificationResults.individualConcepts[c.id] = {
      name: c.name,
      desktopHeroVerified: desktopHeroInfo,
      heroScreenshot: `${c.id}_hero_1440x900.png`,
      mobileScreenshot: `${c.id}_full_mobile_390px.png`
    };
    console.log(`Verified & Captured: ${c.id}`);
  }

  // 2. Verify and Capture Desktop Side-by-Side Comparison
  console.log('--- 2. Verifying & Capturing Desktop Side-by-Side Comparison ---');
  const desktopCompFile = path.join(baseDir, 'side-by-side-desktop.html');
  const desktopCompUrl = 'file:///' + desktopCompFile.replace(/\\/g, '/');

  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto(desktopCompUrl, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  const desktopCompCheck = await page.evaluate(() => {
    const panels = ['panelConcept1', 'panelConcept2', 'panelConcept3'];
    const images = ['imgConcept1', 'imgConcept2', 'imgConcept3'];

    const panelResults = {};
    images.forEach((imgId, idx) => {
      const img = document.getElementById(imgId);
      const panel = document.getElementById(panels[idx]);
      panelResults[panels[idx]] = {
        panelExists: !!panel,
        imageExists: !!img,
        imageLoaded: img ? (img.complete && img.naturalWidth > 0) : false,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        notEmpty: img ? (img.naturalWidth > 100 && img.naturalHeight > 100) : false
      };
    });

    return {
      allPanelsVerified: Object.values(panelResults).every(p => p.notEmpty),
      panels: panelResults
    };
  });

  await page.screenshot({
    path: path.join(outDir, 'hallmark_3concepts_side_by_side_desktop.png'),
    fullPage: false
  });
  verificationResults.desktopComparison = desktopCompCheck;
  console.log('Desktop Side-by-Side check:', desktopCompCheck.allPanelsVerified ? 'SUCCESS' : 'FAILED');

  // 3. Verify and Capture Mobile Side-by-Side Comparison
  console.log('--- 3. Verifying & Capturing Mobile Side-by-Side Comparison ---');
  const mobileCompFile = path.join(baseDir, 'side-by-side-mobile.html');
  const mobileCompUrl = 'file:///' + mobileCompFile.replace(/\\/g, '/');

  await page.setViewportSize({ width: 1400, height: 1100 });
  await page.goto(mobileCompUrl, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  const mobileCompCheck = await page.evaluate(() => {
    const columns = ['mobileColConcept1', 'mobileColConcept2', 'mobileColConcept3'];
    const images = ['imgMobileConcept1', 'imgMobileConcept2', 'imgMobileConcept3'];

    const colResults = {};
    images.forEach((imgId, idx) => {
      const img = document.getElementById(imgId);
      const col = document.getElementById(columns[idx]);
      colResults[columns[idx]] = {
        colExists: !!col,
        imageExists: !!img,
        imageLoaded: img ? (img.complete && img.naturalWidth > 0) : false,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        notEmpty: img ? (img.naturalWidth > 100 && img.naturalHeight > 100) : false
      };
    });

    return {
      allDevicesVerified: Object.values(colResults).every(c => c.notEmpty),
      columns: colResults
    };
  });

  await page.screenshot({
    path: path.join(outDir, 'hallmark_3concepts_side_by_side_mobile.png'),
    fullPage: false
  });
  verificationResults.mobileComparison = mobileCompCheck;
  console.log('Mobile Side-by-Side check:', mobileCompCheck.allDevicesVerified ? 'SUCCESS' : 'FAILED');

  // Write verification report
  fs.writeFileSync(
    path.join(outDir, 'fixed_comparisons_verification.json'),
    JSON.stringify(verificationResults, null, 2)
  );

  await browser.close();
  console.log('Automated verification and capture finished successfully!');
}

verifyAndCapture().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});

