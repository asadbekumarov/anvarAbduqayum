const { chromium } = require('playwright');

async function runStep3Verification() {
  const PORT = process.env.PORT || 3000;
  console.log(`Connecting to server on http://localhost:${PORT}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log(`Navigating to http://localhost:${PORT}/uz#portfel...`);
  await page.goto(`http://localhost:${PORT}/uz#portfel`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  // 1. Verify 3 View Tabs in Portfolio
  console.log('Verifying Portfolio View Switcher Tabs...');
  const galleryTab = page.locator('button[role="tab"]:has-text("Portfel korxonalari")').first();
  const oemTab = page.locator('button[role="tab"]:has-text("OEM & B2B Konfigurator")').first();
  const exportTab = page.locator('button[role="tab"]:has-text("Eksport Koridorlari")').first();

  console.log('Tabs visible:', {
    gallery: await galleryTab.isVisible(),
    oem: await oemTab.isVisible(),
    export: await exportTab.isVisible(),
  });

  if (!(await galleryTab.isVisible()) || !(await oemTab.isVisible()) || !(await exportTab.isVisible())) {
    throw new Error('Portfolio view tabs are not visible');
  }

  // 2. Test OEM & B2B Capacity Configurator
  console.log('Switching to OEM & B2B Configurator view...');
  await oemTab.click();
  await page.waitForTimeout(400);

  const oemTitle = page.locator('text=OEM & Eksport Ishlab Chiqarish Parametrlari').first();
  console.log('OEM Configurator title visible:', await oemTitle.isVisible());
  if (!(await oemTitle.isVisible())) throw new Error('OEM Configurator did not render');

  // Select Plastic Injection & Molding
  console.log('Selecting "Plastik quyish va Press-qoliplar"...');
  const plasticOption = page.locator('button:has-text("Plastik quyish va Press-qoliplar")').first();
  await plasticOption.click();
  await page.waitForTimeout(200);

  // Select OEM & Privat-Leybl
  console.log('Selecting "OEM & Privat-Leybl"...');
  const oemOption = page.locator('button:has-text("OEM & Privat-Leybl")').first();
  await oemOption.click();
  await page.waitForTimeout(200);

  // Select Container & FTL
  console.log('Selecting "Konteyner & Fura"...');
  const ftlOption = page.locator('button:has-text("Konteyner & Fura")').first();
  await ftlOption.click();
  await page.waitForTimeout(200);

  // Verify spec summary
  const summaryBlock = page.locator('text=Konfiguratsiya xulosasi').first();
  console.log('Summary block visible:', await summaryBlock.isVisible());

  // Click "Xususiyatlarni B2B arizaga o‘tkazish"
  console.log('Clicking "Xususiyatlarni B2B arizaga o‘tkazish"...');
  const passSpecsBtn = page.locator('button:has-text("Xususiyatlarni B2B arizaga o‘tkazish")').first();
  await passSpecsBtn.click();
  await page.waitForTimeout(800);

  // Check if Contact textarea got pre-filled
  const contactTextarea = page.locator('#contact-message').first();
  const textareaVal = await contactTextarea.inputValue();
  console.log('Contact textarea pre-filled value:', textareaVal.slice(0, 100) + '...');
  if (!textareaVal.includes('[OEM/B2B CAPACITY SPECS]')) {
    throw new Error('Contact textarea was not pre-filled with OEM specs');
  }

  // 3. Test Export Corridors Map
  console.log('Navigating back to #portfel and selecting Export Corridors view...');
  await page.goto(`http://localhost:${PORT}/uz#portfel`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  const exportTabAgain = page.locator('button[role="tab"]:has-text("Eksport Koridorlari")').first();
  await exportTabAgain.click();
  await page.waitForTimeout(400);

  // Check SVG Map exists
  const svgMap = page.locator('svg[aria-label*="Export Corridors Vector Map"]').first();
  console.log('Export Corridor SVG Map visible:', await svgMap.isVisible());
  if (!(await svgMap.isVisible())) throw new Error('Export Corridor SVG Map did not render');

  // Verify Tashkent Central HQ text
  const tashkentNode = svgMap.locator('text:has-text("TASHKENT")').first();
  console.log('Tashkent HQ Node visible:', await tashkentNode.isVisible());
  if (!(await tashkentNode.isVisible())) throw new Error('Tashkent HQ Node missing in SVG');

  // Switch to Russia / CIS corridor
  console.log('Selecting Russia / CIS (RU) corridor pill...');
  const ruPill = page.locator('button:has-text("RU")').first();
  await ruPill.click();
  await page.waitForTimeout(300);

  const ruTitle = page.locator('text=Rossiya & MDH').first();
  console.log('Russia corridor spec card visible:', await ruTitle.isVisible());
  if (!(await ruTitle.isVisible())) throw new Error('Russia corridor spec card did not render');

  // Click "Ushbu yo‘nalish bo‘yicha eksport arizasi"
  console.log('Clicking export inquiry button...');
  const exportCtaBtn = page.locator('button:has-text("Ushbu yo‘nalish bo‘yicha eksport arizasi")').first();
  await exportCtaBtn.click();
  await page.waitForTimeout(800);

  const updatedTextareaVal = await contactTextarea.inputValue();
  console.log('Updated Contact textarea value:', updatedTextareaVal);
  if (!updatedTextareaVal.includes('[EXPORT INQUIRY]')) {
    throw new Error('Contact textarea was not pre-filled with Export corridor inquiry');
  }

  // Take screenshot
  await page.screenshot({ path: 'public/step3-export-and-oem-verify.png', fullPage: false });
  console.log('Verification screenshot saved to public/step3-export-and-oem-verify.png');

  console.log('Console errors captured:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  }

  console.log('==================================================');
  console.log('ALL STEP 3 B2B FEATURES VERIFIED SUCCESSFULLY!');
  console.log('==================================================');

  await browser.close();
}

runStep3Verification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});

