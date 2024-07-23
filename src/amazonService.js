// src/amazonService.js
const apiEndpoint = 'https://amazon-scraper-api-nine.vercel.app/api/search';

export const searchProducts = async (keywords) => {
  try {
    const response = await fetch(`${apiEndpoint}?keywords=${encodeURIComponent(keywords)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};