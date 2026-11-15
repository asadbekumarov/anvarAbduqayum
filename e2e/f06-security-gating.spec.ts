import { test, expect } from '@playwright/test';

test.describe('F06: Xavfsizlik & Modullarni boshqarish (Feature Gating)', () => {
  test('F06-N1 O‘chirilgan /test diagnostika yo‘nalishi to‘silganligi', async ({ page }) => {
    const res = await page.goto('/uz/test', { waitUntil: 'domcontentloaded' });
    // In v1, quiz feature is false, should be 404 or redirect
    const url = page.url();
    expect(res?.status() === 404 || url.endsWith('/uz') || url.endsWith('/uz/')).toBeTruthy();
  });

  test('F06-H1 robots.txt va sitemap.xml to‘g‘ri javob berishi', async ({ request }) => {
    const robotsRes = await request.get('/robots.txt');
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText).toContain('User-Agent');

    const sitemapRes = await request.get('/sitemap.xml');
    expect(sitemapRes.status()).toBe(200);
    const sitemapText = await sitemapRes.text();
    expect(sitemapText).toContain('urlset');
  });
});
