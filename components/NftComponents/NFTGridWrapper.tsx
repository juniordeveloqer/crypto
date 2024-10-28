"use client"; // Specify this as a client component

import { useState } from "react";
import NFTGrid from "@/components/NFTGrid";
import GridIcons from "@/components/NftComponents/GridIcons";

interface NFTGridWrapperProps {
  slug: string;
  initialNfts: any[]; // Adjust according to your NFT type
  offers: Record<string, any>; // Add this line to include offers in the prop types
}

export default function NFTGridWrapper({ slug, initialNfts, offers }: NFTGridWrapperProps) {
  const [gridCount, setGridCount] = useState(5); // Default grid count

  const handleGridChange = (count: number) => {
    console.log("Changing grid count to:", count); // Log the grid count being set
    setGridCount(count); // Update the selected grid count
  };

  console.log("Rendering NFTGrid with gridCount:", gridCount); // Log before rendering

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <GridIcons onGridChange={handleGridChange} /> {/* Grid icon component */}
        <h2 className="text-2xl font-semibold">Items</h2>
        <select className="bg-gray-800 p-2 rounded text-gray-300">
          <option value="price-low-high">Price low to high</option>
          <option value="price-high-low">Price high to low</option>
        </select>
      </div>
      <NFTGrid slug={slug} initialNfts={initialNfts} gridCount={gridCount} offers={offers} />
    </div>
  );
}
