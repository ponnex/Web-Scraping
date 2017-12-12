const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const tableToCsv = require('node-table-to-csv');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://tools.cisco.com/security/center/publicationListing.x');

  const content = await page.content();
  const $ = cheerio.load(content);

  var csv = tableToCsv($(".advisoryAlertTable").eq(0).html());

  fs.writeFile('output.csv', csv, function(err){
    console.log('File successfully written! - Check your project directory for the output.csv file');
  })
  browser.close();
})();