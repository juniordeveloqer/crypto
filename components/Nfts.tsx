
export interface NftInfo {
  name: string;
  image_url: string;
}

export const fetchNftInfo = async (): Promise<NftInfo[]> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "2911ba78c9124dab86df685f150920fd",
    },
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
    console.log("Fetched data:", data);

    // NFT'lerin bilgilerini çıkart
    if (data && Array.isArray(data.orders)) {
      const allNfts = data.orders.flatMap(
        (order) =>
          order.maker_asset_bundle?.assets?.map((asset) => ({
            name: asset.name || "Unnamed", // Varsayılan bir değer sağlandı
            image_url: asset.image_url || "https://via.placeholder.com/150", // Varsayılan bir görsel URL'si sağlandı
          })) || []
      );

      // İlk 6 NFT'yi döndür
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
