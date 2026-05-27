import puppeteer from 'puppeteer';

async function run() {
  console.log('Waiting for preview server...');
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Launching puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('=== PAGE ERROR ===');
    console.error(err);
    console.log('==================');
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[Browser Console ${msg.type()}]`, msg.text());
    }
  });
  
  console.log('Navigating to http://localhost:4173 ...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  
  console.log('Waiting a bit to ensure rendering...');
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Closing...');
  await browser.close();
  process.exit(0);
}

run().catch(console.error);
