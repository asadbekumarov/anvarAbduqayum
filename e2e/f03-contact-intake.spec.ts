import { test, expect } from '@playwright/test';

test.describe('F03: B2B Hamkorlik & Aloqa arizasi (Contact Form)', () => {
  test('F03-E1 Bo‘sh maydonlar bilan yuborishda validatsiya xatosi (Edge: empty input)', async ({ page }) => {
    await page.goto('/uz#aloqa', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const submitBtn = page.locator('#contact-inquiry-form button[type="submit"]').first();
    await submitBtn.scrollIntoViewIfNeeded();
    await expect(submitBtn).toBeVisible();

    await submitBtn.click();

    const nameInput = page.locator('#contact-name');
    await expect(nameInput).toBeVisible();
    const isInvalid = await nameInput.getAttribute('aria-invalid');
    expect(isInvalid === 'true' || isInvalid !== null).toBeTruthy();
  });

  test('F03-E2 O‘zbekcha maxsus belgilar & emojilar kiritilishi (Edge: accents & emoji)', async ({ page }) => {
    await page.goto('/uz#aloqa', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const nameInput = page.locator('#contact-name');
    const phoneInput = page.locator('#contact-phone');
    const businessInput = page.locator('#contact-business');
    const messageInput = page.locator('#contact-message');

    await nameInput.scrollIntoViewIfNeeded();
    await nameInput.click();
    await nameInput.fill('O‘ktam G‘aniyev 🏭 🚀');
    await phoneInput.fill('90 123 45 67');
    await businessInput.fill('“Toshkent Sanoat Qoliplari” MChJ');
    await messageInput.fill('B2B hamkorlik bo‘yicha taklif: o‘zbekcha qolip va press standartlari.');

    await expect(nameInput).toHaveValue(/O‘ktam G‘aniyev/);
    await expect(businessInput).toHaveValue(/Toshkent Sanoat Qoliplari/);
  });

  test('F03-N1 Bot / Honeypot to‘ldirilganda silent ok bilan botni to‘xtatish (Negative: honeypot)', async ({ request }) => {
    const response = await request.post('/api/lead', {
      data: {
        name: 'Bot Spammer',
        phone: '+998901234567',
        business: 'Spam Co',
        honeypot: 'http://spam-link.test',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });

  test('F03-N2 Noto‘g‘ri telefon raqami formati rad etilishi (Negative: invalid phone)', async ({ request }) => {
    const response = await request.post('/api/lead', {
      data: {
        name: 'Test Foydalanuvchi',
        phone: 'not-a-phone-number-123',
        business: 'Test MChJ',
      },
    });

    expect([400, 429]).toContain(response.status());
    const body = await response.json();
    expect(body.ok).toBe(false);
  });
});
