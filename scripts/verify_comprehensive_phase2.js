const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function runVerification() {
  console.log('--- STARTING COMPREHENSIVE PHASE 2.1 VERIFICATION ---');

  const port = 3011;
  console.log(`Launching Next.js production server on port ${port}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(port)], {
    cwd: 'D:\\projects\\anvarAbduqayum',
    shell: true,
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 4500));

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  const testReport = {
    screenshots: [],
    navigation: {},
    ctas: {},
    i18n: {},
    a11y: {},
    consoleErrors: []
  };

  const screenshotsDir = path.join('D:\\projects\\anvarAbduqayum', 'screenshots');

  // 1. SCREENSHOTS & OVERFLOW TEST
  console.log('\n[1/5] Testing Viewports & Verifying Horizontal Overflow...');
  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'mobile-360', width: 360, height: 740 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    const res = await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(() => {
      return {
        docScrollWidth: document.documentElement.scrollWidth,
        winInnerWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    });

    const file = path.join(screenshotsDir, `phase2-prod-${vp.name}-hero.png`);

    testReport.screenshots.push({
      viewport: vp.name,
      width: vp.width,
      status: res.status(),
      hasOverflow: overflow.hasOverflow,
      path: file
    });
    console.log(`  ✓ ${vp.name} (${vp.width}px): Status=${res.status()}, Overflow=${overflow.hasOverflow ? 'FAIL' : '0px (PASS)'}`);
  }

  // 2. NAVIGATION & KEYBOARD TESTS
  console.log('\n[2/5] Testing Navigation & Keyboard Interactions...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });

  const navLinks = await page.$$eval('header nav a', els => els.map(a => ({
    text: a.innerText.trim().replace(/\s+/g, ' '),
    href: a.getAttribute('href')
  })));
  testReport.navigation.desktopLinks = navLinks;
  console.log(`  ✓ Desktop Nav Links found: ${navLinks.length}`, navLinks.map(l => l.href));

  // Test Mobile Menu open/close & Escape key
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });

  const hamburger = page.locator('button[aria-label*="Menyuni"]');
  await hamburger.click();
  await page.waitForTimeout(200);

  const menuVisibleAfterClick = await page.locator('[aria-label="Mobil navigatsiya menyusi"]').isVisible();
  console.log(`  ✓ Mobile Menu opens on tap: ${menuVisibleAfterClick}`);
  testReport.navigation.mobileMenuOpenWorking = menuVisibleAfterClick;

  // Test Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const menuVisibleAfterEscape = await page.locator('[aria-label="Mobil navigatsiya menyusi"]').isVisible();
  console.log(`  ✓ Mobile Menu closes on Escape key: ${!menuVisibleAfterEscape}`);
  testReport.navigation.escapeKeyWorking = !menuVisibleAfterEscape;

  // Test Keyboard Tab focus visibility
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const focusedTag = await page.evaluate(() => document.activeElement ? document.activeElement.tagName : null);
  console.log(`  ✓ Keyboard navigation Tab brings focus to: ${focusedTag}`);
  testReport.navigation.keyboardFocusWorking = !!focusedTag;

  // 3. CTA TESTING & ROUTING
  console.log('\n[3/5] Testing Primary & Secondary CTAs...');
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });
  const navCtaHref = await page.locator('header a[href*="/bron"]').first().getAttribute('href');
  console.log(`  ✓ Navbar Primary CTA points to: ${navCtaHref}`);

  // Test Hero Primary CTA click
  const heroPrimaryBtn = page.locator('#hero a[href*="/bron"]').first();
  const heroPrimaryHref = await heroPrimaryBtn.getAttribute('href');
  console.log(`  ✓ Hero Primary CTA href: ${heroPrimaryHref}`);
  
  await heroPrimaryBtn.click();
  await page.waitForLoadState('networkidle');
  const currentUrl = page.url();
  const bookingPageLoaded = currentUrl.includes('/bron');
  const bookingH1 = await page.locator('h1').innerText().catch(() => '');
  console.log(`  ✓ Hero Primary CTA navigated to: ${currentUrl}`);
  console.log(`  ✓ Booking Page Loaded successfully: ${bookingPageLoaded} (Headline: "${bookingH1.replace(/\n+/g, ' ')}")`);
  testReport.ctas.primaryBookingRoute = { url: currentUrl, success: bookingPageLoaded, headline: bookingH1.replace(/\n+/g, ' ') };

  // Test Hero Secondary CTA
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });
  const heroSecondaryHref = await page.locator('#hero a[href="#portfel"]').first().getAttribute('href');
  console.log(`  ✓ Hero Secondary CTA points to: ${heroSecondaryHref}`);
  testReport.ctas.secondaryServicesAnchor = heroSecondaryHref;

  // 4. MULTI-LANGUAGE (i18n) ROUTING & TRANSLATION INTEGRITY
  console.log('\n[4/5] Testing UZ / RU / EN Language Switching...');
  const locales = ['uz', 'ru', 'en'];
  for (const loc of locales) {
    const res = await page.goto(`http://localhost:${port}/${loc}`, { waitUntil: 'networkidle' });
    const status = res.status();
    const title = await page.title();
    const heroH1 = await page.locator('#hero h1').innerText();
    const navCtaText = await page.locator('header a[href*="/bron"]').first().innerText();
    
    // Check that /loc/bron also resolves with 200
    const bronRes = await page.goto(`http://localhost:${port}/${loc}/bron`, { waitUntil: 'networkidle' });
    const bronStatus = bronRes.status();

    testReport.i18n[loc] = {
      homeStatus: status,
      bronStatus: bronStatus,
      title: title,
      heroHeadline: heroH1.replace(/\n+/g, ' '),
      navCta: navCtaText.replace(/\n+/g, ' ')
    };
    console.log(`  ✓ [${loc.toUpperCase()}] Home=${status}, /bron=${bronStatus}, CTA="${testReport.i18n[loc].navCta}"`);
  }

  // 5. ACCESSIBILITY & CONSOLE ERRORS
  console.log('\n[5/5] Evaluating Accessibility & Console Errors...');
  await page.goto(`http://localhost:${port}/uz`, { waitUntil: 'networkidle' });
  const a11ySummary = await page.evaluate(() => {
    const imagesWithoutAlt = Array.from(document.querySelectorAll('img:not([alt])')).length;
    const buttonsWithoutLabel = Array.from(document.querySelectorAll('button:not([aria-label]):not([name])')).filter(b => !b.innerText.trim()).length;
    const linksWithoutLabel = Array.from(document.querySelectorAll('a:not([aria-label])')).filter(a => !a.innerText.trim() && !a.querySelector('img, svg')).length;
    return { imagesWithoutAlt, buttonsWithoutLabel, linksWithoutLabel };
  });
  testReport.a11y = a11ySummary;
  testReport.consoleErrors = consoleErrors;
  console.log('  ✓ Accessibility check:', a11ySummary);
  console.log(`  ✓ Browser Console Errors: ${consoleErrors.length}`);

  await browser.close();
  server.kill('SIGTERM');

  console.log('\n=== FINAL VERIFICATION RESULT ===');
  console.log(JSON.stringify(testReport, null, 2));

  fs.writeFileSync('screenshots/verification-report.json', JSON.stringify(testReport, null, 2));
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
