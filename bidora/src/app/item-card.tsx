import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { isBidOver } from "@/utils/bids";
import { formatToDollar } from "@/utils/currency";
import { format } from "date-fns";
import { getImageUrl } from "@/utils/files";

import Image from "next/image";
import Link from "next/link";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div
      key={item.id}
      className="border p-8 sm:text-xl rounded-xl space-y-2 w-full min-w-fit"
    >
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        width={200}
        height={150}
        className="w-[200px] h-[120px] object-cover"
      />
      <h2 className="font-bold">{item.name}</h2>
      {isBidOver(item) ? (
        <>
          <p className="font-bold">Starting price :</p>
          <p>${formatToDollar(item.startingPrice)}</p>
          <p className="text-lg">Bidding is Over</p>
          <Badge className="w-fit" variant="destructive">
            Sold for ${formatToDollar(item.currentBid)}
          </Badge>
        </>
      ) : (
        <>
          <p className="font-bold">Current price :</p>
          <p>${formatToDollar(item.currentBid)}</p>
          <p className="font-bold">Ends On: </p>
          <p>{format(item.endDate, "eeee M/dd/yy")}</p>
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
