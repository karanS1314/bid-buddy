"use server";

import { database } from "@/db/database";
import { items, premiumUsers } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSignedUrlForS3Object } from "@/lib/s3";
import { eq } from "drizzle-orm";

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function createItemAction({
  fileName,
  name,
  startingPrice,
  endDate,
}: {
  fileName: string;
  name: string;
  startingPrice: number;
  endDate: Date;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const userPremium = await database.query.premiumUsers.findFirst({
    where: eq(premiumUsers.userId, user.id),
  });

  const itemAlreadyExistForUser = await database.query.items.findFirst({
    where: eq(items.userId, user.id),
  });

  const canCreateItem = userPremium || !itemAlreadyExistForUser;

  if (!canCreateItem) {
    redirect("/cannotCreateItem");
  }

  await database.insert(items).values({
    name,
    startingPrice,
    fileKey: fileName,
    currentBid: 0,
    userId: user.id,
    endDate,
  });

  redirect("/");
}
