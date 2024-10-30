"use client";
import { useState } from "react";
import NFTGrid from "@/components/NFTGrid";
import GridIcons from "@/components/NftComponents/GridIcons";

interface NFTGridWrapperProps {
  slug: string;
  initialNfts: NFT[];
  offers: Record<string, Offer>;
}

interface NFT {
  identifier: string;
  display_image_url?: string;
  name?: string;
}

interface Offer {
  price?: {
    currency: string;
    decimals: number;
    value: string;
  };
}

export default function NFTGridWrapper({
  slug,
  initialNfts,
  offers,
}: NFTGridWrapperProps) {
  const [gridCount, setGridCount] = useState(5); // Default grid count
  const [sortedNfts, setSortedNfts] = useState<NFT[]>(initialNfts);

  const handleGridChange = (count: number) => {
    setGridCount(count); // Update the selected grid count
  };

  const getPriceValue = (offer?: Offer): number => {
    // Check if the offer and its price are defined, then parse value
    return offer?.price?.value ? parseFloat(offer.price.value) / 1e18 : 0;
  };

  const sortNFTs = (nfts: NFT[], offers: Record<string, Offer>, order: string) => {
    return [...nfts].sort((a, b) => {
      const aPrice = getPriceValue(offers[a.identifier]);
      const bPrice = getPriceValue(offers[b.identifier]);

      if (order === "price-low-high") {
        return aPrice - bPrice;
      } else if (order === "price-high-low") {
        return bPrice - aPrice;
      }
      return 0;
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value;
    const sorted = sortNFTs(initialNfts, offers, order);
    setSortedNfts(sorted);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <GridIcons onGridChange={handleGridChange} /> {/* Grid icon component */}
        <h2 className="text-2xl font-semibold">Items</h2>
        <select
          onChange={handleSortChange}
          className="bg-gray-800 p-2 rounded text-gray-300"
        >
          <option value="price-low-high">Price low to high</option>
          <option value="price-high-low">Price high to low</option>
        </select>
      </div>
      <NFTGrid slug={slug} initialNfts={sortedNfts} gridCount={gridCount} offers={offers} />
    </div>
  );
}
