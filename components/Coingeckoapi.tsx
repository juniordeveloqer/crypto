"use client";

import { useEffect, useState } from "react";

interface Prices {
  BTC: number | null;
  ETH: number | null;
  SOL: number | null;
}

export const useCoinGeckoApi = () => {
  const [prices, setPrices] = useState<Prices>({
    BTC: null,
    ETH: null,
    SOL: null,
  });

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd");
      const data = await response.json();
      setPrices({
        BTC: data.bitcoin.usd,
        ETH: data.ethereum.usd, 
        SOL: data.solana.usd,
      });
    };

    fetchPrices();
  }, []);

  return prices;
};