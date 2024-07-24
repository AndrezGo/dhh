import axios from "axios";

export const searchMercadoLibre = async (keywords) => {
  try {
    const response = await axios.get(`https://market-scraper-api.vercel.app/api/search`, {
      params: { keywords },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching MercadoLibre:", error);
    return [];
  }
};