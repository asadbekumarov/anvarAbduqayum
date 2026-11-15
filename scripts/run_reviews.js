const fs = require('fs');
const path = require('path');

const THEMES_PATH = path.join(__dirname, '..', '.agents', 'skills', 'replica-entrepreneur', 'themes.json');
const REVIEWS_CSV_PATH = path.join(__dirname, '..', 'replica', 'reviews.csv');
const OUT_MD_PATH = path.join(__dirname, '..', 'replica', 'feedback.md');

function loadThemes(themesPath) {
  const raw = JSON.parse(fs.readFileSync(themesPath, 'utf8'));
  const themes = (raw.themes || []).map(t => ({
    id: t.id,
    label: t.label || t.id,
    kind: t.kind || 'complaint',
    patterns: (t.patterns || []).map(p => new RegExp(p, 'i'))
  }));
  const requests = (raw.request_patterns || []).map(p => new RegExp(p, 'i'));
  return { themes, requests };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] || '').trim();
    });
    rows.push(row);
  }
  return { headers, rows };
}

function parseDate(text) {
  if (!text) return null;
  const trimmed = text.trim();
  const d = new Date(trimmed);
  return isNaN(d.getTime()) ? null : d;
}

function parseRating(text) {
  if (!text) return null;
  const val = parseFloat(text.trim());
  if (isNaN(val) || val < 1 || val > 5) return null;
  return val;
}

function hostOf(url) {
  const m = url.match(/^https?:\/\/(?:www\.)?([^/]+)/);
  return m ? m[1] : 'unknown';
}

function weight(rv, today, months) {
  const r = rv.rating;
  let w = (r === null) ? 0.6 : (6.0 - r) / 5.0;
  if (rv.date && today) {
    const ageDays = (today.getTime() - rv.date.getTime()) / (1000 * 3600 * 24);
    if (ageDays > months * 30.4) {
      w *= 0.5;
    }
  }
  return w;
}

function snippet(text, regex, limit = 220) {
  const sentences = text.split(/(?<=[.!?])\s+|\n+/);
  for (const sent of sentences) {
    if (regex.test(sent)) {
      let s = sent.trim();
      if (s.length > limit) {
        const m = s.match(regex);
        const matchIndex = m ? m.index : 0;
        const start = Math.max(0, matchIndex - Math.floor(limit / 2));
        s = s.substring(start, start + limit).trim();
        s = (start > 0 ? '...' : '') + s + '...';
      }
      return s;
    }
  }
  const s = text.trim();
  return s.length <= limit ? s : s.substring(0, limit).trimRight() + '...';
}

