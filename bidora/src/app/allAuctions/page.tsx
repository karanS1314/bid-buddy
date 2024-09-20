import { database } from "@/db/database";
import ItemsPage from "./itemsPage";
import { Item } from "@/db/schema";

export default async function Home() {
  // Fetch all items from the database
  const allItems: Item[] = await database.query.items.findMany();

  return <ItemsPage allItems={allItems} />;
}
