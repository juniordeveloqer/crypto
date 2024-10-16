"use client"; // Client-side component olduğunu belirtiyoruz

import React, { useState, useEffect } from "react";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";

interface StarToggleProps {
  index: number;
}

const StarToggle: React.FC<StarToggleProps> = ({ index }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde, localStorage'dan favori durumunu alıyoruz
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      const favoriteSet = new Set(JSON.parse(savedFavorites));
      setIsFavorite(favoriteSet.has(index));
    }
  }, [index]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => {
      const newFavorites = new Set(
        JSON.parse(localStorage.getItem("favorites") || "[]")
      );

      if (newFavorites.has(index)) {
        newFavorites.delete(index);
      } else {
        newFavorites.add(index);
      }

      localStorage.setItem("favorites", JSON.stringify(Array.from(newFavorites)));
      return !prev;
    });
  };

  return (
    <span className="cursor-pointer" onClick={toggleFavorite}>
      {isFavorite ? (
        <SolidStar className="w-6 h-6 text-yellow-500" />
      ) : (
        <OutlineStar className="w-6 h-6 text-gray-400" />
      )}
    </span>
  );
};

export default StarToggle;
