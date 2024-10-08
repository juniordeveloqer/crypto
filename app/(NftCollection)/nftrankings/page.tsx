import React from "react";
import { getCombinedData } from "@/components/NftCollectiondata"; // Import the getNftData function

// app/cryptopunks/page.tsx

export default async function CollectionsStatsPage() {
  const data = await getCombinedData(); // Hem koleksiyon hem de stats verilerini çekiyoruz

  return (
    <div className="text-white">
      <h1>Top 5 Ethereum Collections and Stats</h1>

      {data.map((item: any, index: number) => (
        <div key={index}>
          <h2>{item.collection.name}</h2>
          <p>Collection Name: {item.collection.collection}</p>
          <p>Description: {item.collection.description}</p>
          {item.collection.image_url && (
            <img 
              src={item.collection.image_url} 
              alt={`${item.collection.name} image`} 
              width={200} 
              height={200}
            />
          )}
          <p>Stats:</p>
          <ul>
            <li>Total Volume: {item.stats.total.volume}</li>
            <li>Total Sales: {item.stats.total.sales}</li>
            <li>Average Price: {item.stats.total.average_price}</li>
            <li>Number of Owners: {item.stats.total.num_owners}</li>
            <li>Market Cap: {item.stats.total.market_cap}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
