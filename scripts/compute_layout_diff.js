const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function runLayoutDiff() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  const screens = [
    { id: 'S01', name: 'Hero Section', orig: 'replica/screens/S01-hero.png', clone: 'replica/clone-screens/S01-hero.png' },
    { id: 'S02', name: 'Portfolio Ecosystem', orig: 'replica/screens/S02-portfolio.png', clone: 'replica/clone-screens/S02-portfolio.png' },
    { id: 'S03', name: 'Timeline Journey', orig: 'replica/screens/S03-timeline.png', clone: 'replica/clone-screens/S03-timeline.png' },
    { id: 'S04', name: 'B2B Contact Form', orig: 'replica/screens/S04-contact.png', clone: 'replica/clone-screens/S04-contact.png' },
    { id: 'S05', name: 'Booking Route', orig: 'replica/screens/S05-bron.png', clone: 'replica/clone-screens/S05-bron.png' },
  ];

  const results = [];

  for (const s of screens) {
    if (!fs.existsSync(s.orig) || !fs.existsSync(s.clone)) {
      console.warn(`Skipping ${s.id}, missing files.`);
      continue;
    }

    const origBase64 = fs.readFileSync(s.orig).toString('base64');
    const cloneBase64 = fs.readFileSync(s.clone).toString('base64');

    const diffResult = await page.evaluate(async ({ origB64, cloneB64, screenId }) => {
      function loadImage(b64) {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = `data:image/png;base64,${b64}`;
        });
      }

      const imgA = await loadImage(origB64);
      const imgB = await loadImage(cloneB64);

      const targetW = 480;
      const scaleA = targetW / imgA.width;
      const scaleB = targetW / imgB.width;

      const hA = Math.round(imgA.height * scaleA);
      const hB = Math.round(imgB.height * scaleB);
      const sharedH = Math.min(hA, hB);

      const canvasA = document.createElement('canvas');
      canvasA.width = targetW; canvasA.height = sharedH;
      const ctxA = canvasA.getContext('2d');
      ctxA.drawImage(imgA, 0, 0, targetW, hA);

      const canvasB = document.createElement('canvas');
      canvasB.width = targetW; canvasB.height = sharedH;
      const ctxB = canvasB.getContext('2d');
      ctxB.drawImage(imgB, 0, 0, targetW, hB);

      const dataA = ctxA.getImageData(0, 0, targetW, sharedH).data;
      const dataB = ctxB.getImageData(0, 0, targetW, sharedH).data;

      // Layout mode: compute edge density on a 16x16 grid cell structure
      const cellSize = 16;
      const cols = Math.floor(targetW / cellSize);
      const rows = Math.floor(sharedH / cellSize);

      let totalScoredCells = 0;
      let matchedScoreSum = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let edgesA = 0;
          let edgesB = 0;

          for (let y = r * cellSize; y < (r + 1) * cellSize - 1; y++) {
            for (let x = c * cellSize; x < (c + 1) * cellSize - 1; x++) {
              const idx = (y * targetW + x) * 4;
              const idxRight = (y * targetW + (x + 1)) * 4;
              const idxDown = ((y + 1) * targetW + x) * 4;

              // Lum
              const lumA = 0.299 * dataA[idx] + 0.587 * dataA[idx + 1] + 0.114 * dataA[idx + 2];
              const lumARight = 0.299 * dataA[idxRight] + 0.587 * dataA[idxRight + 1] + 0.114 * dataA[idxRight + 2];
              const lumADown = 0.299 * dataA[idxDown] + 0.587 * dataA[idxDown + 1] + 0.114 * dataA[idxDown + 2];
              if (Math.abs(lumA - lumARight) > 18 || Math.abs(lumA - lumADown) > 18) edgesA++;

              const lumB = 0.299 * dataB[idx] + 0.587 * dataB[idx + 1] + 0.114 * dataB[idx + 2];
              const lumBRight = 0.299 * dataB[idxRight] + 0.587 * dataB[idxRight + 1] + 0.114 * dataB[idxRight + 2];
              const lumBDown = 0.299 * dataB[idxDown] + 0.587 * dataB[idxDown + 1] + 0.114 * dataB[idxDown + 2];
              if (Math.abs(lumB - lumBRight) > 18 || Math.abs(lumB - lumBDown) > 18) edgesB++;
            }
          }

          if (edgesA > 2 || edgesB > 2) {
            totalScoredCells++;
            const maxEdges = Math.max(edgesA, edgesB);
            const sim = 1.0 - Math.abs(edgesA - edgesB) / maxEdges;
            matchedScoreSum += sim;
          }
        }
      }

      const score = totalScoredCells > 0 ? (100.0 * matchedScoreSum) / totalScoredCells : 100.0;

      return {
        screenId,
        score: Math.round(score * 10) / 10,
        heightDiff: Math.abs(hA - hB),
        originalHeight: hA,
        cloneHeight: hB,
      };
    }, { origB64: origBase64, cloneB64: cloneBase64, screenId: s.id });

    const diffJsonPath = `replica/diffs/${s.id}.json`;
    const payload = {
      files: { original: s.orig, clone: s.clone },
      score: diffResult.score,
      mode: 'layout',
      height_diff: diffResult.heightDiff,
      screen: s.name,
    };

    fs.writeFileSync(diffJsonPath, JSON.stringify(payload, null, 2));
    console.log(`${s.id} (${s.name}): Layout Parity ${diffResult.score}%`);
    results.push(payload);
  }

  await browser.close();
  return results;
}

runLayoutDiff().then(() => console.log('All layout diffs computed!'));
