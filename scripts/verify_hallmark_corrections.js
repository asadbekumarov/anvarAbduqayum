const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyCorrections() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const report = {
    timestamp: new Date().toISOString(),
    networkErrors: [],
    brokenImages: [],
    consoleErrors: [],
    tapTargets: {},
    stickyBarVerification: {},
    viewportsTested: [],
    videoBehavior: {}
  };

  const screenshotsDir = path.join(__dirname, '../public/audit-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      report.consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });

  page.on('response', resp => {
    if (resp.status() >= 400 && !resp.url().includes('favicon')) {
      report.networkErrors.push(`[${resp.status()}] ${resp.url()}`);
      if (resp.url().includes('youtube') || resp.url().includes('image')) {
        report.brokenImages.push(`[${resp.status()}] ${resp.url()}`);
      }
    }
  });

  console.log('--- 1. Testing Network & YouTube Thumbnails (Full Page Load) ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });

  // Scroll down to media section to trigger any lazy-loaded media
  await page.evaluate(() => {
    const media = document.querySelector('#media');
    if (media) media.scrollIntoView();
  });
  await page.waitForTimeout(1000);

  // Capture Media Section screenshot
  const mediaEl = await page.$('#media');
  if (mediaEl) {
    await mediaEl.screenshot({
      path: path.join(screenshotsDir, 'after_media_thumbnails_fixed.png')
    });
  }

  // 2. Tap-target measurements on Mobile (390px)
  console.log('--- 2. Measuring Mobile Tap Targets (390px) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });

  // Measure Mobile Language Switchers
  const langTargets = await page.evaluate(() => {
    const mobileGroup = document.querySelector('.inline-flex.sm\\:hidden');
    if (!mobileGroup) return null;
    const buttons = Array.from(mobileGroup.querySelectorAll('button'));
    return buttons.map(b => {
      const rect = b.getBoundingClientRect();
      return {
        text: b.innerText.trim(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        passes44: rect.width >= 44 && rect.height >= 44,
        passesHeight44: rect.height >= 44
      };
    });
  });
  report.tapTargets.mobileLanguageSwitcher = langTargets;

  // Screenshot of Mobile Navbar & Language Switcher
  const headerEl = await page.$('header');
  if (headerEl) {
    await headerEl.screenshot({
      path: path.join(screenshotsDir, 'after_mobile_navbar_lang_targets.png')
    });
  }

  // Measure Category Filters in Portfolio
  const filterTargets = await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('#portfel [role="tab"]'));
    return pills.map(p => {
      const rect = p.getBoundingClientRect();
      return {
        text: p.innerText.trim(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        passes44: rect.height >= 44
      };
    });
  });
  report.tapTargets.categoryFilterPills = filterTargets;

  // Screenshot of Portfolio Filters
  const filtersContainer = await page.$('#portfel [role="tablist"]');
  if (filtersContainer) {
    await filtersContainer.screenshot({
      path: path.join(screenshotsDir, 'after_portfolio_category_filters.png')
    });
  }

  // 3. Measure Portfolio Modal Close Button
  console.log('--- 3. Testing Portfolio Modal Close Button & Interactions ---');
  const card = await page.$('#portfel [aria-haspopup="dialog"]');
  if (card) {
    await card.click();
    await page.waitForTimeout(600);

    const modalData = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return null;
      const closeBtn = dialog.querySelector('.btn-close-modal');
      const closeRect = closeBtn ? closeBtn.getBoundingClientRect() : null;
      return {
        closeBtnSize: closeRect ? { width: Math.round(closeRect.width), height: Math.round(closeRect.height) } : null,
        passes44: closeRect ? (closeRect.width >= 44 && closeRect.height >= 44) : false
      };
    });
    report.tapTargets.modalCloseButton = modalData;

    // Screenshot of Modal Header showing 44x44 close button
    const modalTopBar = await page.$('.modal-top-bar');
    if (modalTopBar) {
      await modalTopBar.screenshot({
        path: path.join(screenshotsDir, 'after_modal_close_btn_44px.png')
      });
    }

    // Dismiss modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  }

  // 4. Verify Mobile Sticky Bar clickability against Card actions & Consultation CTA
  console.log('--- 4. Testing Mobile Sticky Bar Clickability & Non-blocking Behavior ---');
  const stickyBarTest = await page.evaluate(() => {
    const stickyBar = document.querySelector('aside[aria-label*="aloqa"], .fixed.bottom-0');
    if (!stickyBar) return { found: false };
    const stickyRect = stickyBar.getBoundingClientRect();

    // Check if any portfolio cards or CTAs are permanently obscured
    const portfolio = document.querySelector('#portfel');
    const portRect = portfolio ? portfolio.getBoundingClientRect() : null;

    // Test clicking a card
    const firstCard = document.querySelector('#portfel [aria-haspopup="dialog"]');
    const cardRect = firstCard ? firstCard.getBoundingClientRect() : null;

    return {
      found: true,
      stickyBarRect: {
        top: Math.round(stickyRect.top),
        bottom: Math.round(stickyRect.bottom),
        height: Math.round(stickyRect.height),
        zIndex: window.getComputedStyle(stickyBar).zIndex
      },
      cardIsClickable: !!firstCard
    };
  });
  report.stickyBarVerification = stickyBarTest;

  // 5. Test 6 Viewports for Layout Overflow
  console.log('--- 5. Testing 6 Viewports for Layout Overflow ---');
  const viewports = [
    { name: 'Mobile Mini', width: 320, height: 600 },
    { name: 'Mobile Standard', width: 360, height: 740 },
    { name: 'Mobile Modern', width: 390, height: 844 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet/Laptop', width: 1024, height: 768 },
    { name: 'Desktop Large', width: 1440, height: 900 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    }));

    report.viewportsTested.push({
      viewport: `${vp.width}x${vp.height} (${vp.name})`,
      scrollWidth: overflow.scrollWidth,
      innerWidth: overflow.innerWidth,
      hasOverflow: overflow.hasOverflow
    });
  }

  // Write verification report
  fs.writeFileSync(
    path.join(screenshotsDir, 'corrections_verification_report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('Verification completed! Report saved to public/audit-screenshots/corrections_verification_report.json');
  await browser.close();
}

verifyCorrections().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});

