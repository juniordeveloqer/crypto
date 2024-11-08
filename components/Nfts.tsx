import { unstable_cache } from "next/cache";

const API_KEY = process.env.OPENSEA_API_KEY;

export interface NftInfo {
  name: string;
  image_url: string;
}

if (!API_KEY) {
  throw new Error("API Key is missing!");
}

// This function will now use caching to retrieve data
const getNftInfo = unstable_cache(
  async (): Promise<NftInfo[]> => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": API_KEY,
      },
      // Remove the cache property as ISR will manage it
    };

    try {
      const response = await fetch(
        "https://api.opensea.io/api/v2/orders/ethereum/seaport/listings?order_direction=desc",
        options,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Processing NFTs
      if (data && Array.isArray(data.orders)) {
        const allNfts = data.orders.flatMap(
          (order) =>
            order.maker_asset_bundle?.assets?.map((asset) => ({
              name: asset.name || "Unnamed", // Default name
              image_url: asset.image_url || "https://via.placeholder.com/150", // Default image
            })) || [],
        );

        return allNfts.slice(0, 6);
      } else {
        console.error("Expected data structure is missing:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching NFT info:", error.message);
      return [];
    }
  },
  ["nft-info"], // Cache key
  { revalidate: 3600 }, // Updates every hour
);

// Export this function
export const fetchNftInfo = async (): Promise<NftInfo[]> => {
  return await getNftInfo();
};
