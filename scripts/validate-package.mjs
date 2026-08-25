import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const repoDir = resolve(import.meta.dirname, '..');
const output = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
  cwd: repoDir,
  encoding: 'utf8',
});
const [pack] = JSON.parse(output);
const files = new Set(pack.files.map(({ path }) => path));
const required = [
  'package.json', 'README.md', 'LICENSE',
  'dist/index.js', 'dist/index.js.map',
  'dist/index.umd.cjs', 'dist/index.umd.cjs.map',
  'dist/summernote-heading.browser.js', 'dist/summernote-heading.browser.js.map',
  'dist/types/index.d.ts',
];
const missing = required.filter((path) => !files.has(path));
if (missing.length) throw new Error(`Heading package is missing: ${missing.join(', ')}`);
const forbidden = [...files].filter((path) => path.startsWith('src/') || path.startsWith('test/') || path.startsWith('scripts/') || path.startsWith('v3-tooling/'));
if (forbidden.length) throw new Error(`Heading package leaks internal files: ${forbidden.join(', ')}`);

const manifest = JSON.parse(readFileSync(resolve(repoDir, 'package.json'), 'utf8'));
if (manifest.name !== 'summernote-heading') throw new Error(`Unexpected package name: ${manifest.name}`);
if (typeof manifest.version !== 'string' || !/^3\.0\.0(?:-rc\.\d+)?$/.test(manifest.version)) {
  throw new Error(`Unexpected Heading version: ${manifest.version}`);
}

const installSummernoteStub = () => {
  const summernote = { plugins: {} };
  globalThis.$ = { summernote, extend(target, source) { Object.assign(target, source); return target; } };
  return summernote;
};

const esmSummernote = installSummernoteStub();
const esm = await import(`${pathToFileURL(resolve(repoDir, 'dist/index.js')).href}?package-check=${Date.now()}`);
if (esmSummernote.plugins.summernoteHeading !== esm.SummernoteHeadingV3) throw new Error('ESM entrypoint did not register Heading.');

const cjsSummernote = installSummernoteStub();
const require = createRequire(import.meta.url);
const cjs = require(resolve(repoDir, 'dist/index.umd.cjs'));
if (cjsSummernote.plugins.summernoteHeading !== cjs.SummernoteHeadingV3) throw new Error('CommonJS entrypoint did not register Heading.');

const browserAlias = readFileSync(resolve(repoDir, 'dist/summernote-heading.browser.js'), 'utf8');
if (!browserAlias.includes('sourceMappingURL=summernote-heading.browser.js.map')) {
  throw new Error('Browser-friendly Heading bundle has an invalid source map reference.');
}

delete globalThis.$;
console.log(`Validated Heading package ${manifest.version} (${files.size} files).`);
