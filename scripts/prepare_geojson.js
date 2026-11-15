const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const geoDir = path.join(__dirname, '../public/geo');
if (!fs.existsSync(geoDir)) {
  fs.mkdirSync(geoDir, { recursive: true });
}

const rawPath = path.join(geoDir, 'ne_50m_raw.geojson');
const finalPath = path.join(geoDir, 'countries-50m.json');

const url = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    console.log('Downloading Natural Earth 50m admin-0 countries GeoJSON...');
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error('Failed to download: ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  if (!fs.existsSync(rawPath)) {
    await downloadFile(url, rawPath);
    console.log('Downloaded raw file. Size:', (fs.statSync(rawPath).size / 1024 / 1024).toFixed(2), 'MB');
  } else {
    console.log('Raw file already exists.');
  }

  // Inspect raw data and fix any -99 ISO_A2 codes
  const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
  console.log('Total features:', rawData.features.length);

  // In Natural Earth, some countries like France (FR) or Norway (NO) or Northern Cyprus or Kosovo have -99 in ISO_A2.
  // Natural Earth provides ISO_A2_EH, WB_A2, POSTAL, or ADM0_A3.
  for (const f of rawData.features) {
    const p = f.properties;
    let iso = p.ISO_A2 || p.iso_a2;
    if (!iso || iso === '-99') {
      iso = p.ISO_A2_EH || p.iso_a2_eh || p.WB_A2 || p.wb_a2 || p.POSTAL || p.postal;
    }
    // Specific fixes if any:
    if (p.NAME === 'France' || p.NAME_LONG === 'France') iso = 'FR';
    if (p.NAME === 'Norway' || p.NAME_LONG === 'Norway') iso = 'NO';
    if (p.NAME === 'Northern Cyprus') iso = 'CY-TR';
    if (p.NAME === 'Kosovo') iso = 'XK';
    if (p.NAME === 'Somaliland') iso = 'SO-SL';

    p.ISO_A2 = iso;
    // Set feature.id to ISO_A2 as well for promoteId
    f.id = iso;
  }

  const preprocessedPath = path.join(geoDir, 'ne_50m_preprocessed.json');
  fs.writeFileSync(preprocessedPath, JSON.stringify(rawData));
  console.log('Preprocessed saved.');

  // Run mapshaper: simplify and filter fields to keep ISO_A2, NAME, and reduce precision to 3 decimals
  console.log('Simplifying with mapshaper...');
  execSync(`npx mapshaper "${preprocessedPath}" -simplify 10% keep-shapes -filter-fields ISO_A2,NAME,NAME_EN -o precision=0.001 format=geojson "${finalPath}"`, {
    stdio: 'inherit'
  });

  const finalStats = fs.statSync(finalPath);
  console.log('Final GeoJSON size:', (finalStats.size / 1024).toFixed(1), 'KB');

  // Verify features in final GeoJSON
  const finalData = JSON.parse(fs.readFileSync(finalPath, 'utf8'));
  console.log('Final features count:', finalData.features.length);

  // Clean up intermediate raw file if needed or keep for reference
  if (fs.existsSync(preprocessedPath)) fs.unlinkSync(preprocessedPath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
