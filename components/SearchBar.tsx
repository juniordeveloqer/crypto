// components/SearchBar.tsx
"use client";

import { useState } from "react";

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void; // Prop to handle search queries
}

export default function SearchBar({ initialQuery = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query); // Call the onSearch prop with the query
  };

  return (
    <form onSubmit={handleSearch} className="flex mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or trait"
        className="border border-gray-600 bg-gray-800 text-white p-2 rounded-l"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded-r">
        Search
      </button>
    </form>
  );
}
