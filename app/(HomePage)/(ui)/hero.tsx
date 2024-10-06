import React from "react";
import { getCryptoPrices } from "@/components/Coingeckoapi";
import { fetchgeneralinfo, CoinInfo } from "@/components/CryptoGeneralInfo";
import {
  fetchCryptoChange,
  CryptoChange,
} from "@/components/Crypto24HourChange";
import { fetchNews, NewsArticle } from "@/components/CryptoNews";
import { fetchNftInfo, NftInfo } from "@/components/Nfts";
import TypedAnimation from "@/components/TypedAnimation";
import CryptoPriceUpdater from "@/components/CryptoPrices";
import { WebSocketProvider } from "@/components/WebSocketContext";
import Image from "next/image";

const Hero = async () => {
  const coinSymbols = ["BTC", "ETH", "SOL"];

  // Fetch all data simultaneously
  const [coinInfos, initialPrices, cryptoChanges, newsArticles, nftInfos] =
    await Promise.all([
      fetchgeneralinfo(coinSymbols),
      getCryptoPrices(),
      fetchCryptoChange(),
      fetchNews(),
      fetchNftInfo(),
    ]);
  return (
    <WebSocketProvider>
      <section className="flex justify-between max-w-section h-lvh mx-auto text-white">
        <div className="w-full flex justify-between">
          <div className="pt-[90px]">
            <p className="text-[64px]">Earn with Crypto</p>
            <p className=" min-h-24">
              <TypedAnimation />
            </p>
            <p className="text-lg font-semibold">
              Start Today And Begin Earning Rewards Up To
            </p>
            <p className="text-xl font-bold">500 USDT</p>
            <div className="flex gap-4 mt-12">
              <input
                type="text"
                placeholder="Email/Phone number"
                className="w-[300px] h-[40px] rounded-[10px] border-2 border-[#549366] placeholder-gray-500 bg-[#000000] px-4"
              />
              <button className="text-button-Text bg-[#dbddda] hover:bg-button-Hover hover:border-b-button-HoverSecondary border-b-4 rounded-md border-b-button-Secondary px-6 py-1.5 text-xs font-semibold">
                Sign Up
              </button>
            </div>
          </div>

          <div className="w-[542px] h-[211px] rounded-[20px] bg-[#1A1E24] mt-[75px]">
            <div className="flex justify-between mx-6 my-5">
              <p className="text-[16px]">Trending</p>
              <p className="text-[15px]">view more</p>
            </div>
            <div>
              {coinSymbols.map((coinSymbol, index) => {
                const coinInfo = coinInfos.find(
                  (info) => info.Name === coinSymbol
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
            </div>

            {/* News Section */}
            <div className="text-sm w-[542px] h-[181px] rounded-[20px] bg-[#1A1E24] mt-24">
              <div className="pt-4 pl-6">
                <p className="mb-4 text-[16px] font-bold">News</p>
                {newsArticles.map((article, index) => (
                  <div key={index}>
                    <p>{article.title}</p>
                    {index < newsArticles.length - 1 && <br />}
                  </div>
                ))}
              </div>
            </div>

            {/* NFT Section */}
            <div className="text-sm w-[542px] h-[130px] rounded-[20px] bg-[#1A1E24] mt-8 pt-3 overflow-x-auto">
              <div className="flex space-x-4 items-center pl-9">
                {nftInfos.map((nft, index) => (
                  <div key={index} className="flex-shrink-0 text-center">
                    <link
                      key={nft.image_url}
                      rel="preload"
                      href={nft.image_url}
                      as="image"
                      type="image/png"
                    />
                    <Image
                      src={nft.image_url.replace(/\.(png|jpg|jpeg)$/, ".webp")}
                      alt={nft.name}
                      width={65}
                      height={65}
                      className="mb-2 rounded-lg w-[65px] h-[65px]  object-fit transition-transform duration-200 ease-in-out transform hover:scale-125"
                      quality={75} 
                      priority 
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,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" 
                    />
                    <p className="text-white text-xs w-[60px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {nft.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </WebSocketProvider>
  );
};

export default Hero;
