import Image from "next/image";
import {
  getCollectionItems,
  getCollectionStats,
  getNFTs,
  getBestOfferForNFT,
} from "@/components/NFtCollectionSolo";
import NFTGrid from "@/components/NFTGrid";
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

    const nftsWithOffers = await Promise.all(
      nfts.map(async (nft: any) => {
        const bestOffer = await getBestOfferForNFT(slug, nft.identifier);
        return {
          ...nft,
          bestOffer:
            bestOffer && bestOffer.price
              ? {
                  value: bestOffer.price.value,
                  currency: bestOffer.price.currency,
                }
              : null,
        };
      }),
    );

    const formatPrice = (wei: string) => {
      const eth = parseFloat(wei) / 1e18;
      return eth.toFixed(2);
    };

    return (
      <div className="relative text-white min-h-screen bg-black p-8">
        {/* Banner Bölümü */}
        {collection.banner_image_url && (
          <div className="absolute inset-0 w-full h-64">
            <Image
              src={collection.banner_image_url}
              alt="Banner Image"
              fill // Eski layout="fill" yerine
              className="object-cover opacity-60" // objectFit yerine className ile stil belirtiyoruz
              priority // Banner'ı yüksek öncelikli yükle
            />
          </div>
        )}

        {/* Ana İçerik Bölümü */}
        <div className="relative z-10">
          {/* Header Bölümü */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start space-x-4">
              <Image
                src={collection.image_url || "/path/to/placeholder-image.jpg"}
                alt={collection.name || "Unnamed Collection"}
                width={80} // 80x80 px olacak
                height={80}
                className="rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold">
                  {collection.name || "Unnamed Collection"}
                </h1>
              </div>
            </div>

            {/* İstatistikler Bölümü */}
            <div className="flex space-x-8">
              <div className="text-center">
                <p className="text-lg">
                  {stats?.total?.volume ? formatPrice(stats.total.volume) : "-"}{" "}
                  ETH
                </p>
                <p className="text-gray-400">Toplam Hacim</p>
              </div>
              <div className="text-center">
                <p className="text-lg">
                  {stats?.total?.floor_price
                    ? stats.total.floor_price.toFixed(2)
                    : "-"}{" "}
                  ETH
                </p>
                <p className="text-gray-400">Taban Fiyat</p>
              </div>
              <div className="text-center">
                <p className="text-lg">{stats?.total?.sales || "-"}</p>
                <p className="text-gray-400">Satışlar</p>
              </div>
              <div className="text-center">
                <p className="text-lg">{stats?.total?.num_owners || "-"}</p>
                <p className="text-gray-400">Sahipler</p>
              </div>
            </div>
          </div>
          
          <NFTGrid slug={slug} initialNfts={nfts} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Koleksiyon verisi alınırken hata oluştu:", error);
    return <div className="text-red-500">Koleksiyon verisi alınamadı.</div>;
  }
}
