"use client";

import { ItemCard } from "@/app/item-card";
import { Item } from "@/db/schema";
import { useState, useEffect } from "react";

export default function Carousel({ items }: { items: Item[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 100000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [items.length]);

  const getCurrentItems = () => {
    const startIndex = currentIndex * 3;
    return items.slice(startIndex, startIndex + 3);
  };
  return (
    <div className="relative items-center justify-center overflow-hidden">
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Featured Items
        </h1>
      </div>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Array.from({ length: Math.ceil(items.length / 2) }).map((_, index) => (
          <div key={index} className="flex min-w-full">
            {getCurrentItems().map((item) => (
              <div key={item.id} className="w-1/2 p-4">
                <ItemCard key={item.id} item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
