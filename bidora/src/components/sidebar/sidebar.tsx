import {
  Icon,
  CloseIcon,
  SidebarMenu,
} from "./SidebarElements";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
interface SidebarProps {
  isOpen: boolean; // Add isOpen to the prop type
  toggle: () => void; // Define the toggle function
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const session = useSession();

  const userName = session?.data?.user?.name;
  return (
    <div
      className={`
      fixed z-[999] w-full h-full bg-[#0d0d0d] transition-all duration-300 ease-in-out
      ${isOpen ? "block" : "hidden"}
    `}
      onClick={toggle}
    >
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      {/* <SidebarWrapper> */}
      <SidebarMenu>
        <Link
          href="/allAuctions"
          className="hover:underline flex items-center gap-1"
          onClick={toggle}
        >
          All Auctions
        </Link>
        <Link
          href="/items/create"
          className="hover:underline flex items-center gap-1"
          onClick={toggle}
        >
          Create Auction
        </Link>
        <Link
          href="/myAuctions"
          className="hover:underline flex items-center gap-1"
          onClick={toggle}
        >
          My Auctions
        </Link>
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
      </SidebarMenu>
      {/* </SidebarWrapper> */}
    </div>
  );
};

export default Sidebar;
