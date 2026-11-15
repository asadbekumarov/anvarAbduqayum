#!/usr/bin/env node
/**
 * WCAG 2.2 Contrast Ratio Validator for replica-design tokens.
 * Matches contrast.py algorithms exactly using relative luminance.
 */
const fs = require('fs');
const path = require('path');

const HEX = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const NEEDS = {
  normal: [4.5, 7.0],
  large: [3.0, 4.5],
  ui: [3.0, 3.0]
};

function parseHex(value) {
  const m = HEX.exec(value.trim());
  if (!m) throw new Error(`Not a hex colour: ${value}`);
  let h = m[1];
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16)
  ];
}

function luminance(rgb) {
  function chan(c) {
    c = c / 255.0;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  const [r, g, b] = rgb.map(chan);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const la = luminance(parseHex(fg));
  const lb = luminance(parseHex(bg));
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

function check(cols, pairs) {
  const rows = [];
  for (const p of pairs) {
    if (p.length < 2) continue;
    const [fg, bg] = p;
    const size = p[2] || 'normal';
    const thresholds = NEEDS[size] || NEEDS.normal;

    if (!cols[fg] || !cols[bg]) {
      rows.push({ fg, bg, size, error: 'unknown token' });
      continue;
    }

    const r = ratio(cols[fg], cols[bg]);
    const [aa, aaa] = thresholds;
    rows.push({
      fg,
      bg,
      size,
      ratio: Number(r.toFixed(2)),
      aa: r >= aa,
      aaa: r >= aaa,
      fg_hex: cols[fg],
      bg_hex: cols[bg]
    });
  }
  return rows;
}

function render(rows) {
  const out = [];
  for (const r of rows) {
    if (r.error) {
      out.push(`  ??    ${r.fg.padEnd(24)} on ${r.bg.padEnd(20)} ${r.error}`);
      continue;
    }
    let grade;
    if (r.size === 'ui') {
      grade = r.aa ? 'PASS' : 'FAIL';
    } else {
      grade = r.aaa ? 'AAA' : (r.aa ? 'AA' : 'FAIL');
    }
    const ratioStr = `${r.ratio.toFixed(2)}:1`.padStart(8);
    const sizeStr = r.size === 'normal' ? '' : ` (${r.size})`;
    out.push(`  ${grade.padEnd(5)} ${ratioStr}  ${r.fg.padEnd(22)} on ${r.bg.padEnd(20)} [${r.fg_hex} on ${r.bg_hex}]${sizeStr}`);
  }
  const fails = rows.filter(r => r.error || !r.aa).length;
  out.push('');
  out.push(`  Summary: ${rows.length} pairs checked, ${fails} failing AA threshold.`);
  return { output: out.join('\n'), fails };
}

function main() {
  const targetFile = process.argv[2] || 'replica/design/tokens.json';
  const filePath = path.resolve(process.cwd(), targetFile);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(2);
  }

  const tokens = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const cols = tokens.color || tokens.colors || {};
  const pairs = tokens.pairs || [];

  if (!pairs.length) {
    console.error('No pairs found in tokens file.');
    process.exit(2);
  }

  const rows = check(cols, pairs);
  const { output, fails } = render(rows);
  console.log('\n--- WCAG 2.2 Contrast Verification Report ---');
  console.log(output);
  console.log('---------------------------------------------\n');

  if (fails > 0) {
    process.exit(1);
  } else {
    console.log('All token pairs pass WCAG AA standards!\n');
    process.exit(0);
  }
}

module.exports = { parseHex, luminance, ratio, check, render };

if (require.main === module) {
  main();
}
