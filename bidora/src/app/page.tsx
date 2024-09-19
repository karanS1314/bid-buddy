import { database } from "@/db/database";
import { ItemCard } from "./item-card";
import { pageTitleStyles } from "./styles";

export default async function Home() {
  const allItems = await database.query.items.findMany({
    where: (fields, operators) => operators.gt(fields.endDate, new Date()), // Filter items with endDate > new Date()
    orderBy: (fields, operators) => [
      operators.desc(fields.startingPrice), // Sort by startingPrice in descending order
    ],
    limit: 3, // Limit the result to 3 items
  });

  return (
    <main className="space-y-8">
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <div className="bg-black text-white">
        <h1 className={pageTitleStyles}>Main Section</h1>
      </div>
      <h1 className={pageTitleStyles}>Top Items</h1>
      <div className="mx-auto grid grid-cols-2 sm:grid-cols-4 gap-12">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
