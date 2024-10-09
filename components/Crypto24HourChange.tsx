const BASE_URL = "https://min-api.cryptocompare.com/data/pricemultifull";
const API_KEY =
  "1162f895434ff38066365c8eaecbe9415a1e8d25569f1f7ca848e8529d83a8a1";

export const fetchCryptoChange = async (): Promise<CryptoChanges> => {
  try {
    const response = await fetch(
      `${BASE_URL}?fsyms=BTC,ETH,SOL&tsyms=USD&api_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status code: ${response.status}, Status text: ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Log the API response to the console
    console.log("RAW Data:", data.RAW);

    if (!data.RAW) {
      throw new Error(
        "Invalid data structure: 'RAW' field missing in response",
      );
    }

    const changes: CryptoChanges = {
      BTC:
        data.RAW.BTC.USD.CHANGEPCTDAY !== undefined
          ? data.RAW.BTC.USD.CHANGEPCTDAY.toFixed(2)
          : null,
      ETH:
        data.RAW.ETH.USD.CHANGEPCTDAY !== undefined
          ? data.RAW.ETH.USD.CHANGEPCTDAY.toFixed(2)
          : null,
      SOL:
        data.RAW.SOL.USD.CHANGEPCTDAY !== undefined
          ? data.RAW.SOL.USD.CHANGEPCTDAY.toFixed(2)
          : null,
    };

    return changes;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error or invalid URL:", error.message);
    } else if (error instanceof SyntaxError) {
      console.error("Error parsing JSON:", error.message);
    } else {
      console.error("Error fetching 24-hour changes:", error.message);
    }

    // Default return in case of an error
    return { BTC: null, ETH: null, SOL: null };
  }
};

export interface CryptoChanges {
  BTC: string | null;
  ETH: string | null;
  SOL: string | null;
}
