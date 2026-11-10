const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const viewports = [
    { name: '320x650 (Small Mobile)', width: 320, height: 650 },
    { name: '360x740 (Android)', width: 360, height: 740 },
    { name: '390x844 (iPhone 14)', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3015/uz', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => {
      const img = document.querySelector('.portrait-image-wrapper img');
      return img && img.complete && img.naturalWidth > 0 && img.offsetHeight > 100;
    }, { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(300);

    // Measure at scrollY = 0
    const atTop = await page.evaluate(() => {
      const sticky = document.querySelector('aside[aria-label="Tezkor aloqa paneli"]');
      const stickyRect = sticky ? sticky.getBoundingClientRect() : null;
      const metricsWrap = document.querySelector('#hero [aria-label="Tasdiqlangan Sanoat Ko\'rsatkichlari"]');
      const hero = document.getElementById('hero');
      const portraitCard = document.querySelector('#hero .portrait-archival-mat')?.parentElement;
      const metricItems = metricsWrap ? Array.from(metricsWrap.children).map((el, i) => {
        const r = el.getBoundingClientRect();
        return {
          index: i + 1,
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          clearanceAboveSticky: stickyRect ? Math.round(stickyRect.top - r.bottom) : null,
          text: el.innerText.replace(/\n/g, ' | ')
        };
      }) : [];

      return {
        viewportHeight: window.innerHeight,
        stickyTop: stickyRect ? Math.round(stickyRect.top) : null,
        stickyHeight: stickyRect ? Math.round(stickyRect.height) : null,
        heroBottom: hero ? Math.round(hero.getBoundingClientRect().bottom) : null,
        portraitBottom: portraitCard ? Math.round(portraitCard.getBoundingClientRect().bottom) : null,
        metricItems
      };
    });

    // Scroll to bottom of hero (align hero bottom with viewport bottom)
    await page.evaluate(() => {
      const hero = document.getElementById('hero');
      if (hero) {
        const bottomScroll = hero.offsetTop + hero.offsetHeight - window.innerHeight;
        window.scrollTo({ top: Math.max(0, bottomScroll), behavior: 'instant' });
      }
    });
    await page.waitForTimeout(300);

    const atHeroBottom = await page.evaluate(() => {
      const sticky = document.querySelector('aside[aria-label="Tezkor aloqa paneli"]');
      const stickyRect = sticky ? sticky.getBoundingClientRect() : null;
      const hero = document.getElementById('hero');
      const portraitCard = document.querySelector('#hero .portrait-archival-mat')?.parentElement;
      return {
        scrollY: Math.round(window.scrollY),
        stickyTop: stickyRect ? Math.round(stickyRect.top) : null,
        heroBottom: hero ? Math.round(hero.getBoundingClientRect().bottom) : null,
        portraitCardBottom: portraitCard ? Math.round(portraitCard.getBoundingClientRect().bottom) : null,
        clearanceAtHeroEnd: (portraitCard && stickyRect) ? Math.round(stickyRect.top - portraitCard.getBoundingClientRect().bottom) : null,
        overlapAtHeroEnd: (portraitCard && stickyRect) ? (portraitCard.getBoundingClientRect().bottom > stickyRect.top) : null
      };
    });

    // Scroll metrics end directly above sticky bar top to ensure reachability without clipping
    await page.evaluate(() => {
      const sticky = document.querySelector('aside[aria-label="Tezkor aloqa paneli"]');
      const metricsWrap = document.querySelector('#hero [aria-label="Tasdiqlangan Sanoat Ko\'rsatkichlari"]');
      if (sticky && metricsWrap) {
        const stickyH = sticky.getBoundingClientRect().height;
        const targetScroll = metricsWrap.getBoundingClientRect().bottom + window.scrollY - (window.innerHeight - stickyH - 16);
        window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'instant' });
      }
    });
    await page.waitForTimeout(200);

    const metricsScrolledClear = await page.evaluate(() => {
      const sticky = document.querySelector('aside[aria-label="Tezkor aloqa paneli"]');
      const metricsWrap = document.querySelector('#hero [aria-label="Tasdiqlangan Sanoat Ko\'rsatkichlari"]');
      const header = document.querySelector('header');
      if (!sticky || !metricsWrap || !header) return null;
      const mr = metricsWrap.getBoundingClientRect();
      const sr = sticky.getBoundingClientRect();
      const hr = header.getBoundingClientRect();
      return {
        metricsTop: Math.round(mr.top),
        headerBottom: Math.round(hr.bottom),
        metricsBottom: Math.round(mr.bottom),
        stickyTop: Math.round(sr.top),
        fitsBetweenHeaderAndSticky: mr.top >= hr.bottom && mr.bottom <= sr.top
      };
    });

    console.log(`\n=== ${vp.name} ===`);
    console.log('At Scroll Top (y=0):', JSON.stringify(atTop, null, 2));
    console.log('At Hero Bottom:', JSON.stringify(atHeroBottom, null, 2));
    console.log('Metrics Scrolled Reachability:', JSON.stringify(metricsScrolledClear, null, 2));
  }

  await browser.close();
})();
