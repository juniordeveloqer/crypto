const BASE_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
const API_KEY = '1162f895434ff38066365c8eaecbe9415a1e8d25569f1f7ca848e8529d83a8a1';

export const fetchCryptoChange = async (): Promise<CryptoChange> => {
  try {
    const response = await fetch(`${BASE_URL}?fsyms=BTC,ETH,SOL&tsyms=USD&api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const changes: CryptoChange = {
      BTC: data.RAW.BTC.USD.CHANGEPCT24HOUR !== undefined
        ? data.RAW.BTC.USD.CHANGEPCT24HOUR.toFixed(2)
        : null,
      ETH: data.RAW.ETH.USD.CHANGEPCT24HOUR !== undefined
        ? data.RAW.ETH.USD.CHANGEPCT24HOUR.toFixed(2)
        : null,
      SOL: data.RAW.SOL.USD.CHANGEPCT24HOUR !== undefined
        ? data.RAW.SOL.USD.CHANGEPCT24HOUR.toFixed(2)
        : null,
    };

    return changes;
  } catch (error) {
    console.error("Error fetching 24-hour changes:", error);
    return { BTC: null, ETH: null, SOL: null };
  }
};


export interface CryptoChange {
    BTC: string | null;
    ETH: string | null;
    SOL: string | null;
  }
  