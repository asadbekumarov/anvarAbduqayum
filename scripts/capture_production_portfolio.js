const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const screenshotsDir = path.resolve(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const browser = await chromium.launch();
  const baseUrl = 'http://localhost:3015';

  console.log('Testing Production Portfolio on Next.js server at:', baseUrl);

  const verificationResults = {
    viewports: [],
    modalTests: [],
    filterTests: [],
    localesTested: [],
    consoleErrors: [],
    focusRestoration: null,
    backgroundScrollLock: null,
  };

  // 1. Desktop 1440px
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('console', msg => {
      if (msg.type() === 'error') {
        verificationResults.consoleErrors.push({ url: page.url(), text: msg.text() });
      }
    });

    await page.goto(`${baseUrl}/uz#portfel`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const portfolioEl = page.locator('#portfel');
    await portfolioEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Section screenshot
    const desktopPath = path.resolve(screenshotsDir, 'phase2-3-prod-desktop-1440.png');
    await portfolioEl.screenshot({ path: desktopPath });
    console.log('Saved:', desktopPath);

    // Filter testing on Desktop
    const filterPills = page.locator('#portfel button[role="tab"]');
    const pillCount = await filterPills.count();
    console.log(`Found ${pillCount} filter pills`);

    // Click MFG filter
    await filterPills.nth(1).click();
    await page.waitForTimeout(300);
    const mfgCount = await page.locator('#portfel .card-entity:visible').count();
    verificationResults.filterTests.push({ filter: 'mfg', visibleCards: mfgCount });

    // Click Horeca filter
    await filterPills.nth(2).click();
    await page.waitForTimeout(300);
    const horecaCount = await page.locator('#portfel .card-entity:visible').count();
    verificationResults.filterTests.push({ filter: 'horeca', visibleCards: horecaCount });

    // Back to All
    await filterPills.nth(0).click();
    await page.waitForTimeout(300);
    const allCount = await page.locator('#portfel .card-entity:visible').count();
    verificationResults.filterTests.push({ filter: 'all', visibleCards: allCount });

    // Open detail modal (click first card: Toybola)
    const firstCard = page.locator('#portfel .card-entity').first();
    await firstCard.click();
    await page.waitForTimeout(400);

    const modalPath = path.resolve(screenshotsDir, 'phase2-3-prod-desktop-modal-1440.png');
    await page.screenshot({ path: modalPath });
    console.log('Saved:', modalPath);

    // Close modal via Escape and check focus restoration
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const isCardFocused = await page.evaluate(() => {
      return document.activeElement && document.activeElement.classList.contains('card-entity');
    });
    verificationResults.focusRestoration = isCardFocused;
    console.log('Desktop focus restored to card:', isCardFocused);

    await page.close();
  }

  // 2. Tablet 768px
  {
    const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await page.goto(`${baseUrl}/uz#portfel`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const portfolioEl = page.locator('#portfel');
    await portfolioEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const tabletPath = path.resolve(screenshotsDir, 'phase2-3-prod-tablet-768.png');
    await portfolioEl.screenshot({ path: tabletPath });
    console.log('Saved:', tabletPath);

    await page.close();
  }

  // 3. Mobile 390px
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(`${baseUrl}/uz#portfel`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const portfolioEl = page.locator('#portfel');
    await portfolioEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Portfolio section screenshot
    const mobile390Path = path.resolve(screenshotsDir, 'phase2-3-prod-mobile-390.png');
    await portfolioEl.screenshot({ path: mobile390Path });
    console.log('Saved:', mobile390Path);

    // Click first card to open mobile drawer modal
    await page.locator('#portfel .card-entity').first().click();
    await page.waitForTimeout(400);

    // Check background scroll locking
    const bodyOverflow = await page.evaluate(() => {
      return {
        body: document.body.style.overflow,
        html: document.documentElement.style.overflow,
      };
    });
    verificationResults.backgroundScrollLock = (bodyOverflow.body === 'hidden');

    // Capture modal top
    const modalTop390Path = path.resolve(screenshotsDir, 'phase2-3-prod-mobile-modal-390.png');
    await page.screenshot({ path: modalTop390Path });
    console.log('Saved:', modalTop390Path);

    // Scroll modal to bottom
    await page.evaluate(() => {
      const scrollArea = document.getElementById('modalScrollArea');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    });
    await page.waitForTimeout(300);

    // Verify top close button and bottom action buttons are visible
    const topCloseBtn = await page.locator('.btn-close-modal').isVisible();
    const bottomCloseBtn = await page.locator('.btn-modal-close-footer, button:has-text("Yopish")').last().isVisible();
    verificationResults.modalTests.push({
      viewport: '390px',
      topCloseBtnVisible: topCloseBtn,
      bottomActionVisible: bottomCloseBtn,
    });
    console.log(`Mobile 390px modal: topCloseBtn=${topCloseBtn}, bottomCloseBtn=${bottomCloseBtn}`);

    // Capture modal bottom
    const modalBottom390Path = path.resolve(screenshotsDir, 'phase2-3-prod-mobile-modal-bottom-390.png');
    await page.screenshot({ path: modalBottom390Path });
    console.log('Saved:', modalBottom390Path);

    await page.close();
  }

  // 4. Mobile 360px
  {
    const page = await browser.newPage({ viewport: { width: 360, height: 740 } });
    await page.goto(`${baseUrl}/uz#portfel`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(() => {
      return {
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    verificationResults.viewports.push({ viewport: '360px', ...overflow });
    console.log('Viewport 360px overflow check:', overflow);

    await page.close();
  }

  // 5. Mobile 320px
  {
    const page = await browser.newPage({ viewport: { width: 320, height: 600 } });
    await page.goto(`${baseUrl}/uz#portfel`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const portfolioEl = page.locator('#portfel');
    await portfolioEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const overflow = await page.evaluate(() => {
      return {
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    verificationResults.viewports.push({ viewport: '320px', ...overflow });

    const mobile320Path = path.resolve(screenshotsDir, 'phase2-3-prod-mobile-320.png');
    await portfolioEl.screenshot({ path: mobile320Path });
    console.log('Saved:', mobile320Path);

    // Open modal on 320px
    await page.locator('#portfel .card-entity').first().click();
    await page.waitForTimeout(400);

    const modalTop320Path = path.resolve(screenshotsDir, 'phase2-3-prod-mobile-modal-320.png');
    await page.screenshot({ path: modalTop320Path });
    console.log('Saved:', modalTop320Path);

    // Scroll modal to bottom
    await page.evaluate(() => {
      const scrollArea = document.getElementById('modalScrollArea');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    });
    await page.waitForTimeout(300);

    const topCloseBtn = await page.locator('.btn-close-modal').isVisible();
    const bottomCloseBtn = await page.locator('button:has-text("Yopish")').last().isVisible();
    verificationResults.modalTests.push({
      viewport: '320px',
      topCloseBtnVisible: topCloseBtn,
      bottomActionVisible: bottomCloseBtn,
    });
    console.log(`Mobile 320px modal: topCloseBtn=${topCloseBtn}, bottomCloseBtn=${bottomCloseBtn}`);

    const modalBottom320Path = path.resolve(screenshotsDir, 'phase2-3-prod-mobile-modal-bottom-320.png');
    await page.screenshot({ path: modalBottom320Path });
    console.log('Saved:', modalBottom320Path);

    // Close modal via bottom button
    await page.locator('button:has-text("Yopish")').last().click();
    await page.waitForTimeout(300);
    const modalClosed = !(await page.locator('[role="dialog"]').isVisible());
    console.log('Mobile 320px modal closed via footer button:', modalClosed);

    await page.close();
  }

  // 6. Test Russian and English locales
  for (const locale of ['ru', 'en']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${baseUrl}/${locale}#portfel`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const titleText = await page.locator('#portfel h2').textContent();
    const cardsCount = await page.locator('#portfel .card-entity').count();

    verificationResults.localesTested.push({
      locale,
      titleText,
      cardsCount,
    });
    console.log(`Locale ${locale}: title="${titleText?.trim()}", cardsCount=${cardsCount}`);

    await page.close();
  }

  await browser.close();

  // Save report
  const reportPath = path.resolve(screenshotsDir, 'phase2-3-prod-verification-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(verificationResults, null, 2), 'utf-8');
  console.log('Saved verification report to:', reportPath);

  console.log('All production verification tests successfully finished!');
}

main().catch(err => {
  console.error('Error running production capture script:', err);
  process.exit(1);
});

