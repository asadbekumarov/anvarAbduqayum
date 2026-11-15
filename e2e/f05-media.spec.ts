import { test, expect } from '@playwright/test';

test.describe('F05: Media & Chiqishlar', () => {
  test('F05-H1 Media bo‘limi kartalari va havolalari render bo‘lishi', async ({ page }) => {
    await page.goto('/uz#media', { waitUntil: 'domcontentloaded' });
    const mediaSection = page.locator('#media');
    await expect(mediaSection).toBeVisible();

    // Verify video / interview cards or links
    const cards = mediaSection.locator('article, a[href*="youtu"], a[href*="youtube"], [role="article"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
