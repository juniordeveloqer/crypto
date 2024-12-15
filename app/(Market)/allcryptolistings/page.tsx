import React from "react";

import { getCryptoPrices } from "@/components/Coingeckoapi";
import { fetchgeneralinfo, CoinInfo } from "@/components/CryptoGeneralInfo";
import {
  fetchCryptoChange,
  CryptoChanges,
} from "@/components/Crypto24HourChange";

import CryptoPriceUpdater from "@/components/CryptoPrices";
import { WebSocketProvider } from "@/components/WebSocketContext";
export default async function CollectionsStatsPage() {

    const coinSymbols = ["BTC", "ETH", "SOL"];
  
  
    // Fetch all data simultaneously
    const [coinInfos, initialPrices, cryptoChanges,] =
      await Promise.all([
        fetchgeneralinfo(coinSymbols),
        getCryptoPrices(),
        fetchCryptoChange(),
     
      ]);

  return (
    <WebSocketProvider>
    <div className="text-white max-w-[80%] mx-auto">
      <div className="h-[400px] bg-black flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-semibold mb-2">All Cryptocurrencies</h1>
        <p className="text-xl text-gray-400">
        View a full list of active cryptocurrencies
        </p>
      </div>
      <div>
              {coinSymbols.map((coinSymbol, index) => {
                const coinInfo = coinInfos.find(
                  (info) => info.Name === coinSymbol,
                );
                const price = initialPrices[coinSymbol];
                const change = cryptoChanges[coinSymbol];

                return (
                  <div key={coinSymbol} className="flex items-center mx-6 my-3">
                    <img
                      src={coinInfo?.ImageUrl}
                      alt={coinInfo?.Name}
                      className="w-7 h-7 mr-1"
                    />
                    <div className="flex flex-grow gap-1 items-end">
                      <h3 className="text-sm font-semibold">
                        {coinInfo?.Name}
                      </h3>
                      <p className="text-xs">{coinInfo?.FullName}</p>
                    </div>
                    <div className="flex gap-3 items-baseline">
                      <CryptoPriceUpdater
                        coin={coinSymbol}
                        initialPrice={price}
                      />
                      <p
                        className={`text-sm ${
                          parseFloat(change) > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {change}%
                      </p>
                    </div>
                  </div>
                );
              })}
               <div className="mt-3 pl-9">
              
              </div>
            </div>
     
    </div>
    </WebSocketProvider>
  );
}
