
export interface NewsArticle {
    id: string;
    title: string;
    url: string;
    body: string;
    imageUrl: string;
    publishedOn: number;
    sourceName: string;
    sourceImg: string;
  }
  
  const NEWS_URL = 'https://min-api.cryptocompare.com/data/v2/news/?feeds=cryptocompare,cointelegraph,coindesk&extraParams=YourSite';
  const API_KEY = '1162f895434ff38066365c8eaecbe9415a1e8d25569f1f7ca848e8529d83a8a1';
  
  export const fetchNews = async (): Promise<NewsArticle[]> => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Cache-Control": "no-store", // Burada no-store başlığı ekledik
        "api_key": API_KEY, // API Key'i header olarak da ekledik
      },
    };
  
    try {
      const response = await fetch(`${NEWS_URL}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Ensure the data structure is valid
      if (data && data.Data && Array.isArray(data.Data)) {
        return data.Data.slice(0, 3).map((news: any) => ({
          id: news.id,
          title: news.title,
          url: news.url,
          body: news.body,
          imageUrl: news.imageurl,
          publishedOn: news.published_on,
          sourceName: news.source_info.name,
          sourceImg: news.source_info.img,
        }));
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  };
  