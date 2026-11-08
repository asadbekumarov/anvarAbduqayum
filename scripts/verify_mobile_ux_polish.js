const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyMobileUXPolish() {
  const browser = await chromium.launch({ headless: true });
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    clearanceChecks: {},
    overflowCheck: {},
  };

  const BASE_URL = 'http://localhost:3015';

  try {
    // -------------------------------------------------------------
    // TEST 1: Mobile 390px - Accordion, CTA Clearance & Sticky Bar
    // -------------------------------------------------------------
    console.log('Testing Mobile 390px...');
    const ctx390 = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    const page390 = await ctx390.newPage();
    await page390.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });

    const dossier = page390.locator('#xizmatlar');
    await dossier.scrollIntoViewIfNeeded();
    await page390.waitForTimeout(400);

    const stickyBar = page390.locator('aside[aria-label="Tezkor aloqa paneli"]');
    const stickyVisible = await stickyBar.isVisible();
    results.tests.push({ name: 'Mobile Sticky Bar is visible on 390px', pass: stickyVisible });

    // Open accordion item 1 and scroll to CTA
    const panel1 = page390.locator('#accordion-panel-governance');
    await panel1.waitFor({ state: 'visible' });

    const cta1 = panel1.locator('a[href="/uz/bron"]');
    await cta1.scrollIntoViewIfNeeded();
    await page390.waitForTimeout(300);

    const ctaBox = await cta1.boundingBox();
    const stickyBox = await stickyBar.boundingBox();

    const clearance = stickyBox.y - (ctaBox.y + ctaBox.height);
    const noOverlap = clearance >= 0;
    results.clearanceChecks['390px_item1'] = {
      clearancePx: clearance,
      noOverlap,
      ctaBottom: ctaBox.y + ctaBox.height,
      stickyTop: stickyBox.y,
    };
    results.tests.push({ name: 'CTA 1 has positive clearance above Sticky Bar (390px)', pass: noOverlap });

    let canClick = true;
    try {
      await cta1.click({ trial: true });
    } catch (e) {
      canClick = false;
    }
    results.tests.push({ name: 'CTA 1 is clickable without interception (390px)', pass: canClick });

    // Capture screenshot of accordion open and CTA clearance
    await page390.screenshot({
      path: path.resolve('screenshots/mobile-polish-390-cta-clearance.png'),
    });

    // Test visible input focus for sticky bar keyboard auto-hide
    const visibleInput = page390.locator('input[type="tel"]').first();
    if (await visibleInput.count() > 0) {
      await visibleInput.focus();
      await page390.waitForTimeout(300);
      const isHidden = await stickyBar.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return el.classList.contains('translate-y-full') || style.opacity === '0' || style.pointerEvents === 'none';
      });
      results.tests.push({ name: 'Sticky Bar hides when form input is focused', pass: isHidden });
      await visibleInput.blur();
      await page390.waitForTimeout(300);
    }

    const overflow390 = await page390.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['390px'] = overflow390;
    await ctx390.close();

    // -------------------------------------------------------------
    // TEST 2: Small Screen 320px (Strict Minimum)
    // -------------------------------------------------------------
    console.log('Testing Small Screen 320px...');
    const ctx320 = await browser.newContext({
      viewport: { width: 320, height: 600 },
      deviceScaleFactor: 2,
    });
    const page320 = await ctx320.newPage();
    await page320.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });

    const dossier320 = page320.locator('#xizmatlar');
    await dossier320.scrollIntoViewIfNeeded();
    await page320.waitForTimeout(400);

    // Check heading size and wrapping at 320px
    const h2Size = await page320.locator('#dossier-heading').evaluate((el) => {
      const style = window.getComputedStyle(el);
      return { fontSize: style.fontSize, lineHeight: style.lineHeight };
    });
    results.tests.push({ name: 'H2 size at 320px is well-proportioned', pass: parseInt(h2Size.fontSize) <= 30, details: h2Size });

    // Check touch targets >= 48px
    const accButtons320 = page320.locator('#xizmatlar button[id^="accordion-btn-"]');
    const btnBox320 = await accButtons320.first().boundingBox();
    results.tests.push({ name: 'Accordion header touch target >= 48px at 320px', pass: btnBox320.height >= 48, height: btnBox320.height });

    // Open item 2 at 320px
    await accButtons320.nth(1).click();
    await page320.waitForTimeout(350);
    const panel2 = page320.locator('#accordion-panel-manufacturing');
    const cta2 = panel2.locator('a[href="/uz/bron"]');
    await cta2.scrollIntoViewIfNeeded();
    await page320.waitForTimeout(300);

    const stickyBar320 = page320.locator('aside[aria-label="Tezkor aloqa paneli"]');
    const ctaBox320 = await cta2.boundingBox();
    const stickyBox320 = await stickyBar320.boundingBox();
    const clearance320 = stickyBox320.y - (ctaBox320.y + ctaBox320.height);
    const noOverlap320 = clearance320 >= 0;
    results.clearanceChecks['320px_item2'] = {
      clearancePx: clearance320,
      noOverlap: noOverlap320,
      ctaBottom: ctaBox320.y + ctaBox320.height,
      stickyTop: stickyBox320.y,
    };
    results.tests.push({ name: 'CTA 2 has positive clearance above Sticky Bar (320px)', pass: noOverlap320 });

    let canClick320 = true;
    try {
      await cta2.click({ trial: true });
    } catch (e) {
      canClick320 = false;
    }
    results.tests.push({ name: 'CTA 2 is clickable without interception (320px)', pass: canClick320 });

    // Capture screenshot at 320px
    await page320.screenshot({
      path: path.resolve('screenshots/mobile-polish-320-cta-clearance.png'),
    });

    const overflow320 = await page320.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['320px'] = overflow320;
    await ctx320.close();

    // -------------------------------------------------------------
    // TEST 3: Mobile 360px
    // -------------------------------------------------------------
    console.log('Testing Mobile 360px...');
    const ctx360 = await browser.newContext({
      viewport: { width: 360, height: 740 },
      deviceScaleFactor: 2,
    });
    const page360 = await ctx360.newPage();
    await page360.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });
    const dossier360 = page360.locator('#xizmatlar');
    await dossier360.scrollIntoViewIfNeeded();
    await page360.waitForTimeout(300);

    await page360.screenshot({
      path: path.resolve('screenshots/mobile-polish-360-accordion.png'),
    });

    const overflow360 = await page360.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['360px'] = overflow360;
    await ctx360.close();

    // -------------------------------------------------------------
    // TEST 4: Navbar Positioning During Real Viewport Scrolling
    // -------------------------------------------------------------
    console.log('Testing Navbar Scrolling Behavior (390px)...');
    const ctxNav = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    const pageNav = await ctxNav.newPage();
    await pageNav.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });

    // Initial position: scrollY = 0
    const navHeader = pageNav.locator('header');
    const navPos0 = await navHeader.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top, position: window.getComputedStyle(el).position };
    });
    results.tests.push({ name: 'Navbar at y=0 is pinned at top:0', pass: navPos0.top === 0 && navPos0.position === 'fixed' });

    // Scroll to 600px
    await pageNav.evaluate(() => window.scrollTo(0, 600));
    await pageNav.waitForTimeout(300);
    const navPos600 = await navHeader.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top, scrollY: window.scrollY };
    });
    results.tests.push({ name: 'Navbar at scrollY=600 remains pinned at top:0', pass: navPos600.top === 0 });

    // Capture real viewport screenshot while scrolled
    await pageNav.screenshot({
      path: path.resolve('screenshots/mobile-polish-navbar-scrolled.png'),
    });

    await ctxNav.close();

    // -------------------------------------------------------------
    // TEST 5: Content Accuracy Check (No fake scarcity)
    // -------------------------------------------------------------
    console.log('Checking Content Accuracy...');
    const ctxContent = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pageContent = await ctxContent.newPage();
    await pageContent.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });

    const bodyText = await pageContent.textContent('body');
    const hasFakeQueue = bodyText.includes('navbat asosida qabul qilinadi');
    results.tests.push({ name: 'Fake scarcity "navbat asosida qabul qilinadi" REMOVED', pass: !hasFakeQueue });

    // Check Russian page
    await pageContent.goto(`${BASE_URL}/ru`, { waitUntil: 'networkidle' });
    const ruBody = await pageContent.textContent('body');
    const hasRuQueue = ruBody.includes('в порядке очереди');
    results.tests.push({ name: 'RU fake scarcity "в порядке очереди" REMOVED', pass: !hasRuQueue });

    // Check English page
    await pageContent.goto(`${BASE_URL}/en`, { waitUntil: 'networkidle' });
    const enBody = await pageContent.textContent('body');
    const hasEnQueue = enBody.includes('rolling basis');
    results.tests.push({ name: 'EN fake scarcity "rolling basis" REMOVED', pass: !hasEnQueue });

    // Capture Desktop 1440px updated screenshot (without fake scarcity)
    await pageContent.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });
    const dSection = pageContent.locator('#xizmatlar');
    await dSection.scrollIntoViewIfNeeded();
    await pageContent.waitForTimeout(300);
    await dSection.screenshot({
      path: path.resolve('screenshots/mobile-polish-desktop-1440.png'),
    });

    const overflow1440 = await pageContent.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['1440px'] = overflow1440;

    await ctxContent.close();

    console.log('Mobile UX Polish Verification Finished!');
    console.log(JSON.stringify(results, null, 2));

    fs.writeFileSync('screenshots/mobile-polish-verification-report.json', JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('Error during verification:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyMobileUXPolish();
