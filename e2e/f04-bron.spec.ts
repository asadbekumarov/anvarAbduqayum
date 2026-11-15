import { test, expect } from '@playwright/test';

test.describe('F04: Uchrashuv belgilash (/bron)', () => {
  test('F04-H1 Bron sahifasi to‘liq yuklanishi va uchrashuv interfeysi', async ({ page }) => {
    const res = await page.goto('/uz/bron', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);

    const heading = page.locator('main h1, main h2').first();
    await expect(heading).toBeVisible();

    // Verify booking action or back-to-contact link inside main content
    const cta = page.locator('main a, main button').filter({ hasText: /(aloqa|bog‘lanish|yozish|contact|telegram|uchrashuv)/i }).first();
    await expect(cta).toBeVisible();
  });

  test('F04-E1 Mobil qurilmada bron sahifasi moslashuvchanligi', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/uz/bron', { waitUntil: 'domcontentloaded' });

    const heading = page.locator('main h1, main h2').first();
    await expect(heading).toBeVisible();

    // Verify no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });
});
