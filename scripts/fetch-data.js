import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

const url = 'https://zakyatbot.ru/getnews';

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    await writeFile('data/news.json', JSON.stringify(data, null, 2));
    
    console.log('Data successfully fetched and saved to news.json');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
