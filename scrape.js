const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 80; seed <= 89; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log(`Visiting: ${url}`);

    await page.goto(url);

    // Wait for table to load (important!)
    await page.waitForSelector("table");

    // Extract all numbers from tables
    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum = ${sum}`);

    grandTotal += sum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL =", grandTotal);
  console.log("=================================");

  await browser.close();
})();