function run() {
  const { themes, requests: requestPatterns } = loadThemes(THEMES_PATH);
  const csvContent = fs.readFileSync(REVIEWS_CSV_PATH, 'utf8');
  const { headers, rows } = parseCSV(csvContent);

  let dropped = 0;
  let dupes = 0;
  const seen = new Set();
  const kept = [];

  for (const raw of rows) {
    const url = raw.url || '';
    const text = raw.text || '';
    if (!url || !text || !/^https?:\/\//i.test(url)) {
      dropped++;
      continue;
    }
    const key = text.toLowerCase().replace(/\W+/g, ' ').trim();
    if (seen.has(key)) {
      dupes++;
      continue;
    }
    seen.add(key);
    kept.push({
      source: raw.source || hostOf(url),
      url,
      date: parseDate(raw.date),
      rating: parseRating(raw.rating),
      text
    });
  }

  const today = new Date('2026-11-16');
  const months = 18;
  const results = {};
  for (const t of themes) {
    results[t.id] = {
      id: t.id,
      label: t.label,
      kind: t.kind,
      reviews: [],
      score: 0.0
    };
  }

  const foundRequests = [];
  const unthemedNegative = [];

  for (const rv of kept) {
    const w = weight(rv, today, months);
    let matched = false;
    for (const t of themes) {
      const hit = t.patterns.find(p => p.test(rv.text));
      if (!hit) continue;
      matched = true;
      const res = results[t.id];
      res.score += w;
      res.reviews.push({ rv, quote: snippet(rv.text, hit) });
    }

    const reqHit = requestPatterns.find(p => p.test(rv.text));
    if (reqHit) {
      foundRequests.push({
        quote: snippet(rv.text, reqHit),
        url: rv.url,
        source: rv.source,
        rating: rv.rating
      });
    }

    if (!matched && rv.rating !== null && rv.rating <= 2) {
      unthemedNegative.push(rv);
    }
  }

  const total = kept.length || 1;
  const ranked = [];
  for (const res of Object.values(results)) {
    const items = res.reviews;
    if (!items || items.length === 0) continue;
    const rated = items.map(x => x.rv.rating).filter(r => r !== null);
    const sources = Array.from(new Set(items.map(x => x.rv.source))).sort();
    items.sort((a, b) => {
      const rA = a.rv.rating !== null ? a.rv.rating : 3;
      const rB = b.rv.rating !== null ? b.rv.rating : 3;
      if (rA !== rB) return rA - rB;
      return a.quote.length - b.quote.length;
    });

    ranked.push({
      id: res.id,
      label: res.label,
      kind: res.kind,
      score: Math.round(res.score * 100) / 100,
      count: items.length,
      share_pct: Math.round((100.0 * items.length / total) * 10) / 10,
      avg_rating: rated.length > 0 ? Math.round((rated.reduce((a, b) => a + b, 0) / rated.length) * 100) / 100 : null,
      sources,
      thin: items.length < 3 || sources.length < 2,
      quotes: items.slice(0, 3).map(x => ({
        quote: x.quote,
        url: x.rv.url,
        source: x.rv.source,
        rating: x.rv.rating
      }))
    });
  }

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.count !== a.count) return b.count - a.count;
    return a.id.localeCompare(b.id);
  });

  const allSources = Array.from(new Set(kept.map(r => r.source))).sort();
  const ratedCount = kept.filter(r => r.rating !== null).length;

  function stars(r) {
    return r === null ? '-' : `${r}*`;
  }

  const out = [];
  out.push('# What users of the original hate and want\n');
  out.push(`${kept.length} reviews from ${allSources.length} sources (${allSources.join(', ') || 'none'}). ${ratedCount} had star ratings.`);
  if (dropped > 0) {
    out.push(`${dropped} rows dropped: no link or no text. Nothing is counted without its source.`);
  }
  if (dupes > 0) {
    out.push(`${dupes} duplicate reviews removed.`);
  }
  if (kept.length < 30) {
    out.push('\nSmall sample. Under 30 reviews supports a direction, not a ranking. Collect more before you bet the roadmap on it.');
  }

  for (const [kind, title] of [['complaint', 'What they hate'], ['request', 'What they ask for']]) {
    const rows = ranked.filter(t => t.kind === kind);
    out.push(`\n## ${title}\n`);
    if (rows.length === 0) {
      out.push('Nothing matched. Read the reviews by hand.');
      continue;
    }
    out.push('| rank | theme | score | reviews | share | avg stars | sources |');
    out.push('| --- | --- | --- | --- | --- | --- | --- |');
    rows.forEach((t, i) => {
      out.push(`| ${i + 1} | ${t.label}${t.thin ? ' (thin)' : ''} | ${t.score.toFixed(1)} | ${t.count} | ${t.share_pct.toFixed(0)}% | ${t.avg_rating === null ? '-' : t.avg_rating.toFixed(1)} | ${t.sources.length} |`);
    });

    for (const t of rows.slice(0, 6)) {
      out.push(`\n**${t.label}**`);
      for (const q of t.quotes) {
        out.push(`- "${q.quote}" (${q.source}, ${stars(q.rating)}) ${q.url}`);
      }
    }
  }

  if (foundRequests.length > 0) {
    out.push('\n## Asked for in their own words\n');
    for (const q of foundRequests.slice(0, 25)) {
      out.push(`- "${q.quote}" (${q.source}, ${stars(q.rating)}) ${q.url}`);
    }
  }

  if (unthemedNegative.length > 0) {
    out.push('\n## Read these by hand\n');
    out.push('Low ratings that matched no theme. Either noise, or a theme themes.json does not have yet. Often the most useful part.\n');
    for (const r of unthemedNegative.slice(0, 15)) {
      out.push(`- (${r.source}, ${stars(r.rating)}) ${r.url}: "${r.text.substring(0, 220)}"`);
    }
  }

  fs.writeFileSync(OUT_MD_PATH, out.join('\n') + '\n', 'utf8');
  console.log(`wrote ${OUT_MD_PATH}`);
}

run();
