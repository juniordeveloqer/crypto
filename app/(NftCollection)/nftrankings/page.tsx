// app/collections/page.tsx
import React from "react";
import { getCombinedData } from "@/components/NftCollectiondata"; 
import CollectionList from "@/components/Collection/CollectionList";

export default async function CollectionsStatsPage() {
  const initialData = await getCombinedData(0, 20); // Fetch the first 20 items for SSR

  return (
    <div className="text-white max-w-[80%] mx-auto">
      <div className="h-[400px] bg-black flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-semibold mb-2">Top NFT Collection Prices</h1>
        <p className="text-xl text-gray-400">
          Explore top NFT collections by price floor, market cap, and total volume.
        </p>
      </div>
      {/* Render the initial data */}
      <CollectionList data={initialData} />
    </div>
  );
}
