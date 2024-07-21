import fetch from 'node-fetch';
import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

const url = 'https://zakyatbot.ru/getnews';
const filePath = 'data/news.json';

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    await mkdir(dirname(filePath), { recursive: true });

    await writeFile(filePath, JSON.stringify(data, null, 2));
    
    console.log('Data successfully fetched and saved to news.json');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
