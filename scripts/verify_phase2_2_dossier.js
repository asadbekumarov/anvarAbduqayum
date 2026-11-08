const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyExecutiveDossier() {
  const browser = await chromium.launch({ headless: true });
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    screenshots: [],
    overflowCheck: {},
  };

  const BASE_URL = 'http://localhost:3015';

  try {
    // -------------------------------------------------------------
    // TEST 1: Desktop 1440px
    // -------------------------------------------------------------
    console.log('Testing Desktop 1440px...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });

    // Verify #xizmatlar section exists
    const dossierSection = desktopPage.locator('#xizmatlar');
    await dossierSection.waitFor({ state: 'visible', timeout: 5000 });
    const isVisible = await dossierSection.isVisible();
    results.tests.push({ name: 'Dossier section visible on Desktop', pass: isVisible });

    // Scroll to #xizmatlar
    await dossierSection.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(500);

    // Verify 4 tabs exist in desktop split view
    const tabs = desktopPage.locator('[role="tab"]');
    const tabCount = await tabs.count();
    results.tests.push({ name: '4 Desktop tabs exist', pass: tabCount === 4 });

    // Capture initial desktop dossier screenshot
    const desktopShotPath = path.resolve('screenshots/phase2-2-dossier-desktop-1440.png');
    await dossierSection.screenshot({ path: desktopShotPath });
    results.screenshots.push('screenshots/phase2-2-dossier-desktop-1440.png');

    // Test Tab switching: Click tab 2 (manufacturing)
    await tabs.nth(1).click();
    await desktopPage.waitForTimeout(300);
    const panelText = await desktopPage.locator('[role="tabpanel"]').textContent();
    const switchedToMfg = panelText.includes('Ishlab chiqarish jarayonlarini optimallashtirish');
    results.tests.push({ name: 'Tab switch to Program 02 works', pass: switchedToMfg });

    // Capture screenshot of Program 02 active state
    const desktopTab2Shot = path.resolve('screenshots/phase2-2-dossier-desktop-tab2.png');
    await dossierSection.screenshot({ path: desktopTab2Shot });
    results.screenshots.push('screenshots/phase2-2-dossier-desktop-tab2.png');

    // Test Tab 3 (Export)
    await tabs.nth(2).click();
    await desktopPage.waitForTimeout(300);
    const panelText3 = await desktopPage.locator('[role="tabpanel"]').textContent();
    const switchedToExport = panelText3.includes('UZBIC');
    results.tests.push({ name: 'Tab switch to Program 03 (Export) works', pass: switchedToExport });

    // Test Keyboard navigation (ArrowDown from tab 3 to tab 4)
    await tabs.nth(2).press('ArrowDown');
    await desktopPage.waitForTimeout(300);
    const panelText4 = await desktopPage.locator('[role="tabpanel"]').textContent();
    const switchedToDiag = panelText4.includes('Boshlang‘ich strategik konsultatsiya') || panelText4.includes('boshlang‘ich');
    results.tests.push({ name: 'Keyboard ArrowDown navigation works', pass: switchedToDiag });

    // Test CTA button href
    const ctaHref = await desktopPage.locator('[role="tabpanel"] a').getAttribute('href');
    const ctaCorrect = ctaHref === '/uz/bron';
    results.tests.push({ name: 'CTA button href is /uz/bron', pass: ctaCorrect });

    // Check navbar link: click 'Xizmatlar' in navbar
    const navServicesLink = desktopPage.locator('nav a[href="#xizmatlar"]');
    const navLinkCount = await navServicesLink.count();
    results.tests.push({ name: 'Navbar has #xizmatlar link', pass: navLinkCount > 0 });

    // Check overflow on desktop
    const desktopOverflow = await desktopPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['1440px'] = desktopOverflow;

    await desktopContext.close();

    // -------------------------------------------------------------
    // TEST 2: Tablet 768px
    // -------------------------------------------------------------
    console.log('Testing Tablet 768px...');
    const tabletContext = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 2,
    });
    const tabletPage = await tabletContext.newPage();
    await tabletPage.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });
    const tabletDossier = tabletPage.locator('#xizmatlar');
    await tabletDossier.scrollIntoViewIfNeeded();
    await tabletPage.waitForTimeout(500);

    const tabletShotPath = path.resolve('screenshots/phase2-2-dossier-tablet-768.png');
    await tabletDossier.screenshot({ path: tabletShotPath });
    results.screenshots.push('screenshots/phase2-2-dossier-tablet-768.png');

    const tabletOverflow = await tabletPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['768px'] = tabletOverflow;
    await tabletContext.close();

    // -------------------------------------------------------------
    // TEST 3: Mobile 390px
    // -------------------------------------------------------------
    console.log('Testing Mobile 390px...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });
    const mobileDossier = mobilePage.locator('#xizmatlar');
    await mobileDossier.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(500);

    // Verify accordion items
    const accButtons = mobilePage.locator('#xizmatlar button[id^="accordion-btn-"]');
    const accCount = await accButtons.count();
    results.tests.push({ name: '4 Mobile accordion items exist', pass: accCount === 4 });

    // Check that item 1 is expanded
    const isExpanded1 = await accButtons.nth(0).getAttribute('aria-expanded');
    results.tests.push({ name: 'Accordion item 1 expanded by default', pass: isExpanded1 === 'true' });

    // Click item 2 to toggle
    await accButtons.nth(1).click();
    await mobilePage.waitForTimeout(350);
    const isExpanded2 = await accButtons.nth(1).getAttribute('aria-expanded');
    results.tests.push({ name: 'Accordion item 2 expands on tap', pass: isExpanded2 === 'true' });

    // Check touch target height (min 48px)
    const btnBox = await accButtons.nth(1).boundingBox();
    const touchTargetSufficient = btnBox && btnBox.height >= 48;
    results.tests.push({ name: 'Accordion touch target >= 48px', pass: touchTargetSufficient, height: btnBox?.height });

    // Capture mobile screenshot
    const mobileShotPath = path.resolve('screenshots/phase2-2-dossier-mobile-390.png');
    await mobileDossier.screenshot({ path: mobileShotPath });
    results.screenshots.push('screenshots/phase2-2-dossier-mobile-390.png');

    // Check overflow
    const mobileOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['390px'] = mobileOverflow;
    await mobileContext.close();

    // -------------------------------------------------------------
    // TEST 4: Mobile 320px (Strict Minimum)
    // -------------------------------------------------------------
    console.log('Testing Mobile 320px...');
    const m320Context = await browser.newContext({
      viewport: { width: 320, height: 600 },
      deviceScaleFactor: 2,
    });
    const m320Page = await m320Context.newPage();
    await m320Page.goto(`${BASE_URL}/uz`, { waitUntil: 'networkidle' });
    const m320Dossier = m320Page.locator('#xizmatlar');
    await m320Dossier.scrollIntoViewIfNeeded();
    await m320Page.waitForTimeout(500);

    const m320ShotPath = path.resolve('screenshots/phase2-2-dossier-mobile-320.png');
    await m320Dossier.screenshot({ path: m320ShotPath });
    results.screenshots.push('screenshots/phase2-2-dossier-mobile-320.png');

    const m320Overflow = await m320Page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    results.overflowCheck['320px'] = m320Overflow;
    await m320Context.close();

    // -------------------------------------------------------------
    // TEST 5: Multilingual Content Verification (/ru & /en)
    // -------------------------------------------------------------
    console.log('Testing Multilingual RU & EN...');
    const langContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const langPage = await langContext.newPage();

    // RU
    await langPage.goto(`${BASE_URL}/ru`, { waitUntil: 'networkidle' });
    const ruHeading = await langPage.locator('#xizmatlar h2').textContent();
    const ruPass = ruHeading.includes('стратегических направления');
    results.tests.push({ name: 'RU Dossier title localized', pass: ruPass });

    // EN
    await langPage.goto(`${BASE_URL}/en`, { waitUntil: 'networkidle' });
    const enHeading = await langPage.locator('#xizmatlar h2').textContent();
    const enPass = enHeading.includes('Strategic Tracks');
    results.tests.push({ name: 'EN Dossier title localized', pass: enPass });

    await langContext.close();

    console.log('Verification Complete!');
    console.log(JSON.stringify(results, null, 2));

    fs.writeFileSync('screenshots/phase2-2-verification-report.json', JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('Error during verification:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyExecutiveDossier();

