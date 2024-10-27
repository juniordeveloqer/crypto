// components/NFTGrid.tsx
"use client"; // İstemci bileşeni

import { useEffect, useState } from "react";
import Image from "next/image";

interface NFT {
  identifier: string;
  display_image_url?: string;
  name?: string;
}

export default function NFTGrid({
  slug,
  initialNfts,
  gridCount,
}: {
  slug: string;
  initialNfts: NFT[];
  gridCount: number; // gridCount propunu ekle
}) {
  console.log("Current grid count:", gridCount);

  const [nfts, setNfts] = useState<NFT[]>(initialNfts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [throttled, setThrottled] = useState(false);

  const throttleFetch = async () => {
    if (throttled) return;

    setThrottled(true);
    setLoading(true);

    try {
      const response = await fetch(`/api/nfts/${slug}`);
      if (!response.ok) {
        if (response.status === 429) {
          const data = await response.json();
          const waitTime = data.detail.includes("60 seconds") ? 60000 : 30000;
          console.error(`Throttled. Waiting for ${waitTime / 1000} seconds.`);
          setTimeout(throttleFetch, waitTime);
          return;
        }
        throw new Error("Network error: " + response.statusText);
      }

      const data = await response.json();
      setNfts(data);
      setError(null);
    } catch (err) {
      setError("Error loading NFTs.");
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setThrottled(false), 1000);
    }
  };

  useEffect(() => {
    if (nfts.length === 0) {
      throttleFetch();
    }
  }, [slug, nfts]);

  if (loading) return <div className="text-gray-400">Loading NFTs...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const filteredNfts = nfts.filter((nft) => nft.display_image_url);
  const gridClasses = `grid gap-6 ${
    gridCount === 1 ? "grid-cols-1" : gridCount === 4 ? "grid-cols-4" : "grid-cols-9"
  }`;

  // Debug the rendered classes
  console.log("Grid classes:", gridClasses);

  return (
    <div className={gridClasses}>
      {filteredNfts.length > 0 ? (
        filteredNfts.map((nft: NFT) => (
          <div
            key={nft.identifier}
            className="bg-gray-800 rounded-lg shadow-lg"
          >
            <div className="relative overflow-hidden">
              <Image
                src={nft.display_image_url || ""}
                alt={nft.name || "NFT Image"}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold">{nft.name}</h3>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-400">No NFTs found.</div>
      )}
    </div>
  );
}
