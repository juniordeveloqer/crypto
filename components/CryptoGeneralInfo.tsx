
const COINS_INFO_URL = 'https://min-api.cryptocompare.com/data/coin/generalinfo';
const API_KEY = '1162f895434ff38066365c8eaecbe9415a1e8d25569f1f7ca848e8529d83a8a1';

export interface CoinInfo {
  Id: string;
  Name: string;
  FullName: string;
  ImageUrl: string;
}

export const fetchgeneralinfo = async (fsyms: string[]): Promise<CoinInfo[]> => {
  try {
    const response = await fetch(`${COINS_INFO_URL}?fsyms=${fsyms.join(',')}&tsym=USD&api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Check if data has valid structure
    if (data && data.Data && Array.isArray(data.Data)) {
      return data.Data.map((coin: any) => ({
        Id: coin.CoinInfo.Id,
        Name: coin.CoinInfo.Name,
        FullName: coin.CoinInfo.FullName,
        ImageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
      }));
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.error("Error fetching coin info:", error);
    return [];
  }
};
