const { chromium } = require('playwright');
const path = require('path');

async function captureHeroAndDossier() {
  const browser = await chromium.launch({ headless: true });

  // Desktop combined
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1600 } });
  await desktop.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await desktop.screenshot({
    path: path.resolve('screenshots/phase2-2-hero-and-dossier-desktop-1440.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1600 }
  });

  // Mobile combined
  const mobile = await browser.newPage({ viewport: { width: 390, height: 1800 } });
  await mobile.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
  await mobile.screenshot({
    path: path.resolve('screenshots/phase2-2-hero-and-dossier-mobile-390.png'),
    clip: { x: 0, y: 0, width: 390, height: 1800 }
  });

  await browser.close();
  console.log('Hero and Dossier combined screenshots captured!');
}

captureHeroAndDossier();

