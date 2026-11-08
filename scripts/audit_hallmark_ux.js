const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const results = {
    viewportsTested: [],
    overflowIssues: [],
    brokenImages: [],
    consoleErrors: [],
    touchTargetViolations: [],
    stickyBarOverlap: [],
    modalChecks: {},
    navigationChecks: {},
    i18nChecks: {},
    contrastNotes: []
  };

  const viewports = [
    { name: 'Mobile Mini', width: 320, height: 600 },
    { name: 'Mobile Standard', width: 360, height: 740 },
    { name: 'Mobile Modern', width: 390, height: 844 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet/Laptop', width: 1024, height: 768 },
    { name: 'Desktop Large', width: 1440, height: 900 }
  ];

  const screenshotsDir = path.join(__dirname, '../public/audit-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // 1. Check Console & Network errors on base page
  const page = await context.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });
  page.on('response', resp => {
    if (resp.status() >= 400 && !resp.url().includes('favicon')) {
      results.brokenImages.push(`[${resp.status()}] ${resp.url()}`);
    }
  });

  console.log('--- Testing Viewports & Layout Overflow ---');
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
    
    // Check horizontal scroll
    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    });

    results.viewportsTested.push({
      viewport: vp,
      hasOverflow: overflow.hasOverflow,
      scrollWidth: overflow.scrollWidth
    });

    if (overflow.hasOverflow) {
      results.overflowIssues.push(`Viewport ${vp.width}x${vp.height} has overflow: scrollWidth=${overflow.scrollWidth} > ${vp.innerWidth}`);
    }

    // Capture screenshot at key viewports
    if ([320, 390, 768, 1440].includes(vp.width)) {
      await page.screenshot({
        path: path.join(screenshotsDir, `audit_${vp.width}px.png`),
        fullPage: false
      });
    }
  }

  // 2. Touch Target Analysis on Mobile (390px)
  console.log('--- Testing Touch Targets on 390px ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });

  const touchTargets = await page.evaluate(() => {
    const clickableSelectors = 'button, a, input, select, [role="button"]';
    const elements = document.querySelectorAll(clickableSelectors);
    const violations = [];

    elements.forEach(el => {
      // Check if visible
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
        // Hallmark / WCAG 2.5.5 recommended min target size is 44x44px or 48x48px (WCAG 2.5.8 AAA is 24x24, standard AAA is 44x44)
        if (rect.width < 44 || rect.height < 44) {
          // Check if parent provides large padding/click area or if it's inline text link
          const isInlineTextLink = el.tagName === 'A' && el.parentElement && window.getComputedStyle(el.parentElement).display === 'inline';
          violations.push({
            tag: el.tagName,
            text: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 30).trim(),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            class: el.className ? el.className.slice(0, 40) : '',
            isInline: isInlineTextLink
          });
        }
      }
    });
    return violations;
  });

  results.touchTargetViolations = touchTargets.filter(t => !t.isInline && t.text.length > 0);

  // 3. Mobile Sticky Bar Clearance & Z-Index Check
  console.log('--- Testing Mobile Sticky Bar Clearance ---');
  const stickyBarStatus = await page.evaluate(() => {
    const stickyBar = document.querySelector('[data-testid="mobile-sticky-bar"], .fixed.bottom-0');
    if (!stickyBar) return { present: false };
    const rect = stickyBar.getBoundingClientRect();
    const style = window.getComputedStyle(stickyBar);
    return {
      present: true,
      zIndex: style.zIndex,
      height: rect.height,
      bottom: rect.bottom,
      top: rect.top,
      display: style.display,
      visibility: style.visibility
    };
  });
  results.stickyBarStatus = stickyBarStatus;

  // 4. Portfolio Modal UX & Focus Management Check (at 390px)
  console.log('--- Testing Portfolio Modal UX ---');
  try {
    const cards = await page.$$('[aria-haspopup="dialog"]');
    if (cards.length > 0) {
      await cards[0].click();
      await page.waitForTimeout(600);

      // Check modal presence
      const modalInfo = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        if (!dialog) return { found: false };
        const rect = dialog.getBoundingClientRect();
        const closeBtn = dialog.querySelector('button[aria-label*="Yopish"], button[aria-label*="Close"], button[aria-label*="Закрыть"]');
        const closeRect = closeBtn ? closeBtn.getBoundingClientRect() : null;
        
        // Check body scroll lock
        const bodyOverflow = window.getComputedStyle(document.body).overflow;
        
        return {
          found: true,
          dialogRect: { width: Math.round(rect.width), height: Math.round(rect.height), top: Math.round(rect.top) },
          hasCloseButton: !!closeBtn,
          closeButtonVisible: closeRect ? (closeRect.width > 0 && closeRect.height > 0) : false,
          closeButtonSize: closeRect ? { width: Math.round(closeRect.width), height: Math.round(closeRect.height) } : null,
          bodyOverflow: bodyOverflow
        };
      });

      // Capture modal screenshot
      await page.screenshot({
        path: path.join(screenshotsDir, 'audit_portfolio_modal_390px.png'),
        fullPage: false
      });

      // Press Escape to verify dismissal
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      const isModalDismissed = await page.evaluate(() => !document.querySelector('[role="dialog"]'));

      results.modalChecks = {
        ...modalInfo,
        escapeDismissed: isModalDismissed
      };
    }
  } catch (err) {
    results.modalChecks.error = err.message;
  }

  // 5. Navigation Anchors & CTAs
  console.log('--- Testing Anchor Nav & Consultation CTAs ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });

  const navLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, header a'));
    return links.map(l => ({
      text: l.innerText.trim(),
      href: l.getAttribute('href')
    }));
  });
  results.navigationChecks.navLinks = navLinks;

  // Check Portfolio Anchor #portfel exists
  const hasPortfolioAnchor = await page.evaluate(() => {
    return !!document.querySelector('#portfel, #portfolio');
  });
  results.navigationChecks.hasPortfolioAnchor = hasPortfolioAnchor;

  // Check Dossier Anchor #xizmatlar exists
  const hasServicesAnchor = await page.evaluate(() => {
    return !!document.querySelector('#xizmatlar, #services');
  });
  results.navigationChecks.hasServicesAnchor = hasServicesAnchor;

  // Check Booking CTAs
  const bookingCtas = await page.evaluate(() => {
    const ctas = Array.from(document.querySelectorAll('a, button')).filter(el => {
      const href = el.getAttribute('href') || '';
      const text = el.innerText || '';
      return href.includes('bron') || text.includes('Bron');
    });
    return ctas.map(c => ({
      tag: c.tagName,
      text: c.innerText.trim(),
      href: c.getAttribute('href')
    }));
  });
  results.navigationChecks.bookingCtas = bookingCtas;

  // 6. Trilingual checks (/uz, /ru, /en)
  console.log('--- Testing Multilingual Routes ---');
  for (const locale of ['uz', 'ru', 'en']) {
    const res = await page.goto(`http://localhost:3015/${locale}`, { waitUntil: 'networkidle' });
    const title = await page.title();
    const heroHeading = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.innerText.trim() : null;
    });
    results.i18nChecks[locale] = {
      status: res.status(),
      title: title,
      heroHeading: heroHeading ? heroHeading.slice(0, 50) : null
    };
  }

  // Save audit results to file
  fs.writeFileSync(
    path.join(__dirname, '../public/audit-screenshots/hallmark_audit_raw.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('Audit completed successfully! Results written to public/audit-screenshots/hallmark_audit_raw.json');
  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
