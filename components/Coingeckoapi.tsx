let cachedPrices: { BTC?: number; ETH?: number; SOL?: number; ADA?: number; XRP?: number; DOGE?: number } = {};
let lastFetched: number = 0;

export const getCryptoPrices = async () => {
  const cacheDuration = 5 * 60 * 1000; // Cache süresi 5 dakika (5 * 60 * 1000 ms)

  // Cache'li veriyi kontrol et
  if (cachedPrices.BTC && Date.now() - lastFetched < cacheDuration) {
    console.log('Returning cached data');
    return {
      BTC: cachedPrices.BTC,
      ETH: cachedPrices.ETH,
      SOL: cachedPrices.SOL,
      ADA: cachedPrices.ADA,
      XRP: cachedPrices.XRP,
    }; // Cache'den döner
  }

  // Veriyi API'den çek
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,dogecoin&vs_currencies=usd`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
 
const prices = {
  BTC: data.bitcoin.usd,
  ETH: data.ethereum.usd,
  SOL: data.solana.usd,
  ADA: data.cardano.usd,
  XRP: data.ripple.usd,
  DOGE: data.dogecoin.usd,
};

  // Cache'i güncelle
  cachedPrices = prices;
  lastFetched = Date.now();

  return prices;
};
