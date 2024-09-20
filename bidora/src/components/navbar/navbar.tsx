// import ThemeToggle from "./ThemeToggle";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { MobileIcon, NavMenu } from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { formatToDollar } from "@/utils/currency";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar: React.FC<{ toggle: () => void }> = ({ toggle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  const userName = session?.data?.user?.name;
  const userId = session?.data?.user?.id;

  return (
    <>
      <div className={"bg-gray-200 py-4 h-20 text-black sticky top-0 z-1000"}>
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="font-bold hover:text-gray-800 flex items-center gap-1"
            >
              <Image src="/logo.webp" width="50" height="50" alt="Logo" />
              BIDORA
            </Link>
            <NavMenu className="flex items-center gap-8">
              <Link
                href="/allAuctions"
                className="hover:text-gray-800 flex items-center gap-1"
              >
                All Auctions
              </Link>
              <Link
                href="/items/create"
                className="hover:text-gray-800 flex items-center gap-1"
              >
                Create Auction
              </Link>
              <Link
                href="/myAuctions"
                className="hover:text-gray-800 flex items-center gap-1"
              >
                My Auctions
              </Link>
            </NavMenu>
          </div>

          <div className="flex items-center gap-6">
            {userId && (
              <>
                <NotificationIconButton
                  ref={notifButtonRef}
                  onClick={() => setIsVisible(!isVisible)}
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
                className="rounded-full"
                src={session.data.user.image}
                width="40"
                height="40"
                alt="user avatar"
              ></Image>
            )}
            <NavMenu className="flex items-center gap-8">
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
            </NavMenu>

            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
