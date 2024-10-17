import Image from "next/image";
import {
  getCollectionItems,
  getCollectionStats,
  getNFTs,
} from "@/components/NFtCollectionSolo";
import NFTGrid from "@/components/NFTGrid";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
export default async function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  try {
    const collection = await getCollectionItems(slug);
    const stats = await getCollectionStats(slug);
    const nfts = await getNFTs(slug);

    if (!collection || !nfts || nfts.length === 0) {
      return (
        <div className="text-red-500">No data found for collection: {slug}</div>
      );
    }

    const formatPrice = (wei: string) => {
      const eth = parseFloat(wei) / 1e18;
      return eth.toFixed(2);
    };

    return (
      <div className="relative min-h-screen bg-black text-white">
        {/* Banner Section */}
        {collection.banner_image_url && (
          <div className="relative h-72 w-full mb-8">
            <Image
              src={collection.banner_image_url.replace(/w=\d+/, "w=1920")} // Yüksek kaliteli görsel
              alt="Banner Image"
              fill
              className="object-cover opacity-80"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full flex justify-center items-center p-6 z-10">
              <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto ">
                {/* Sol: Koleksiyon ismi ve resmi */}
                <div className=" items-center ">
                  <Image
                    src={collection.image_url || "/placeholder.png"}
                    alt={collection.name || "Unnamed Collection"}
                    width={110}
                    height={110}
                    className="border border-gray-600 rounded-lg"
                  />
                  <div className="flex items-center mt-6">
                    <h1 className="text-4xl font-bold">
                      {collection.name || "Unnamed Collection"}
                    </h1>
                    {/* Safelist Verified Icon */}
                    {collection.safelist_status === "verified" && (
                      <CheckBadgeIcon
                        className="w-8 h-8 text-blue-500 inline-block ml-2"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4 text-center text-gray-300">
                  <div>
                    <p className="text-lg">
                      {stats?.total?.volume
                        ? stats.total.volume.toFixed(2)
                        : "-"}{" "}
                      {stats?.total?.floor_price_symbol || "ETH"}
                    </p>
                    <p className="text-sm">Total Volume</p>
                  </div>
                  <div>
                    <p className="text-lg">
                      {stats?.total?.floor_price
                        ? stats.total.floor_price.toFixed(2)
                        : "-"}{" "}
                      {stats?.total?.floor_price_symbol || "ETH"}
                    </p>
                    <p className="text-sm">Floor Price</p>
                  </div>
                  <div>
                    <p className="text-lg">
                      {stats?.total?.average_price
                        ? stats.total.average_price.toFixed(4)
                        : "-"}{" "}
                      ETH
                    </p>
                    <p className="text-sm">Average Price</p>
                  </div>
                  <div>
                    <p className="text-lg">{stats?.total?.num_owners || "-"}</p>
                    <p className="text-sm">Owners</p>
                  </div>
                  <div>
                    <p className="text-lg">{stats?.total?.sales || "-"}</p>
                    <p className="text-sm">Sales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NFT Grid */}
        <div className="max-w-screen-xl mx-auto px-4">
          <p className="mt-4 max-w-2xl text-gray-300">
            {" "}
            {collection.description}{" "}
          </p>
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Items</h2>
              {/* Sorting options */}
              <select className="bg-gray-800 p-2 rounded text-gray-300">
                <option value="price-low-high">Price low to high</option>
                <option value="price-high-low">Price high to low</option>
              </select>
            </div>
            <NFTGrid slug={slug} initialNfts={nfts} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return <div className="text-red-500">Error loading collection data.</div>;
  }
}
