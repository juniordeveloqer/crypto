// lib/getData.ts

const options = {
  method: 'GET',
  headers: { 
    accept: 'application/json', 
'x-api-key': process.env.OPENSEA_API_KEY || '' 
  }
};

// Koleksiyonları almak için fonksiyon
export async function getCollectionsData() {
  const res = await fetch('https://api.opensea.io/api/v2/collections?chain=ethereum&order_by=market_cap', options);
  
  if (!res.ok) {
    throw new Error('Koleksiyon verisi çekilemedi');
  }

  const data = await res.json();
  return data.collections.slice(0, 40);  // İlk 5 koleksiyonu al
}

// Stats verilerini dinamik "collection" parametresi ile almak için fonksiyon
export async function getStatsData(collectionName: string) {
  const res = await fetch(`https://api.opensea.io/api/v2/collections/${collectionName}/stats`, options);
  
  if (!res.ok) {
    throw new Error(`${collectionName} için stats verisi çekilemedi`);
  }

  return res.json();
}

export async function getCombinedData() {
  const collections = await getCollectionsData(); // Fetch collections

  // Fetch stats for each collection
  const statsPromises = collections.map(async (collection: any) => {
    const stats = await getStatsData(collection.collection); // Use "collection" field
    return { collection, stats }; // Combine collection and stats
  });

  const combinedData = await Promise.all(statsPromises); // Wait for all stats to be fetched

  // Sort by total volume (you may want to adjust this to suit your needs)
  combinedData.sort((a, b) => {
    return (b.stats.total.volume || 0) - (a.stats.total.volume || 0); // Descending order
  });

  return combinedData;
}
