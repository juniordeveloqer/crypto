"use client"; // Bu bileşeni istemci tarafında işaretler

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

  // Slug geçerli değilse hata mesajı göster
  if (!slug || slug.trim() === "") {
    console.error("Geçersiz slug:", slug);
    return <div>Slug geçerli değil.</div>;
  }

  // Eğer initialNfts boşsa, yükleme durumunu güncelle
  useEffect(() => {
    if (nfts.length === 0) {
      setLoading(true);
      setError("NFT'ler yükleniyor...");
    }
  }, [nfts]);

  if (loading) return <div className="text-gray-400">{error}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!Array.isArray(nfts)) {
    console.warn("Beklenmeyen veri formatı:", nfts);
    return <div>Beklenmeyen veri formatı.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {nfts.map((nft: NFT) => (
        <div
          key={nft.identifier}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        >
          <div className="relative overflow-hidden">
            <Image
              src={nft.display_image_url || "/placeholder.png"}
              alt={nft.name || "Unnamed NFT"}
              width={300}
              height={300}
              className="w-full h-full object-cover"
              style={{ width: "auto", height: "auto" }} // Aspect ratio koruma
            />
          </div>
          <div className="p-4">
            <h4 className="text-lg font-medium text-white">
              {nft.name || "Unnamed NFT"}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
