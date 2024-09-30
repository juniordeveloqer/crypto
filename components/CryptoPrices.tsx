"use client";
import { useEffect, useState } from "react";
import { fetchgeneralinfo, CoinInfo } from "@/components/CryptoGeneralInfo";
import {
  fetchCryptoChange,
  CryptoChange,
} from "@/components/Crypto24HourChange";

export const CryptoPrices = () => {
  const [prices, setPrices] = useState({ BTC: null, ETH: null, SOL: null });
  const [coinInfos, setCoinInfos] = useState<CoinInfo[]>([]);
  const [priceChanges, setPriceChanges] = useState<CryptoChange>({
    BTC: null,
    ETH: null,
    SOL: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch coin info and price changes
      const fetchedCoinInfos: CoinInfo[] = await fetchgeneralinfo(["BTC", "ETH", "SOL"]);
      setCoinInfos(fetchedCoinInfos);

      const fetchedPriceChanges: CryptoChange = await fetchCryptoChange();
      setPriceChanges(fetchedPriceChanges);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://streamer.cryptocompare.com/v2?api_key=1162f895434ff38066365c8eaecbe9415a1e8d25569f1f7ca848e8529d83a8a1"
    );

    ws.onopen = () => {
      console.log("WebSocket opened");
      ws.send(
        JSON.stringify({
          action: "SubAdd",
          subs: ["5~CCCAGG~BTC~USD", "5~CCCAGG~ETH~USD", "5~CCCAGG~SOL~USD"],
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.TYPE === "5" && data.PRICE) {
        const symbol = data.FROMSYMBOL;
        const roundedPrice = data.PRICE.toFixed(2);
        setPrices((prevPrices) => ({
          ...prevPrices,
          [symbol]: roundedPrice,
        }));
        console.log(`${symbol}/USD: ${roundedPrice}`);
      }
    };

    return () => {
      ws.close(); // Close the WebSocket connection on unmount
    };
  }, []);

  return (
    <div>
      {coinInfos.map((coin) => {
        const isBTC = coin.Name === "BTC";
        const isSOL = coin.Name === "SOL";
        const imageSize = isBTC
          ? "w-7 h-7"
          : isSOL
          ? "w-5 h-6 ml-[2px] mr-[10px]"
          : "w-6 h-6 mr-2";
        
        const change = priceChanges[coin.Name];
        const changeColor =
          change > 0
            ? "text-green-500"
            : change < 0
            ? "text-red-500"
            : "text-gray-500";

        return (
          <div key={coin.Id} className="flex items-center mx-6 my-3">
            <img
              src={coin.ImageUrl}
              alt={coin.Name}
              className={`${imageSize} mr-1`}
            />
            <div className="flex flex-grow gap-1 items-end">
              <h3 className="text-sm font-semibold">{coin.Name}</h3>
              <p className="text-xs">{coin.FullName}</p>
            </div>
            <div className="flex gap-3 items-baseline">
              <p className="text-sm font-medium">${prices[coin.Name] !== null ? prices[coin.Name] : "Loading..."}</p>
              <p className={`text-sm ${changeColor}`}>
                {change !== null ? `${change}%` : "Loading..."}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
