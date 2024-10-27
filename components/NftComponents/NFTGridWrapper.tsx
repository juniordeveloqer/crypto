"use client"; // İstemci bileşeni olduğunu belirtir

import { useState } from "react";
import NFTGrid from "@/components/NFTGrid";
import GridIcons from "@/components/NftComponents/GridIcons";

export default function NFTGridWrapper({ slug, initialNfts }) {
  const [gridCount, setGridCount] = useState(12); // Varsayılan grid sayısı

  const handleGridChange = (count) => {
    console.log("Changing grid count to:", count); // Log the grid count being set
    setGridCount(count); // Update the selected grid count

    // Log the updated state
    setTimeout(() => {
      console.log("Updated grid count after state change:", gridCount);
    }, 0);
  };

  console.log("Rendering NFTGrid with gridCount:", gridCount); // Log before rendering

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <GridIcons onGridChange={handleGridChange} /> {/* Grid ikon bileşeni */}
        <h2 className="text-2xl font-semibold">Items</h2>
        <select className="bg-gray-800 p-2 rounded text-gray-300">
          <option value="price-low-high">Price low to high</option>
          <option value="price-high-low">Price high to low</option>
        </select>
      </div>
      <NFTGrid slug={slug} initialNfts={initialNfts} gridCount={gridCount} />
    
    </div>
  );
}
