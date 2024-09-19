import { database } from "@/db/database";
import { ItemCard } from "../item-card";
import { pageTitleStyles } from "@/app/styles";

export default async function Home() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Items for sale</h1>
      <p>SEARCH SECTION</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
