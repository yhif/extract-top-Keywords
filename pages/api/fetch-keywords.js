import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  let browser;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('Navigating to URL:', url);
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    try {
      await page.waitForSelector('.traffic-topKeywords', { timeout: 30000 });
    } catch (error) {
      console.error('Error: .traffic-topKeywords not found');
      return res.status(404).json({ error: 'Keywords data not found on the page' });
    }
    
    console.log('Page loaded, extracting keywords...');
    const keywords = await page.evaluate(() => {
      const topKeywordsContainer = document.querySelector('.traffic-topKeywords');
      if (!topKeywordsContainer) {
        return null;
      }

      const rows = topKeywordsContainer.querySelectorAll('.traffic-td');
      return Array.from(rows).map(row => {
        const cells = row.querySelectorAll('.traffic-tleft span');
        return {
          keyword: cells[0]?.textContent.trim() || '',
          traffic: cells[1]?.textContent.trim() || '',
          cpc: cells[2]?.textContent.trim() || ''
        };
      });
    });

    if (!keywords || keywords.length === 0) {
      console.error('Error: No keywords data found');
      return res.status(404).json({ error: 'No keywords data found' });
    }

    console.log('Keywords found:', keywords.length);
    res.status(200).json({ keywords });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching keywords', details: error.message });
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
    }
  }
}