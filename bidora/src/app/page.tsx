import { database } from "@/db/database";
import HeroSection from "@/components/heroSection";
import FeaturedSection from "@/components/featuredSection";
import PriceSection from "@/components/priceSection";
export default async function Home() {
  const items = await database.query.items.findMany({
    where: (fields, operators) => operators.gt(fields.endDate, new Date()), // Filter items with endDate > new Date()
    orderBy: (fields, operators) => [
      operators.desc(fields.startingPrice), // Sort by startingPrice in descending order
    ],
    limit: 6, // Limit the result to 3 items
  });

  return (
    <main className="space-y-8">
      <HeroSection />
      <FeaturedSection items={items} />
      <PriceSection />
    </main>
  );
}
