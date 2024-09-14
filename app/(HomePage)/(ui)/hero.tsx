import { CryptoPrices } from "../../../components/CryptoPrices";
import {
  fetchCryptoChange,
  CryptoChange,
} from "../../../components/Crypto24HourChange";
import { fetchCoinInfo, CoinInfo } from "../../../components/CryptoGeneralInfo";
import { fetchNews, NewsArticle } from "@/components/CryptoNews";
import { fetchNftInfo, NftInfo } from "@/components/Nfts";

import React, { useEffect, useState, useRef } from "react";
import Typed from "typed.js";

const Hero: React.FC = () => {
  const typedElement = useRef<HTMLSpanElement>(null);
  const prices = CryptoPrices();
  const [priceChanges, setPriceChanges] = useState<CryptoChange>({
    BTC: null,
    ETH: null,
    SOL: null,
  });
  const [coinInfos, setCoinInfos] = useState<CoinInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [animationReady, setAnimationReady] = useState<boolean>(false);
  const [nftInfos, setNftInfos] = useState<NftInfo[]>([]);
  const [nftLoading, setNftLoading] = useState<boolean>(true); // NFT loading state

  // USEEFFECTS

  useEffect(() => {
    // Set flag to true when other data is ready
    if (!loading && coinInfos.length && newsArticles.length) {
      setAnimationReady(true);
    }
  }, [loading, coinInfos, newsArticles]);

  useEffect(() => {
    if (animationReady && typedElement.current) {
      const typed = new Typed(typedElement.current, {
        strings: ["Fast.", "Secure.", "Simple."],
        typeSpeed: 100,
        backSpeed: 50,
        startDelay: 500,
        backDelay: 1000,
        loop: true,
        showCursor: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [animationReady]);

  useEffect(() => {
    const getPriceChanges = async () => {
      const changes = await fetchCryptoChange();
      setPriceChanges(changes);
    };

    getPriceChanges();
  }, []);

  useEffect(() => {
    const loadCoinInfos = async () => {
      const coins = await fetchCoinInfo(["BTC", "ETH", "SOL"]);
      setCoinInfos(coins);
      setLoading(false);
    };

    loadCoinInfos();
  }, []);

  useEffect(() => {
    const getNews = async () => {
      const news = await fetchNews();
      setNewsArticles(news);
    };
    getNews();
  }, []);

  useEffect(() => {
    const getNftInfos = async () => {
      const nfts = await fetchNftInfo();
      setNftInfos(nfts);
      setNftLoading(false);
    };
    getNftInfos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section className=" flex justify-between   max-w-section   h-full mx-auto text-white  ">
      <div className="w-full flex justify-between">
        <div className=" pt-[90px] ">
          <p className="text-[64px] "> Earn with Crypto</p>
          <p>
            <span
              className=" text-[64px] typed-cursor "
              ref={typedElement}
            ></span>
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
            <button className="text-button-Text bg-[#dbddda]   hover:bg-button-Hover hover:border-b-button-HoverSecondary
             border-b-4 rounded-md border-b-button-Secondary px-6 py-1.5 text-xs font-semibold">
             Sign Up
            </button>
          </div>
        </div>

        <div className=" w-[542px] h-[211px] rounded-[20px] bg-[#1A1E24] mt-[75px]  ">
          <div className=" flex justify-between mx-6 my-5">
            <p className="text-[16px]">Trending</p>
            <p className="text-[15px]">view more</p>
          </div>
          {coinInfos.map((coin) => {
            const isBTC = coin.Name === "BTC";
            const isSOL = coin.Name === "SOL";
            const imageSize = isBTC
              ? "w-7 h-7"
              : isSOL
              ? "w-5 h-6  ml-[2px] mr-[10px]"
              : "w-6 h-6 mr-2";
            const change = priceChanges[coin.Name];
            const changeColor =
              change > 0
                ? "text-green-500"
                : change < 0
                ? "text-red-500"
                : "text-gray-500";

            return (
              <div key={coin.Id} className="flex items-center mx-6 my-3 ">
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
                  <p className="text-sm font-medium">${prices[coin.Name]}</p>
                  <p className={`text-sm ${changeColor}`}>
                    {change !== null ? `${change}%` : "Loading..."}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="text-sm w-[542px] h-[181px] rounded-[20px] bg-[#1A1E24] mt-24">
          
            <div className="pt-4 pl-6">
            <p className=" mb-4 text-[16px] font-bold">News</p>
              {newsArticles.map((article, index) => (
                <div key={index}>
                  <p>{article.title}</p>
                  {index < newsArticles.length - 1 && <br />}{" "}
                </div>
              ))}
            </div>
          </div>

          {/* NFT Section */}
          <div className="text-sm w-[542px] h-[130px] rounded-[20px] bg-[#1A1E24] mt-8 pt-3 overflow-x-auto">
            <div className="flex space-x-4 items-center pl-9">
              {nftLoading ? ( // NFT'ler yüklenirken "Yükleniyor..." göstergesi
                <p>NFT's loading...</p>
              ) : (
                nftInfos.map((nft, index) => (
                  <div key={index} className="flex-shrink-0 text-center">
                    <img
                      src={nft.image_url}
                      alt={nft.name}
                      className="w-[65px] h-[65px] mb-2 rounded-lg"
                    />
                    <p className="text-white text-xs w-[60px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {nft.name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
