const fs = require('fs');
const path = require('path');

const SKIP_DIRS = new Set([
  '.git', 'node_modules', '.next', '.nuxt', '.svelte-kit', 'dist', 'build',
  'out', '.vercel', '.turbo', '.cache', 'coverage', '__pycache__', '.venv',
  'venv', 'Pods', '.expo', 'DerivedData', '.gradle', '.agents'
]);

const SKIP_FILES = new Set([
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lockb',
  'Podfile.lock', 'Cargo.lock', 'poetry.lock'
]);

const BINARY_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.icns', '.pdf', '.zip',
  '.gz', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.mp4', '.mov', '.mp3',
  '.wav', '.avif', '.heic', '.psd', '.sketch', '.fig', '.jar', '.so', '.dylib'
]);

const HEX_REGEX = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z])/g;

function normHex(h) {
  let clean = h.toLowerCase().replace(/^#/, '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  return '#' + clean;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPatterns(avoid, domains) {
  const pats = [];
  for (const name of avoid) {
    const trimmed = name.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(/[\s_-]+/).filter(Boolean).map(escapeRegex);
    pats.push({
      kind: 'name',
      label: trimmed,
      regex: new RegExp(parts.join('[\\s_-]?'), 'i')
    });
  }
  for (const d of domains) {
    const trimmed = d.trim().toLowerCase();
    if (!trimmed) continue;
    pats.push({
      kind: 'domain',
      label: trimmed,
      regex: new RegExp(escapeRegex(trimmed), 'i')
    });
  }
  return pats;
}

function isBinary(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (BINARY_EXT.has(ext)) return true;
  try {
    const buf = Buffer.alloc(4096);
    const fd = fs.openSync(filePath, 'r');
    const bytesRead = fs.readSync(fd, buf, 0, 4096, 0);
    fs.closeSync(fd);
    for (let i = 0; i < bytesRead; i++) {
      if (buf[i] === 0) return true;
    }
  } catch (e) {
    return true;
  }
  return false;
}

function sweep(rootDir, avoid = [], domains = [], colors = [], includeReplica = false, maxSize = 2000000) {
  const pats = buildPatterns(avoid, domains);
  const colorSet = new Set(colors.map(normHex));
  const hits = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.relative(rootDir, fullPath);

      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        if (entry.name === 'replica' && relPath === 'replica' && !includeReplica) continue;
        for (const p of pats) {
          if (p.kind === 'name' && p.regex.test(entry.name)) {
            hits.push({
              file: relPath + '/',
              line: 0,
              kind: 'path',
              match: p.label,
              text: 'folder name'
            });
          }
        }
        walk(fullPath);
      } else if (entry.isFile()) {
        if (SKIP_FILES.has(entry.name)) continue;
        for (const p of pats) {
          if (p.kind === 'name' && p.regex.test(entry.name)) {
            hits.push({
              file: relPath,
              line: 0,
              kind: 'path',
              match: p.label,
              text: 'file name'
            });
          }
        }

        try {
          const stat = fs.statSync(fullPath);
          if (stat.size > maxSize || isBinary(fullPath)) continue;
          const content = fs.readFileSync(fullPath, 'utf8');
          const lines = content.split(/\r?\n/);
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            for (const p of pats) {
              if (p.regex.test(line)) {
                hits.push({
                  file: relPath,
                  line: i + 1,
                  kind: p.kind,
                  match: p.label,
                  text: line.trim().substring(0, 160)
                });
              }
            }
            if (colorSet.size > 0) {
              const matches = line.match(HEX_REGEX);
              if (matches) {
                for (const m of matches) {
                  const n = normHex(m);
                  if (colorSet.has(n)) {
                    hits.push({
                      file: relPath,
                      line: i + 1,
                      kind: 'color',
                      match: n,
                      text: line.trim().substring(0, 160)
                    });
                  }
                }
              }
            }
          }
        } catch (e) {
          // ignore unreadable
        }
      }
    }
  }

  walk(rootDir);
  return hits;
}

function render(hits) {
  if (hits.length === 0) {
    return 'Clean. Nothing of the original\'s name, domain or colours found.';
  }
  const byKind = {};
  const lines = [];
  for (const h of hits) {
    byKind[h.kind] = (byKind[h.kind] || 0) + 1;
    const loc = h.line === 0 ? h.file : `${h.file}:${h.line}`;
    lines.push(`${h.kind.padEnd(7)} ${h.match.slice(0, 18).padEnd(18)} ${loc}  ${h.text}`);
  }
  lines.push('');
  const kindSummary = Object.entries(byKind).map(([k, v]) => `${k} ${v}`).join(', ');
  lines.push(`${hits.length} hits (${kindSummary}). Replace every one before you launch.`);
  return lines.join('\n');
}

function main() {
  const configPath = path.join(__dirname, '..', 'replica', 'brand.json');
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`);
    process.exit(2);
  }
  const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const root = path.join(__dirname, '..');
  const hits = sweep(root, cfg.avoid || [], cfg.domains || [], cfg.colors || [], false);
  console.log(render(hits));
  process.exit(hits.length > 0 ? 1 : 0);
}

main();
