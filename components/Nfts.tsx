const API_KEY = process.env.OPENSEA_API_KEY;

export interface NftInfo {
  name: string;
  image_url: string;
}
if (!API_KEY) {
  throw new Error("API Key is missing!");
}
export const 

fetchNftInfo = async (): Promise<NftInfo[]> => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY,
  

    },
    cache: "no-store" as RequestCache, 
    
  };

  try {
    const response = await fetch(
      "https://api.opensea.io/api/v2/orders/ethereum/seaport/listings?order_direction=desc",
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
 

    // Process NFTs
    if (data && Array.isArray(data.orders)) {
      const allNfts = data.orders.flatMap(
        (order) =>
          order.maker_asset_bundle?.assets?.map((asset) => ({
            name: asset.name || "Unnamed", // Default name
            image_url: asset.image_url || "https://via.placeholder.com/150", // Default image
          })) || []
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
};
