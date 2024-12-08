import axios from "axios";
import cache from "memory-cache";
import { getAccessToken } from "@/components/redditapi/redditToken"; // Token almak için import ettik

const REDDIT_URL = "https://oauth.reddit.com/r/bitcoin/hot?limit=3";

async function getCachedAccessToken(): Promise<string> {
    // Check if the token exists in cache
    let accessToken = cache.get('redditAccessToken');
    
    if (!accessToken) {
      console.log("Access token not found in cache. Attempting to fetch a new token...");
      accessToken = await getAccessToken();  // Fetch a new token
  
      if (accessToken) {
        // Save the token in cache for 1 hour
        cache.put('redditAccessToken', accessToken, 3600000);  // 3600000 ms = 1 hour
      } else {
        console.error("Failed to fetch new access token.");
      }
    }
  
    return accessToken || '';  // Return the token or an empty string if not found
  }
  
export async function getRedditData() {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      console.error("Access token not available.");
      throw new Error("Erişim token'ı alınamadı");
    }
  
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'MyRedditBot/0.1 by Acrobatic_Fee_5514',
    };
  
    try {
      const response = await axios.get(REDDIT_URL, { headers });
      const posts = response.data.data.children.map((post: any) => ({
        title: post.data.title,
        url: post.data.url,
      }));
  
      return posts;
    } catch (error) {
      if (error.response) {
        console.error("Error fetching Reddit data:", error.response.data);
      } else {
        console.error("Error fetching Reddit data:", error.message);
      }
      throw new Error("Reddit API request failed");
    }
  }
  