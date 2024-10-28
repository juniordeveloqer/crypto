import { useState } from "react";
import Image from "next/image";

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

export default function NFTGrid({
  slug,
  initialNfts,
  offers,
  gridCount,
}: {
  slug: string;
  initialNfts: NFT[];
  offers: Record<string, Offer>;
  gridCount: number;
}) {
  const [nfts, setNfts] = useState<NFT[]>(initialNfts);

  const filteredNfts = nfts.filter((nft) => nft.display_image_url);
  const gridClasses = `grid gap-6 ${
    gridCount === 5 ? "grid-cols-5" : gridCount === 4 ? "grid-cols-4" : "grid-cols-9"
  }`;

  return (
    <div className={gridClasses}>
      {filteredNfts.length > 0 ? (
        filteredNfts.map((nft: NFT) => {
          const offer = offers[nft.identifier];

          return (
            <div key={nft.identifier} className="bg-gray-800 rounded-lg shadow-lg">
              <div className="relative overflow-hidden">
                <Image
                  src={nft.display_image_url || ""}
                  alt={nft.name || "NFT Image"}
                  width={300}
                  height={300}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>

              {gridCount !== 4 && (
                <div className="p-2">
                  <h3 className="text-sm">{nft.name || nft.identifier}</h3>
                  
                  {/* Only render the price paragraph if offer and offer.price are valid */}
                  {offer?.price?.value ? ( // Optional chaining to check if price value exists
                    <p className="text-xs text-gray-400">
                      Last Sale: {parseFloat(offer.price.value) / 1e18} ETH {/* Convert wei to ETH */}
                    </p>
                  ) : null} {/* Don't render anything if price is not valid */}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-gray-400">No NFTs found.</div>
      )}
    </div>
  );
}
