import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable("bidora_bids", {
  id: serial("id").primaryKey(),
});
