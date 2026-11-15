import { test, expect } from '@playwright/test';

test.describe('F01: Asosiy sahifa navigatsiyasi & Til almashtirish', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('favicon') && !msg.text().includes('chrome-extension')) {
        console.warn(`[Browser console.error] ${msg.text()}`);
      }
    });
    page.on('response', (res) => {
      if (res.status() >= 500) {
        throw new Error(`HTTP 5xx Server Error (${res.status()}) on URL: ${res.url()}`);
      }
    });
  });

  test('F01-H1 Asosiy sahifa yuklanishi va bo‘limlarga silliq skroll (Happy path)', async ({ page, isMobile }) => {
    await page.goto('/uz', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
    await expect(page).toHaveTitle(/Anvar Abduqayum/i);

    const main = page.locator('main');
    await expect(main).toBeVisible();

    if (!isMobile) {
      const portfelLink = page.locator('nav a[href="#portfel"]').first();
      const timelineLink = page.locator('nav a[href="#yol"]').first();
      const contactLink = page.locator('nav a[href="#aloqa"]').first();

      await expect(portfelLink).toBeVisible();
      await expect(timelineLink).toBeVisible();
      await expect(contactLink).toBeVisible();

      await portfelLink.click();
      const portfelSection = page.locator('#portfel');
      await expect(portfelSection).toBeVisible();
    } else {
      const menuButton = page.locator('button[aria-controls="mobile-drawer-panel"]').first();
      await expect(menuButton).toBeVisible();
    }
  });

  test('F01-H2 Til almashtirgich (i18n: uz -> ru)', async ({ page, isMobile }) => {
    await page.goto('/uz', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    if (isMobile) {
      const menuBtn = page.locator('button[aria-controls="mobile-drawer-panel"]').first();
      await menuBtn.click();
      await page.waitForTimeout(400);

      const ruBtn = page.locator('#mobile-drawer-panel button:has-text("RU")').first();
      await expect(ruBtn).toBeVisible();
      await ruBtn.click();
      await expect(page).toHaveURL(/\/ru/, { timeout: 8000 });
    } else {
      const ruBtn = page.locator('header button:has-text("RU")').first();
      await ruBtn.click();
      await expect(page).toHaveURL(/\/ru/, { timeout: 8000 });
    }
  });

  test('F01-E1 Mobil o‘lchamda drawer menyu (Edge: mobile width)', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Drawer menyu faqat mobil rezhimda tekshiriladi');
    await page.goto('/uz', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const menuButton = page.locator('button[aria-controls="mobile-drawer-panel"]').first();
    await menuButton.click();

    const drawer = page.locator('#mobile-drawer-panel').first();
    await expect(drawer).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });

  test('F01-E2 To‘g‘ridan-to‘g‘ri hash orqali kirish (Edge: refresh mid-flow)', async ({ page }) => {
    const response = await page.goto('/uz#aloqa', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBeLessThan(400);
    const contactSection = page.locator('#aloqa');
    await expect(contactSection).toBeVisible();
  });

  test('F01-N1 Noto‘g‘ri yoki mavjud bo‘lmagan til (Negative: invalid locale)', async ({ page }) => {
    const response = await page.goto('/fr', { waitUntil: 'domcontentloaded' });
    const currentUrl = page.url();
    expect(currentUrl.includes('/uz') || response?.status() === 404).toBeTruthy();
  });
});
