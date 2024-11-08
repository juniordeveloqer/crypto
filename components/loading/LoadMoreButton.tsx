// components/loading/LoadMoreButton.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

interface LoadMoreButtonProps {
  currentData: any[];
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ currentData }) => {
  const [items, setItems] = useState(currentData);
  const [offset, setOffset] = useState(currentData.length);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef(null);

  const fetchMoreData = async () => {
    if (loading) return; // Prevent multiple calls
    setLoading(true);

    // Logging the API endpoint URL to verify its structure
    const apiUrl = `/api/getCombinedData?offset=${offset}&limit=20`;
    console.log("Fetching data from:", apiUrl);

    try {
      const res = await fetch(apiUrl);
      console.log("Fetch response received:", res);

      // Check if the response status is not OK
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to fetch more items: ${res.status} - ${errorText}`,
        );
      }

      console.log("Response Status:", res.status); // Log response status
      console.log("Response Headers:", res.headers); // Log headers to see if any additional debugging info is available

      const newItems = await res.json();
      console.log("Fetched new items:", newItems); // Log the actual data fetched

      // Update the items and offset if data was fetched successfully
      setItems((prevItems) => [...prevItems, ...newItems]);
      setOffset((prevOffset) => prevOffset + newItems.length);
    } catch (error) {
      console.error("Error loading more items:", error);

      // Log specific information about the error
      if (error instanceof SyntaxError) {
        console.error("JSON parsing error:", error.message);
      } else {
        console.error("General fetch error:", error.message);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading) {
          await fetchMoreData();
        }
      },
      { rootMargin: "100px" },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [offset]);

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>{/* Render each new item here as needed */}</div>
      ))}
      <div ref={loadMoreRef} className="flex justify-center my-4">
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default LoadMoreButton;
