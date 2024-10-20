import React from "react";
import { getCombinedData } from "@/components/NftCollectiondata"; // Veri getirme fonksiyonu
import Image from "next/image"; // Next.js Image bileşeni
import StarToggle from "@/components/StarToggle"; // Yıldız toggle bileşeni
import Link from "next/link"; // Link bileşeni

export default async function CollectionsStatsPage() {
  const data = await getCombinedData(); // Hem koleksiyon hem de stats verilerini çekiyoruz

  return (
    <div className="text-white max-w-[80%] mx-auto">
      <div className="h-[400px] bg-black flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-semibold mb-2">
          Top NFT Collection Prices
        </h1>
        <p className="text-xl text-gray-400">
          Explore all the top NFT collections by price floor, market cap, and
          total volume. We aggregate NFTs from various blockchains such as
          Ethereum, Polygon, Optimism, Arbitrum, Klaytn, and more.
        </p>
      </div>

      <table className="min-w-full table-auto bg-black text-white rounded-lg shadow-lg">
        <thead>
          <tr className="text-gray-300">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">NFT</th>
            <th className="px-4 py-2 text-right">Floor Price</th>
            <th className="px-4 py-2 text-right">24h Change</th>
            <th className="px-4 py-2 text-right">24h Volume</th>
            <th className="px-4 py-2 text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr
              key={index}
              className="text-center  border-gray-700 hover:bg-gray-800 transition-all"
            >
              <td className="px-4 py-2 text-left  items-center">
                {/* Yıldız ve sayı burada, resmin sol tarafına hizalayacağız */}
                {/* Yıldız ve sayıyı burada hizalayacağız */}
                <div className="flex  items-center">
                  <StarToggle index={index} /> {/* Yıldız sağda */}
                  <span className="text-left">{index + 1}</span>{" "}
                  {/* Sayıyı sola hizalayalım */}
                </div>
              </td>
              <td className="px-4 py-4 text-left flex items-center justify-start">
                <Link href={`/nftrankings/${item.collection.collection  }`}>
                  {/* Yıldız ve sayıyı, resmin solunda hizalayacağız */}
                  <div className="flex items-center">
                    {/* Resim burada, sayının ve yıldızın sağında */}
                    <Image
                      src={item.collection.image_url}
                      alt={item.collection.name}
                      width={60} // Resim boyutunu 60px yapıyoruz
                      height={60}
                      className="rounded-lg "
                    />
                    <div className="ml-2">
                      <span className="truncate text-[16px] font-semibold">
                        {item.collection.name}
                      </span>{" "}
                      {/* İsim boyutu 16px ve semibold */}
                      <div className="text-sm text-gray-400">
                        {item.collection.chain}
                      </div>{" "}
                      {/* Zincir adı gri renkte */}
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-2 text-right">
                {item.stats.total.floor_price === 0
                  ? "-"
                  : item.stats.total.floor_price.toFixed(2)}
                {item.collection.floor_price_symbol}
              </td>
              <td className="px-4 py-2 text-right">
                {item.stats.intervals?.find(
                  (interval) => interval.interval === "one_day",
                )?.volume_change !== undefined ? (
                  <span
                    className={
                      item.stats.intervals.find(
                        (interval) => interval.interval === "one_day",
                      )?.volume_change > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {item.stats.intervals
                      .find((interval) => interval.interval === "one_day")
                      ?.volume_change.toFixed(2)}
                    %
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2 text-right">
                {item.stats.total.volume.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-right">
                {item.stats.total.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
