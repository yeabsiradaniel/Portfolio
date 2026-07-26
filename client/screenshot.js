/* Screenshot helper: captures localhost:3000 with the local Chrome install.
   Usage: node screenshot.js [url] [outfile] [waitMs] [theme] */
const puppeteer = require('puppeteer-core');

(async () => {
  const url = process.argv[2] || 'http://localhost:3000';
  const out = process.argv[3] || '../shot.png';
  const waitMs = parseInt(process.argv[4] || '5000', 10);
  const theme = process.argv[5] || '';
  const material = process.argv[6] || '';
  const clickSelector = process.argv[7] || '';
  const postClickWait = parseInt(process.argv[8] || '3000', 10);
  const scrollTo = parseInt(process.argv[9] || '0', 10);
  const vw = parseInt(process.argv[10] || '1920', 10);
  const vh = parseInt(process.argv[11] || '1032', 10);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--use-angle=default', '--enable-webgl', '--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: vw, height: vh, isMobile: vw < 768, hasTouch: vw < 768 });
  if (theme) {
    await page.evaluateOnNewDocument((t) => {
      localStorage.setItem('theme', t);
    }, theme);
  }
  if (material) {
    await page.evaluateOnNewDocument((m) => {
      localStorage.setItem('material', m);
    }, material);
  }
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, waitMs));
  if (clickSelector) {
    for (const sel of clickSelector.split(',')) {
      await page.click(sel.trim());
      await new Promise((r) => setTimeout(r, 600));
    }
    await new Promise((r) => setTimeout(r, postClickWait));
  }
  if (scrollTo) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollTo);
    await new Promise((r) => setTimeout(r, 4000));
  }
  await page.screenshot({ path: out });
  await browser.close();
  console.log('saved', out);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
