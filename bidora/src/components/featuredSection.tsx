"use client";

import { ItemCard } from "@/app/item-card";
import { Item } from "@/db/schema";
import { useState, useEffect } from "react";

export default function Carousel({ items }: { items: Item[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Math.ceil(items.length / itemsPerSlide)
      );
    }, 1000000000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [items.length]);

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerSlide;
    const endIndex = Math.min(startIndex + itemsPerSlide, items.length);
    return items.slice(startIndex, endIndex);
  };
  return (
    <div className="relative items-center justify-center overflow-hidden">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Featured Items
        </h2>
      </div>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {getCurrentItems().map((item) => (
          <div key={item.id} className="flex min-w-full">
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
