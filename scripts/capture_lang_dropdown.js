const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000/uz', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1000);

  const trigger = p.locator('header [role="combobox"]');
  await trigger.click();
  await p.waitForTimeout(600);

  const outDir = 'C:/Users/VICTUS/.gemini/antigravity/brain/54e6e4f9-bc8a-4e13-8ddb-d35d7f953bd6';
  await p.screenshot({
    path: path.join(outDir, 'lang-selector-compact.png'),
    clip: { x: 950, y: 0, width: 490, height: 260 }
  });
  console.log('Captured lang-selector-compact.png');

  await b.close();
})();

