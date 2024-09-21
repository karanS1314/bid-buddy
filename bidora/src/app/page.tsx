import { database } from "@/db/database";
import HeroSection from "@/components/heroSection";
import FeaturedSection from "@/components/featuredSection";
import PriceSection from "@/components/priceSection";
import { items } from "@/db/schema";
import { desc, gt } from "drizzle-orm";
export default async function Home() {
  const filteredItems = await database.query.items.findMany({
    where: gt(items.endDate, new Date()), // Use gt() for greater than comparison
    orderBy: desc(items.startingPrice), // Sort by startingPrice in descending order
    limit: 6, // Limit the result to 6 items
  });

  return (
    <main className="space-y-8">
      <HeroSection />
      <FeaturedSection items={filteredItems} />
      <PriceSection />
    </main>
  );
}
