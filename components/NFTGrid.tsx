"use client"; // This marks the component as client-side

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
}: {
  slug: string;
  initialNfts: NFT[];
}) {
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {filteredNfts.length > 0 ? (
        filteredNfts.map((nft: NFT) => (
          <div
            key={nft.identifier}
            className="bg-gray-800 rounded-lg shadow-lg"
          >
            <div className="relative overflow-hidden">
              <Image
                src={nft.display_image_url || "/placeholder.png"}
                alt={nft.name || "Unnamed NFT"}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-medium text-white truncate">
               #{nft.identifier || "Unnamed NFT"}
              </h4>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-400">No NFTs available with images.</div>
      )}
    </div>
  );
}
