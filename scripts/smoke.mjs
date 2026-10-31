// Smoke test: node scripts/smoke.mjs [baseUrl]   (start `npm run dev` or `npm run preview` first)
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:5173';
const PAGES = ['/', '/services', '/services/post-operative-recovery', '/services/home-nursing', '/privacy-policy', '/terms', '/medical-disclaimer', '/nope'];
const WIDTHS = [360, 768, 1440];

const browser = await chromium.launch();
const failures = [];

for (const width of WIDTHS) {
  for (const path of PAGES) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
    page.on('response', (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));

    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 600) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(40);
    }

    const r = await page.evaluate(() => {
      const q = (s) => [...document.querySelectorAll(s)];
      const heads = q('h1,h2,h3,h4').map((e) => +e.tagName[1]);
      let skips = 0;
      for (let i = 1; i < heads.length; i++) if (heads[i] - heads[i - 1] > 1) skips++;
      return {
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        broken: q('img').filter((i) => i.complete && i.naturalWidth === 0).length,
        noAlt: q('img').filter((i) => !i.hasAttribute('alt')).length,
        h1: q('h1').length,
        skips,
        unlabeled: q('input,textarea,select').filter((i) => i.type !== 'hidden' && !i.labels?.length && !i.getAttribute('aria-label')).length,
      };
    });

    const tag = `${width}px ${path}`;
    if (errors.length) failures.push(`${tag}: ${[...new Set(errors)].slice(0, 3).join(' | ')}`);
    if (r.overflow) failures.push(`${tag}: horizontal overflow`);
    if (r.broken) failures.push(`${tag}: ${r.broken} broken image(s)`);
    if (r.noAlt) failures.push(`${tag}: ${r.noAlt} image(s) without alt`);
    if (r.h1 !== 1) failures.push(`${tag}: expected 1 <h1>, found ${r.h1}`);
    if (r.skips) failures.push(`${tag}: ${r.skips} skipped heading level(s)`);
    if (r.unlabeled) failures.push(`${tag}: ${r.unlabeled} unlabeled form control(s)`);
    await page.close();
  }
}

await browser.close();
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n- ` + failures.join('\n- '));
  process.exit(1);
}
console.log(`Smoke test passed: ${PAGES.length} pages x ${WIDTHS.length} widths`);
