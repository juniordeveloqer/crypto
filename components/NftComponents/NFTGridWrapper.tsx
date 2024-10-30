"use client"; // Specify this as a client component

import { useState, useEffect } from "react";
import NFTGrid from "@/components/NFTGrid";
import GridIcons from "@/components/NftComponents/GridIcons";

interface NFT {
  identifier: string;
  display_image_url?: string;
  name?: string;
}

interface Offer {
  price?: { // Price is optional
    currency: string;
    decimals: number;
    value: string;
  };
}

interface NFTGridWrapperProps {
  slug: string;
  initialNfts: NFT[]; // Adjust according to your NFT type
  offers: Record<string, Offer>; // Add this line to include offers in the prop types
}

export default function NFTGridWrapper({ slug, initialNfts, offers }: NFTGridWrapperProps) {
  const [gridCount, setGridCount] = useState(5); // Default grid count
  const [sortOption, setSortOption] = useState("price-low-high"); // Default sort option
  const [sortedNfts, setSortedNfts] = useState<NFT[]>(initialNfts); // New state for sorted NFTs

  const handleGridChange = (count: number) => {
    console.log("Changing grid count to:", count);
    setGridCount(count);
  };

  useEffect(() => {
    const sorted = [...initialNfts];

    // Sort based on the selected option
    if (sortOption === "price-low-high") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(offers[a.identifier]?.price?.value || "0") || 0;
        const priceB = parseFloat(offers[b.identifier]?.price?.value || "0") || 0;
        return priceA - priceB;
      });
    } else if (sortOption === "price-high-low") {
      sorted.sort((a, b) => {
        const priceA = parseFloat(offers[a.identifier]?.price?.value || "0") || 0;
        const priceB = parseFloat(offers[b.identifier]?.price?.value || "0") || 0;
        return priceB - priceA;
      });
    }

    setSortedNfts(sorted);
  }, [initialNfts, sortOption, offers]);

  console.log("Rendering NFTGrid with gridCount:", gridCount);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <GridIcons onGridChange={handleGridChange} />
        <h2 className="text-2xl font-semibold">Items</h2>
        <select
          className="bg-gray-800 p-2 rounded text-gray-300"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="price-low-high">Price low to high</option>
          <option value="price-high-low">Price high to low</option>
        </select>
      </div>
      <NFTGrid slug={slug} initialNfts={sortedNfts} gridCount={gridCount} offers={offers} />
    </div>
  );
}
