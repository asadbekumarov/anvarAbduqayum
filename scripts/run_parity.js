const fs = require('fs');

const WEIGHT = { must: 3, should: 2, could: 1, p0: 3, p1: 2, p2: 1 };
const CREDIT = { yes: 1.0, done: 1.0, partial: 0.5, no: 0.0, "": 0.0, todo: 0.0 };
const PRIORITY_NAME = { 3: 'must', 2: 'should', 1: 'could' };

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (!lines.length) return [];
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    // Simple CSV parser supporting unquoted fields
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    row.line = i + 1;
    if (row.feature) rows.push(row);
  }
  return rows;
}

function score(rows) {
  const counted = [];
  const skipped = [];
  const extras = [];
  const problems = [];

  for (const row of rows) {
    const original = (row.original || 'yes').toLowerCase();
    const clone = (row.clone || '').toLowerCase();
    const prio = (row.priority || '').toLowerCase();

    if (['no', 'n', 'false'].includes(original)) {
      extras.push(row);
      continue;
    }
    if (clone === 'skip') {
      skipped.push(row);
      continue;
    }

    const w = WEIGHT[prio] || 1;
    const c = CREDIT[clone] !== undefined ? CREDIT[clone] : 0.0;
    counted.push({ ...row, weight: w, credit: c });
  }

  const total = counted.reduce((sum, r) => sum + r.weight, 0);
  const got = counted.reduce((sum, r) => sum + r.weight * r.credit, 0);
  const feature_score = total ? (100.0 * got) / total : 0.0;

  const areas = {};
  for (const r of counted) {
    const a = r.area || '(no area)';
    if (!areas[a]) areas[a] = [0.0, 0.0, 0];
    areas[a][0] += r.weight * r.credit;
    areas[a][1] += r.weight;
    areas[a][2] += 1;
  }

  const by_area = Object.entries(areas)
    .map(([a, [g, t, n]]) => ({
      area: a,
      score: t ? Math.round((100.0 * g) / t * 10) / 10 : 0.0,
      features: n,
    }))
    .sort((a, b) => a.score - b.score);

  const missing = counted.filter(r => r.credit < 1.0);
  missing.sort((a, b) => b.weight - a.weight || a.credit - b.credit);

  const musts = counted.filter(r => r.weight === 3);
  const must_have_done = musts.filter(r => r.credit === 1.0).length;

  return {
    feature_score: Math.round(feature_score * 10) / 10,
    counted: counted.length,
    must_have_done,
    must_have_total: musts.length,
    by_area,
    missing,
    skipped,
    extras,
    problems,
  };
}

const csvText = fs.readFileSync('replica/features.csv', 'utf8');
const rows = parseCSV(csvText);
const result = score(rows);
console.log(JSON.stringify(result, null, 2));
