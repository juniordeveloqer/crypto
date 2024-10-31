// lib/fetchBitcoinPosts.ts
export const fetchBitcoinPosts = async (): Promise<any[]> => {
  const response = await fetch(
    `https://www.reddit.com/r/Bitcoin/hot.json?limit=10`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from Reddit");
  }

  const data = await response.json();
  return data.data.children.map((post: any) => ({
    title: post.data.title,
    url: post.data.url,
    score: post.data.score,
    created: post.data.created_utc,
    author: post.data.author,
  }));
};
