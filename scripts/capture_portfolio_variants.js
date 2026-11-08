const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capturePortfolioVariants() {
  const browser = await chromium.launch({ headless: true });
  const results = {
    timestamp: new Date().toISOString(),
    screenshots: [],
    overflowCheck: {},
  };

  const filePath = 'file:///' + path.resolve('public/portfolio-variants.html').replace(/\\/g, '/');

  try {
    // -------------------------------------------------------------
    // 1. DESKTOP 1440px
    // -------------------------------------------------------------
    console.log('Capturing Desktop 1440px...');
    const desktopCtx = await browser.newContext({
      viewport: { width: 1440, height: 1150 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopCtx.newPage();
    await desktopPage.goto(filePath, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(600);

    // Variant A (active by default)
    const varAShot = path.resolve('screenshots/phase2-3-variant-a-desktop-1440.png');
    await desktopPage.screenshot({ path: varAShot });
    results.screenshots.push('screenshots/phase2-3-variant-a-desktop-1440.png');

    // Switch to Variant B
    await desktopPage.locator('.btn-tab').nth(1).click();
    await desktopPage.waitForTimeout(500);

    const varBShot = path.resolve('screenshots/phase2-3-variant-b-desktop-1440.png');
    await desktopPage.screenshot({ path: varBShot });
    results.screenshots.push('screenshots/phase2-3-variant-b-desktop-1440.png');

    // Switch to Side-by-Side
    await desktopPage.locator('.btn-tab').nth(2).click();
    await desktopPage.waitForTimeout(500);

    const compShot = path.resolve('screenshots/phase2-3-comparison-desktop-1440.png');
    await desktopPage.screenshot({ path: compShot });
    results.screenshots.push('screenshots/phase2-3-comparison-desktop-1440.png');

    const dOverflow = await desktopPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['1440px'] = dOverflow;
    await desktopCtx.close();

    // -------------------------------------------------------------
    // 2. MOBILE 390px
    // -------------------------------------------------------------
    console.log('Capturing Mobile 390px...');
    const m390Ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    const m390Page = await m390Ctx.newPage();
    await m390Page.goto(filePath, { waitUntil: 'networkidle' });
    await m390Page.waitForTimeout(600);

    // Variant A Mobile
    const m390AShot = path.resolve('screenshots/phase2-3-variant-a-mobile-390.png');
    await m390Page.screenshot({ path: m390AShot });
    results.screenshots.push('screenshots/phase2-3-variant-a-mobile-390.png');

    // Variant B Mobile
    await m390Page.locator('.btn-tab').nth(1).click();
    await m390Page.waitForTimeout(500);

    const m390BShot = path.resolve('screenshots/phase2-3-variant-b-mobile-390.png');
    await m390Page.screenshot({ path: m390BShot });
    results.screenshots.push('screenshots/phase2-3-variant-b-mobile-390.png');

    const m390Overflow = await m390Page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['390px'] = m390Overflow;
    await m390Ctx.close();

    // -------------------------------------------------------------
    // 3. MOBILE 320px
    // -------------------------------------------------------------
    console.log('Capturing Mobile 320px...');
    const m320Ctx = await browser.newContext({
      viewport: { width: 320, height: 600 },
      deviceScaleFactor: 2,
    });
    const m320Page = await m320Ctx.newPage();
    await m320Page.goto(filePath, { waitUntil: 'networkidle' });
    await m320Page.waitForTimeout(600);

    // Variant A 320px
    const m320AShot = path.resolve('screenshots/phase2-3-variant-a-mobile-320.png');
    await m320Page.screenshot({ path: m320AShot });
    results.screenshots.push('screenshots/phase2-3-variant-a-mobile-320.png');

    // Variant B 320px
    await m320Page.locator('.btn-tab').nth(1).click();
    await m320Page.waitForTimeout(500);

    const m320BShot = path.resolve('screenshots/phase2-3-variant-b-mobile-320.png');
    await m320Page.screenshot({ path: m320BShot });
    results.screenshots.push('screenshots/phase2-3-variant-b-mobile-320.png');

    const m320Overflow = await m320Page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['320px'] = m320Overflow;
    await m320Ctx.close();

    console.log('All portfolio variant screenshots captured successfully!');
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('Error during capture:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

capturePortfolioVariants();
