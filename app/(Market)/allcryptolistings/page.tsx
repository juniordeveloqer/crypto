import React from "react";

import { getCryptoPrices } from "@/components/Coingeckoapi";
import { fetchgeneralinfo, CoinInfo } from "@/components/CryptoGeneralInfo";
import { CryptoTop24hVolumeList, CoinGeneralInfo } from "@/components/CryptoTop24hVolumeList";
import {
  fetchCryptoChange,
  CryptoChanges,
} from "@/components/Crypto24HourChange";
import ClientOnlyMarketCapData from "@/components/FetchTopMarketCap";
import CryptoPriceUpdater from "@/components/CryptoPrices";
import { WebSocketProvider, useWebSocket } from "@/components/WebSocketContext";
export default async function CollectionsStatsPage() {

  const coinSymbols = ["BTC", "ETH", "SOL", "ADA", "XRP", "DOGE"];
  const coins: CoinGeneralInfo[] = await CryptoTop24hVolumeList();

  
    // Fetch all data simultaneously
    const [coinInfos, initialPrices, cryptoChanges,] =
      await Promise.all([
        fetchgeneralinfo(coinSymbols),
        CryptoTop24hVolumeList(),
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
      <div className="grid grid-cols-3 gap-6 mt-6">
          {coinSymbols.map((coinSymbol, index) => {
            const coinInfo = coinInfos.find((info) => info.Name === coinSymbol);
            const price = initialPrices[coinSymbol];
            const change = cryptoChanges[coinSymbol];
            const isPositiveChange = parseFloat(change) > 0;

            return (
              <div
                key={coinSymbol}
                className="relative flex items-center justify-between bg-gray-900 p-6 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"
              >
                {/* Coin logo */}
                <div className="flex-shrink-0">
                  <img
                    src={coinInfo?.ImageUrl}
                    alt={coinInfo?.Name}
                    className="w-16 h-16 transition-all duration-500 ease-in-out transform hover:scale-125 glow-effect"
                  />
                </div>

                {/* Coin info side-by-side */}
                <div className="flex flex-grow justify-between items-center">
                  <div className="text-center flex flex-col items-center ml-4">
                    <h3 className="text-xl font-semibold">{coinInfo?.Name}</h3>
                    <p className="text-sm text-gray-400">{coinInfo?.FullName}</p>
                  </div>

                  <div className="text-center ml-4 flex flex-col items-center">
                    <CryptoPriceUpdater coin={coinSymbol} initialPrice={price} />
                    <div className="mt-2 flex justify-center items-center">
                      <p
                        className={`text-lg font-semibold ${
                          isPositiveChange ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {change}%
                      </p>
                      {/* Directional arrow animation */}
                      <span
                        className={`ml-2 inline-block ${
                          isPositiveChange ? "animate-pulse-up" : "animate-pulse-down"
                        }`}
                      >
                        {isPositiveChange ? "↑" : "↓"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover effect to show extra coin details */}
                <div className="absolute top-2 right-2 text-xs font-semibold bg-gray-700 text-white p-1 rounded-lg opacity-0 hover:opacity-100 transition-opacity ease-in-out duration-200">
                  <p>{coinInfo?.FullName}</p>
                </div>
           
              </div>
            );
          })}
        </div>

        <ClientOnlyMarketCapData />
        <div className="grid grid-cols-3 gap-6 mt-6">
        {coins.map((coin) => (
          <div
            key={coin.Id}
            className="relative flex flex-col items-center bg-gray-900 p-6 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"
          >
            <img
              src={coin.ImageUrl}
              alt={coin.FullName}
              className="w-16 h-16 transition-all duration-500 ease-in-out transform hover:scale-125 glow-effect"
            />
            <h3 className="text-xl font-semibold mt-2">{coin.Name}</h3>
            <p className="text-sm text-gray-400">{coin.FullName}</p>
            <p className="mt-2 text-lg text-white">
              24h Volume: <span className="font-bold">{coin.TotalVolume}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
    </WebSocketProvider>
  );
}
