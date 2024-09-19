import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { isBidOver } from "@/utils/bids";
import { formatToDollar } from "@/utils/currency";
import { format } from "date-fns";

import Image from "next/image";
import Link from "next/link";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div
      key={item.id}
      className="border p-8 sm:text-xl rounded-xl space-y-2 w-full min-w-fit "
    >
      <Image src="/item-card.jpg" alt={item.name} width={200} height={200} />
      <h2 className=" font-bold">{item.name}</h2>
      {isBidOver(item) ? (
        <>
          <p>Starting price : ${formatToDollar(item.startingPrice)}</p>
          <p>Bidding is Over</p>
          <Badge className="w-fit" variant="destructive">
            Sold for ${formatToDollar(item.currentBid)}
          </Badge>
        </>
      ) : (
        <>
          <p>Current price : ${formatToDollar(item.currentBid)}</p>
          <p>Ends On: {format(item.endDate, "eeee M/dd/yy")}</p>
        </>
      )}
      <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
        <Link href={`/items/${item.id}`}>
          {isBidOver(item) ? "View Bid" : "Place Bid"}
        </Link>
      </Button>
    </div>
  );
}
