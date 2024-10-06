import React from "react";
import { fetchgeneralinfo, CoinInfo } from "../../components/CryptoGeneralInfo";
import ScrollerAnimation from "@/components/CarouselAnimation";
// prettier-ignore
const coinSymbols = [
  "BTC", "ETH", "XRP", "LTC", "ADA", "DOT", "LINK", "XLM", "BNB", "SOL",
  "DOGE", "AVAX", "MATIC", "SHIB", "TRX", "UNI", "ATOM", "VET", "XMR", "ICP",
  "FIL", "AAVE", "SUSHI", "MKR", "ALGO", "FTT", "EGLD", "THETA", "AXS", "GRT",
  "RUNE", "LUNA", "CRV", "KSM", "ZIL", "ENJ", "BTT", "NEO", "CAKE", "MIOTA",
  "FLOW", "FTM", "TWT", "HNT", "1INCH", "QNT", "BAND", "CELO", "KAVA", "CHZ",
  "DGB", "RSR", "SAND", "COMP", "YFI", "REN", "ZRX", "OMG", "DASH", "NANO",
];

const Scroller: React.FC = async () => {
  const coinData: CoinInfo[] = await fetchgeneralinfo(coinSymbols);

  if (coinData.length === 0) {
    return <div>Loading...</div>;
  }

  const rows: CoinInfo[][] = [];
  for (let i = 0; i < coinData.length; i += 12) {
    rows.push(coinData.slice(i, i + 12));
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 max-w-[1920px] mx-auto ">
      <h1 className="text-center text-[#ffffff] text-[40px] mb-12 font-semibold ">
        Build your crypto portfolio
      </h1>

      {rows.map((rowCoins, rowIndex) => (
        <div key={rowIndex} className={`scroller row${rowIndex + 1}`}>
          <ul className="tag-list scroller__inner ">
            {rowCoins.map((coin, index) => (
              <li
                key={index}
                className="coin-box flex items-center justify-end bg-gray-100 rounded-lg min-h-[48px]"
                style={{ width: "auto", padding: "0 8px" }}
              >
                <img
                  src={coin.ImageUrl}
                  alt={coin.FullName}
                  className="w-[30px] h-[30px] object-contain rounded-full"
                />
                <span
                  className="text-right flex-grow truncate ml-1 mr-2"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {coin.FullName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <ScrollerAnimation coinData={coinData} />
      {/* İstenilen buton yapısı */}
      <button className="bg-button-Primary hover:bg-button-Hover !mt-14 hover:border-b-button-HoverSecondary border-b-4 rounded-md border-b-button-Secondary font-semibold py-3 px-5 text-white">
        Click Me
      </button>
    </div>
  );
};

export default Scroller;
