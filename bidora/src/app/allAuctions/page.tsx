import { database } from "@/db/database";
import ItemsPage from "./itemsPage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const allItems = await database.query.items.findMany();

  return <ItemsPage allItems={allItems} />;
}
