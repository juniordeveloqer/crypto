// hooks/useSearch.ts
import { useState, useEffect } from "react";

export default function useSearch(initialNfts: any[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredNfts, setFilteredNfts] = useState<any[]>(initialNfts);

  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = initialNfts.filter((nft) =>
        nft.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredNfts(filtered);
    } else {
      setFilteredNfts(initialNfts);
    }
  }, [searchQuery, initialNfts]);

  return {
    filteredNfts,
    searchQuery,
    setSearchQuery,
  };
}
