const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const outDir = path.resolve(__dirname, '../public/audit-screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const fileUrl = 'file:///' + path.resolve(__dirname, '../public/hallmark-exploration/phase3-2-dossier-portfolio.html').replace(/\\/g, '/');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  const networkErrors = [];
  page.on('response', resp => {
    if (resp.status() >= 400) networkErrors.push({ url: resp.url(), status: resp.status() });
  });

  // 1. Desktop 1440px Full Page
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  await page.screenshot({
    path: path.join(outDir, 'phase3_2_desktop_1440px.png'),
    fullPage: true
  });
  console.log('Saved phase3_2_desktop_1440px.png');

  // 2. Executive Dossier Desktop Interaction (Click Tab 02: Manufacturing)
  await page.click('#dtab-manufacturing');
  await page.waitForTimeout(300);
  const dossierSec = await page.$('#xizmatlar');
  if (dossierSec) {
    await dossierSec.screenshot({
      path: path.join(outDir, 'phase3_2_dossier_tab2_desktop.png')
    });
    console.log('Saved phase3_2_dossier_tab2_desktop.png');
  }

  // Test Keyboard ArrowRight/Down navigation on Dossier tabs
  await page.focus('#dtab-manufacturing');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(200);
  const tabAfterArrow = await page.evaluate(() => document.getElementById('folio-code')?.textContent);

  // 3. Portfolio Filter Screenshot (Click "Ishlab chiqarish (3)" -> zero-orphan 3-column layout)
  await page.click('#filter-mfg');
  await page.waitForTimeout(300);
  const portfolioSec = await page.$('#portfel');
  if (portfolioSec) {
    await portfolioSec.screenshot({
      path: path.join(outDir, 'phase3_2_portfolio_filtered_mfg.png')
    });
    console.log('Saved phase3_2_portfolio_filtered_mfg.png');
  }

  // Reset filter to All (7)
  await page.click('#filter-all');
  await page.waitForTimeout(300);

  // 4. Open Samtech Modal & Check Focus Management + Capture
  const samtechCard = await page.$('.venture-card[data-id="samtech"]');
  if (samtechCard) {
    await samtechCard.click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, 'phase3_2_modal_samtech.png'),
      fullPage: false
    });
    console.log('Saved phase3_2_modal_samtech.png');
  }

  // Test Escape closes modal & restores focus to Samtech card
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const focusRestoredSamtech = await page.evaluate(() => {
    return document.activeElement?.getAttribute('data-id') === 'samtech';
  });

  // 5. Open UZBIC Modal & Capture
  const uzbicTrigger = await page.$('.open-modal-trigger[data-id="uzbic"]');
  if (uzbicTrigger) {
    await uzbicTrigger.click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, 'phase3_2_modal_uzbic.png'),
      fullPage: false
    });
    console.log('Saved phase3_2_modal_uzbic.png');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  }

  // 6. Mobile 390px Full Page + Interactions
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Temporarily dock sticky footer during fullPage stitch so it doesn't obscure mid-page content during stitch
  await page.evaluate(() => {
    const sb = document.querySelector('.mobile-sticky-bar');
    if (sb) sb.style.position = 'static';
  });
  await page.screenshot({
    path: path.join(outDir, 'phase3_2_mobile_390px.png'),
    fullPage: true
  });
  await page.evaluate(() => {
    const sb = document.querySelector('.mobile-sticky-bar');
    if (sb) sb.style.position = 'fixed';
  });
  console.log('Saved phase3_2_mobile_390px.png');

  // Toggle Accordion 03 (Export) open on Mobile 390px
  const accBtn3 = await page.$('.mob-acc-trigger[data-acc="export"]');
  if (accBtn3) {
    await accBtn3.click();
    await page.waitForTimeout(300);
    // Scroll back cleanly so masthead does not overlay element capture, and temporarily unstick during full-section crop
    await page.evaluate(() => {
      const m = document.querySelector('.masthead');
      const sb = document.querySelector('.mobile-sticky-bar');
      if (m) m.style.position = 'static';
      if (sb) sb.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    const mobileDossierSec = await page.$('#xizmatlar');
    if (mobileDossierSec) {
      await mobileDossierSec.screenshot({
        path: path.join(outDir, 'phase3_2_dossier_accordion_mobile.png')
      });
      console.log('Saved phase3_2_dossier_accordion_mobile.png');
    }
    await page.evaluate(() => {
      const m = document.querySelector('.masthead');
      const sb = document.querySelector('.mobile-sticky-bar');
      if (m) m.style.position = 'sticky';
      if (sb) sb.style.display = 'grid';
    });
  }

  // Open Toybola Modal on Mobile 390px + Verify Scroll & Sticky Bar Clearance
  const toybolaCardMob = await page.$('.venture-card[data-id="toybola"]');
  if (toybolaCardMob) {
    await toybolaCardMob.scrollIntoViewIfNeeded();
    await toybolaCardMob.click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, 'phase3_2_modal_mobile_390px.png'),
      fullPage: false
    });
    console.log('Saved phase3_2_modal_mobile_390px.png');
  }

  const modalAuditMob = await page.evaluate(() => {
    const bodyOverflow = window.getComputedStyle(document.body).overflow;
    const modalBody = document.getElementById('modal-scroll-body');
    const footerBtn = document.getElementById('modal-footer-close');
    const stickyBar = document.querySelector('.mobile-sticky-bar');
    const modalBackdrop = document.getElementById('company-modal-backdrop');
    return {
      backgroundScrollLocked: bodyOverflow === 'hidden',
      modalScrollable: modalBody ? modalBody.scrollHeight >= modalBody.clientHeight : false,
      modalAboveStickyZ: modalBackdrop && stickyBar ?
        parseInt(window.getComputedStyle(modalBackdrop).zIndex) > parseInt(window.getComputedStyle(stickyBar).zIndex) : false,
      closeBtnRect: footerBtn ? footerBtn.getBoundingClientRect() : null
    };
  });

  // Close mobile modal via button
  await page.click('#modal-close-btn');
  await page.waitForTimeout(300);

  // 7. Mobile 320px Full Page
  await page.setViewportSize({ width: 320, height: 650 });
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    const sb = document.querySelector('.mobile-sticky-bar');
    if (sb) sb.style.position = 'static';
  });
  await page.screenshot({
    path: path.join(outDir, 'phase3_2_mobile_320px.png'),
    fullPage: true
  });
  await page.evaluate(() => {
    const sb = document.querySelector('.mobile-sticky-bar');
    if (sb) sb.style.position = 'fixed';
  });
  console.log('Saved phase3_2_mobile_320px.png');

  // 8. Check Overflow Across All Required Breakpoints + Language Switcher
  const viewports = [320, 360, 390, 768, 1024, 1440];
  const overflowResults = {};
  for (const w of viewports) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    overflowResults[w] = await page.evaluate(() => ({
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    }));
  }

  // Check Language switching (RU & EN)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.click('.lang-btn[data-lang="ru"]');
  await page.waitForTimeout(200);
  const ruCheck = await page.evaluate(() => ({
    heading: document.getElementById('dossier-title-main')?.textContent,
    uzbicPill: document.getElementById('uzbic-pill')?.textContent
  }));

  await page.click('.lang-btn[data-lang="en"]');
  await page.waitForTimeout(200);
  const enCheck = await page.evaluate(() => ({
    heading: document.getElementById('dossier-title-main')?.textContent,
    uzbicPill: document.getElementById('uzbic-pill')?.textContent
  }));

  // Check All Partner Logos Loaded Cleanly
  const imgAudit = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      alt: img.alt,
      src: img.getAttribute('src'),
      complete: img.complete,
      naturalWidth: img.naturalWidth
    }));
  });

  const report = {
    tabAfterArrowKey: tabAfterArrow,
    focusRestoredOnEscape: focusRestoredSamtech,
    modalAuditMob,
    overflowResults,
    ruCheck,
    enCheck,
    imgAudit,
    consoleErrors,
    networkErrors
  };

  fs.writeFileSync(path.join(outDir, 'phase3_2_exploration_report.json'), JSON.stringify(report, null, 2));
  console.log('Phase 3.2 Exploration Audit Result:');
  console.log(JSON.stringify(report, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
