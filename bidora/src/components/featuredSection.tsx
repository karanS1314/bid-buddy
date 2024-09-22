"use client";

import { ItemCard } from "@/app/item-card";
import { Item } from "@/db/schema";
import Marquee from "react-fast-marquee";
export default function FeaturedSection({ items }: { items: Item[] }) {
  return (
    <>
      <div className="relative items-center justify-center overflow-hidden">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Items
          </h2>
        </div>
        <Marquee speed={50}>
          {items.map((item) => (
            <div key={item.id} className="w-111 p-4">
              <ItemCard key={item.id} item={item} />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}
