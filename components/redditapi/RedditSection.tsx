// app/reddit-section/page.tsx
import { getRedditData } from '@/components/redditapi/redditApi'; // Reddit data fetching logic

// Server component that fetches Reddit data
const RedditSection = async () => {
  // Fetch Reddit data server-side
  const posts = await getRedditData();

  if (!posts) {
    return (
      <div className="mt-[135px] mr-24 p-4 bg-[#0d131d] rounded-[20px] border border-[#000000]">
        <h3 className="text-lg font-bold mb-2 flex items-center">
          <span className="breathing mr-2"></span>
          <span className="mr-1">Live</span>
          <span className="text-[#8db2e5] mr-1">Reddit</span>
          <span className="mr-1">Posts From</span>
          <span>Bitcoin Subreddit</span>
        </h3>
        <div className="spinner"></div> {/* Spinner for loading */}
      </div>
    );
  }

  return (
    <div className="mt-[135px] mr-24 p-4 bg-[#0d131d] rounded-[20px] border border-[#000000]">
      <h3 className="text-lg font-bold mb-2 flex items-center">
        <span className="breathing mr-2"></span>
        <span className="mr-1">Live</span>
        <span className="text-[#8db2e5] mr-1">Reddit</span>
        <span className="mr-1">Posts From</span>
        <span>Bitcoin Subreddit</span>
      </h3>
      <ul>
        {posts.slice(2).map((post, index) => (
          <li key={index} className="text-white mb-2">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8db2e5] hover:underline"
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RedditSection;
