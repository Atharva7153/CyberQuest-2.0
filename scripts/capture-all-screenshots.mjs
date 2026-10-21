import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCREENSHOT_DIR = path.resolve(process.cwd(), 'docs/screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1440,900',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Landing Page
  console.log('Capturing 01-landing-page.png...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await sleep(2000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-landing-page.png'), fullPage: false });

  // 2. Login Page - Step 1
  console.log('Capturing 02-login-terminal.png...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
  await sleep(1500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-login-terminal.png'), fullPage: false });

  // Step 1 input
  await page.waitForSelector('#nexus-team-id');
  await page.type('#nexus-team-id', 'TEAM-CIPHER');
  await page.type('#nexus-password', 'NEXUS-2026');
  await page.click('button[type="submit"]');

  // 3. Login Page - Step 2 (Player Selection)
  console.log('Waiting for Step 2 player selection...');
  await page.waitForFunction(() => document.body.innerText.includes('SELECT YOUR PLAYER') || document.body.innerText.includes('PLAYER 1'));
  await sleep(1000);
  console.log('Capturing 03-login-player-selection.png...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-login-player-selection.png'), fullPage: false });

  // Finish Login
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('Logged in as TEAM-CIPHER. URL is:', page.url());
  await sleep(2000);

  // 4. Team Dashboard
  console.log('Capturing 04-team-dashboard.png...');
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-team-dashboard.png'), fullPage: false });

  // 5. Challenge Market
  console.log('Capturing 05-challenge-market.png...');
  await page.goto('http://localhost:5173/challenges', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-challenge-market.png'), fullPage: false });

  // 6. Active Challenge Session
  console.log('Capturing 06-challenge-session.png...');
  await page.goto('http://localhost:5173/challenge/CHG-AP-0009', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-challenge-session.png'), fullPage: false });

  // 7. Team Progress & Squad Telemetry
  console.log('Capturing 07-team-progress.png...');
  await page.goto('http://localhost:5173/progress', { waitUntil: 'networkidle2' });
  await sleep(2000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-team-progress.png'), fullPage: false });

  // 8. History & Ledger
  console.log('Capturing 08-history-ledger.png...');
  await page.goto('http://localhost:5173/history', { waitUntil: 'networkidle2' });
  await sleep(2000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-history-ledger.png'), fullPage: false });

  // 9. NEXUS Core Terminal
  console.log('Capturing 09-nexus-core.png...');
  await page.goto('http://localhost:5173/nexus-core', { waitUntil: 'networkidle2' });
  await sleep(2000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-nexus-core.png'), fullPage: false });

  // 10. Wall Projector Display
  console.log('Capturing 10-projector-display.png...');
  await page.goto('http://localhost:5173/display', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10-projector-display.png'), fullPage: false });

  // Open fresh page/incognito for Admin Portal
  const adminContext = await browser.createBrowserContext();
  const adminPage = await adminContext.newPage();
  await adminPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to Admin Login...');
  await adminPage.goto('http://localhost:5173/admin', { waitUntil: 'networkidle2' });
  await sleep(1500);

  // Type admin credentials
  const idInput = await adminPage.$('input[placeholder="ADMIN-NEXUS"]');
  if (idInput) {
    await idInput.type('ADMIN-NEXUS');
    const passInput = await adminPage.$('input[placeholder="••••••••••••"]');
    if (passInput) {
      await passInput.type('NEXUS-ADMIN-2026');
      await adminPage.click('button[type="submit"]');
      await sleep(2500);
    }
  }

  // 11. Admin Round Control
  console.log('Capturing 11-admin-round-control.png...');
  await adminPage.goto('http://localhost:5173/admin/events', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await adminPage.screenshot({ path: path.join(SCREENSHOT_DIR, '11-admin-round-control.png'), fullPage: false });

  // 12. Admin Teams Management
  console.log('Capturing 12-admin-teams.png...');
  await adminPage.goto('http://localhost:5173/admin/teams', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await adminPage.screenshot({ path: path.join(SCREENSHOT_DIR, '12-admin-teams.png'), fullPage: false });

  // 13. Admin Leaderboard
  console.log('Capturing 13-admin-leaderboard.png...');
  await adminPage.goto('http://localhost:5173/admin/leaderboard', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await adminPage.screenshot({ path: path.join(SCREENSHOT_DIR, '13-admin-leaderboard.png'), fullPage: false });

  // 14. Admin Challenges Management
  console.log('Capturing 14-admin-challenges.png...');
  await adminPage.goto('http://localhost:5173/admin/challenges', { waitUntil: 'networkidle2' });
  await sleep(2500);
  await adminPage.screenshot({ path: path.join(SCREENSHOT_DIR, '14-admin-challenges.png'), fullPage: false });

  await browser.close();
  console.log('🎉 All 14 screenshots captured with 2x Retina resolution in docs/screenshots/!');
}

run().catch((err) => {
  console.error('Fatal error during capture:', err);
  process.exit(1);
});
