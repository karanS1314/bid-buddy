import { database } from "@/db/database";
import ItemsPage from "./itemsPage";

export default async function Home() {
  // Fetch all items from the database
  const allItems = await database.query.items.findMany();

  return <ItemsPage allItems={allItems} />;
}
