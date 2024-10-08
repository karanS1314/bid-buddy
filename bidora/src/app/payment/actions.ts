"use server";

import { database } from "@/db/database";
import {premiumUsers } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";


export async function createPremiumUser() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  await database.insert(premiumUsers).values({
    userId: user.id,
  });
}

export async function checkPremiumUser() {
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

  if (userPremium) {
    return true;
  }
  return false;
}
