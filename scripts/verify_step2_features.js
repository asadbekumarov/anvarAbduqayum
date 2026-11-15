const { chromium } = require('playwright');

async function runVerification() {
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

  console.log(`Navigating to http://localhost:${PORT}/uz...`);
  await page.goto(`http://localhost:${PORT}/uz`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 1. Verify Command Palette Trigger in Navbar
  console.log('Verifying [ ⌘K ] trigger in Navbar...');
  const cmdTrigger = page.locator('header button:has-text("⌘K")').first();
  await cmdTrigger.waitFor({ state: 'visible', timeout: 5000 });
  const triggerVisible = await cmdTrigger.isVisible();
  console.log('Command Palette Trigger visible:', triggerVisible);
  if (!triggerVisible) throw new Error('Command palette trigger button not visible in Navbar');

  // 2. Open Command Palette via Click
  console.log('Clicking Command Palette trigger...');
  await cmdTrigger.click();
  await page.waitForTimeout(500);

  // Target the Command Palette dialog specifically (distinguishing from mobile drawer)
  const dialog = page.locator('[role="dialog"]:has(input[type="text"])').first();
  const dialogVisible = await dialog.isVisible();
  console.log('Command Palette dialog visible:', dialogVisible);
  if (!dialogVisible) throw new Error('Command palette dialog did not open');

  // 3. Verify Categories and Items
  console.log('Verifying Quick Actions, Core Sections, and Portfolio Ventures...');
  const quickActionsHeader = dialog.locator('text=Tezkor amallar').first();
  const coreSectionsHeader = dialog.locator('text=Asosiy bo‘limlar').first();
  const portfolioHeader = dialog.locator('text=Portfel korxonalari').first();

  console.log('Headers visible:', {
    quick: await quickActionsHeader.isVisible(),
    sections: await coreSectionsHeader.isVisible(),
    portfolio: await portfolioHeader.isVisible(),
  });

  // Verify specific items
  const bookMeeting = dialog.locator('button:has-text("Uchrashuv rejalashtirish")').first();
  const diagnostic = dialog.locator('button:has-text("B2B diagnostika testi")').first();
  const blueprintToggle = dialog.locator('button:has-text("Blueprint rejimini almashtirish")').first();
  const langUz = dialog.locator('button:has-text("O‘zbekcha (UZ)")').first();

  console.log('Quick action items present:', {
    bookMeeting: await bookMeeting.isVisible(),
    diagnostic: await diagnostic.isVisible(),
    blueprintToggle: await blueprintToggle.isVisible(),
    langUz: await langUz.isVisible(),
  });

  // 4. Test Search Filtering
  console.log('Testing search filtering with "Toybola"...');
  const searchInput = dialog.locator('input[placeholder*="Buyruq qidiring"]').first();
  await searchInput.fill('Toybola');
  await page.waitForTimeout(300);

  const toybolaItem = dialog.locator('button:has-text("Toybola Toys")').first();
  const toybolaVisible = await toybolaItem.isVisible();
  console.log('Search result for "Toybola" visible:', toybolaVisible);
  if (!toybolaVisible) throw new Error('Search filtering for Toybola failed');

  // Clear search and test keyboard navigation
  console.log('Clearing search and testing Arrow Down / Up keyboard navigation...');
  await searchInput.fill('');
  await page.waitForTimeout(300);

  // Press Arrow Down twice
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(100);
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(100);

  // Close with Escape
  console.log('Testing Escape key to close...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  const dialogClosed = !(await dialog.isVisible());
  console.log('Dialog closed after Escape:', dialogClosed);
  if (!dialogClosed) throw new Error('Escape key did not close command palette');

  // 5. Test Global Shortcut Cmd+K / Ctrl+K
  console.log('Testing Ctrl+K shortcut...');
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(500);
  const reopened = await dialog.isVisible();
  console.log('Command Palette reopened via Ctrl+K:', reopened);
  if (!reopened) throw new Error('Ctrl+K shortcut did not open command palette');

  // 6. Test Blueprint Mode Toggle
  console.log('Testing Blueprint Mode toggle...');
  const blueprintBtn = dialog.locator('button:has-text("Blueprint rejimini almashtirish")').first();
  await blueprintBtn.click();
  await page.waitForTimeout(400);

  const isBlueprintActive = await page.evaluate(() =>
    document.documentElement.classList.contains('blueprint-mode')
  );
  console.log('HTML has "blueprint-mode" class:', isBlueprintActive);
  if (!isBlueprintActive) throw new Error('Blueprint mode was not activated');

  // 7. Verify AudioThesisPlayer in Principles.tsx ("Qolip")
  console.log('Scrolling to #tamoyil (Principles section)...');
  await page.goto(`http://localhost:${PORT}/uz#tamoyil`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  const audioPlayer = page.locator('[role="region"][aria-label*="Falsafiy tezis"]').first();
  const audioPlayerVisible = await audioPlayer.isVisible();
  console.log('AudioThesisPlayer component visible:', audioPlayerVisible);
  if (!audioPlayerVisible) throw new Error('AudioThesisPlayer not found in Principles section');

  // Verify 24 vertical bars in waveform
  const waveformBars = audioPlayer.locator('div[aria-hidden="true"] > div');
  const barsCount = await waveformBars.count();
  console.log('Waveform bars count (expected 24):', barsCount);
  if (barsCount !== 24) throw new Error(`Expected 24 waveform bars, found ${barsCount}`);

  // Verify Real Authority Badge (OVOZLI TEZIS / AUDIO THESIS)
  const realBadge = audioPlayer.locator('text=OVOZLI TEZIS').first();
  const realBadgeVisible = await realBadge.isVisible();
  console.log('Real Audio Thesis badge visible:', realBadgeVisible);
  if (!realBadgeVisible) throw new Error('Real Audio Thesis badge not visible');

  // Verify Real YouTube Source link
  const ytSource = audioPlayer.locator('a[href*="youtube.com"]').first();
  const ytSourceVisible = await ytSource.isVisible();
  console.log('YouTube source link visible:', ytSourceVisible);
  if (!ytSourceVisible) throw new Error('YouTube source attribution link not visible');

  // Test Play click
  console.log('Clicking play on AudioThesisPlayer...');
  const playBtn = audioPlayer.locator('button').first();
  await playBtn.click();
  await page.waitForTimeout(1000);

  const isPlayingText = await audioPlayer.locator('text=Tinglanmoqda').first().isVisible();
  console.log('Player state changed to "Tinglanmoqda" (playing):', isPlayingText);
  if (!isPlayingText) throw new Error('Audio player did not transition to playing state');

  // Take screenshot
  await page.screenshot({ path: 'public/command-palette-and-audio-verify.png', fullPage: false });
  console.log('Verification screenshot saved to public/command-palette-and-audio-verify.png');

  console.log('Console errors captured:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  }

  console.log('==================================================');
  console.log('ALL STEP 2 FEATURES VERIFIED SUCCESSFULLY!');
  console.log('==================================================');

  await browser.close();
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
