"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { formatToDollar } from "@/utils/currency";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  const userName = session?.data?.user?.name;
  const userId = session?.data?.user?.id;

  return (
    <div className="bg-gray-200 py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.webp" width="50" height="50" alt="Logo" />
            BidBuddy.com
          </Link>

          <div className="flex items-center gap-8">
            {userId && (
              <>
                <Link
                  href="/items/create"
                  className="hover:underline flex items-center gap-1"
                >
                  Create Auction
                </Link>

                <Link
                  href="/auctions"
                  className="hover:underline flex items-center gap-1"
                >
                  My Auctions
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {userId && (
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => (
                  <NotificationCell {...props} item={item}>
                    <div className="bg-gray-100 rounded-xk p-8">
                      <Link
                        className="text-blue-400 hover:text-blue-500"
                        onClick={() => {
                          setIsVisible(false);
                        }}
                        href={`/items/${item?.data?.itemId}`}
                      >
                        Someone outbidded you on{" "}
                        <span className="font-bold">
                          {item?.data?.itemName}
                        </span>{" "}
                        by ${formatToDollar(item?.data?.bidAmount)}
                      </Link>
                    </div>
                  </NotificationCell>
                )}
              />
            </>
          )}
          {session?.data?.user.image && (
            <Image
              src={session.data.user.image}
              width="50"
              height="50"
              alt="user avatar"
            ></Image>
          )}
          <div>{session.data?.user.name}</div>
          <div>
            {userName ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button type="submit" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
