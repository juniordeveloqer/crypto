import Image from "next/image";

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
  const filteredNfts = initialNfts.filter((nft) => nft.display_image_url);
  const gridClasses = `grid gap-6 ${
    gridCount === 5 ? "grid-cols-5" : gridCount === 4 ? "grid-cols-4" : "grid-cols-9"
  }`;

  return (
    <div className={gridClasses}>
      {filteredNfts.length > 0 ? (
        filteredNfts.map((nft: NFT) => {
          const offer = offers[nft.identifier];
          const ethPrice =
            offer && offer.price && offer.price.value
              ? parseFloat(offer.price.value) / 1e18
              : null;

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
                  {ethPrice !== null && (
                    <p className="text-xs text-gray-400">
                      Last Sale: {ethPrice} ETH
                    </p>
                  )}
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
