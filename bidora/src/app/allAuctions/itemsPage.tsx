"use client";

import { useState, useEffect } from "react";
import { ItemCard } from "../item-card";
import { pageTitleStyles } from "@/app/styles";

import { Item } from "@/db/schema";

export default function ItemsPage({ allItems }: { allItems: Item[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>(allItems);

  useEffect(() => {
    const results = allItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm, allItems]);

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Items for sale</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search Items by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>No items found</p>
        )}
      </div>
    </main>
  );
}
