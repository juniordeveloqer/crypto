// app/reddit/fetchRedditPosts.ts

import { unstable_cache } from "next/cache";

const fetchBitcoinPosts = unstable_cache(
  async (): Promise<any[]> => {
    const res = await fetch('https://www.reddit.com/r/Bitcoin/hot.json?limit=5', {
      headers: {
        'User-Agent': 'CryptoInfoFetcher/1.0 by Acrobatic_Fee_5514', // Reddit API için zorunlu User-Agent
      },
    });

    if (!res.ok) {
      const errorResponse = await res.text();
      throw new Error(`Failed to fetch: ${res.status} ${errorResponse}`);
    }

    const data = await res.json();
    return data.data.children.map((post: any) => ({
      title: post.data.title,
      url: post.data.url,
      score: post.data.score,
      created: post.data.created_utc,
      author: post.data.author,
    }));
  },
  ["bitcoin-posts"], // Cache key
  { revalidate: 3600 } // Her saatte bir yeniden doğrula
);

export default fetchBitcoinPosts;
