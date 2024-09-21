import { database } from "@/db/database";
import { ItemCard } from "@/app/item-card";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { items } from "@/db/schema";
import { EmptyState } from "./empty-state";
import { pageTitleStyles } from "../styles";
import { redirect } from "next/navigation";

export default async function MyAuctionPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Your Current Auctions</h1>
      {hasItems ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
