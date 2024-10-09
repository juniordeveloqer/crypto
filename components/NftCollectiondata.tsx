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
  return data.collections.slice(0, 20);  // İlk 5 koleksiyonu al
}

// Stats verilerini dinamik "collection" parametresi ile almak için fonksiyon
export async function getStatsData(collectionName: string) {
  const res = await fetch(`https://api.opensea.io/api/v2/collections/${collectionName}/stats`, options);
  
  if (!res.ok) {
    throw new Error(`${collectionName} için stats verisi çekilemedi`);
  }

  return res.json();
}

// Hem collection hem stats verisini birleştiren fonksiyon
export async function getCombinedData() {
  const collections = await getCollectionsData(); // Koleksiyonları çekiyoruz
  
  // Her koleksiyonun "collection" alanına göre stats verilerini çekiyoruz
  const statsPromises = collections.map(async (collection: any) => {
    const stats = await getStatsData(collection.collection); // "slug" yerine "collection" alanını kullanıyoruz
    return { collection, stats }; // Koleksiyon ve stats verilerini birleştiriyoruz
  });

  return Promise.all(statsPromises); // Tüm promiseleri döndürüyoruz
}
