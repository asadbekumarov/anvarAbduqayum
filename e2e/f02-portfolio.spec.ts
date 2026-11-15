import { test, expect } from '@playwright/test';

test.describe('F02: Ekotizim & Portfel korxonalari', () => {
  test.beforeEach(async ({ page }) => {
    page.on('response', (res) => {
      if (res.status() >= 500) {
        throw new Error(`HTTP 5xx Server Error (${res.status()}) on URL: ${res.url()}`);
      }
    });
  });

  test('F02-H1 Portfel korxonalari kartalari ko‘rinishi (Happy path)', async ({ page }) => {
    await page.goto('/uz#portfel', { waitUntil: 'domcontentloaded' });
    const portfelSection = page.locator('#portfel');
    await expect(portfelSection).toBeVisible();

    const toybola = page.locator('text=Toybola').first();
    await expect(toybola).toBeVisible();
  });

  test('F02-H2 Portfel ko‘rinishlarini almashtirish (Tabs Switcher)', async ({ page }) => {
    await page.goto('/uz#portfel', { waitUntil: 'domcontentloaded' });

    // Target the main view tablist ("Portfolio Tools & Views")
    const viewTabs = page.locator('#portfel [role="tablist"][aria-label="Portfolio Tools & Views"] button[role="tab"]');
    const count = await viewTabs.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const tab = viewTabs.nth(i);
      await tab.click();
      await page.waitForTimeout(200);
      await expect(tab).toBeVisible();
    }
  });

  test('F02-E1 Tezkor tab almashtirishda barqarorlik (Edge: rapid tab switching)', async ({ page }) => {
    await page.goto('/uz#portfel', { waitUntil: 'domcontentloaded' });

    const viewTabs = page.locator('#portfel [role="tablist"][aria-label="Portfolio Tools & Views"] button[role="tab"]');
    const count = await viewTabs.count();

    if (count >= 2) {
      for (let cycle = 0; cycle < 3; cycle++) {
        await viewTabs.nth(0).click();
        await viewTabs.nth(1).click();
      }
      await page.waitForTimeout(300);
      const portfelSection = page.locator('#portfel');
      await expect(portfelSection).toBeVisible();
    }
  });
});
