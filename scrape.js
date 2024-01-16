const axios = require('axios');
const cheerio = require('cheerio');

async function fetchFinger(keyword) {
  const searchUrl = `https://www.google.com/search?gl=us&q=${encodeURIComponent(keyword)}&tbm=isch`;
  try {
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    const FingerResults = [];

    $('table.RntSmf').each((index, element) => {
      const FingerUrl = $(element).find('img').attr('src');
      const description = $(element).find('span:first-child').text();
      FingerResults.push({ FingerUrl, description });
    });
    return FingerResults;
  } catch (error) {
    console.error('Error fetching Fingerprints:', error.message);
    throw error;
  }
}

// Example usage
const keywordToSearch = 'landscape';
fetchFingers(keywordToSearch)
  .then((Fingers) => {
    console.log('Scraped Finger Results:', Fingers);
  })
  .catch((error) => {
    console.error('Finger scraping failed:', error.message);
  });
