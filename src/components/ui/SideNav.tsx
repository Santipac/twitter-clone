import React, { type ReactNode } from "react";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import { SiTwitter } from "react-icons/si";
import {
  HiOutlineHome,
  HiHashtag,
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineBookmark,
  HiOutlineUser,
} from "react-icons/hi2";
import { Button } from "../primitives/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";
import { VscArrowLeft } from "react-icons/vsc";

interface NavLinkItem {
  href: string;
  text: string;
  icon?: ReactNode;
}

const items: NavLinkItem[] = [
  {
    href: "/",
    text: "Home",
    icon: <HiOutlineHome className="h-6 w-6" />,
  },
  {
    href: "/explore",
    text: "Explore",
    icon: <HiHashtag className="h-6 w-6" />,
  },
  {
    href: "/notifications",
    text: "Notifications",
    icon: <HiOutlineBell className="h-6 w-6" />,
  },
  {
    href: "/messages",
    text: "Messages",
    icon: <HiOutlineEnvelope className="h-6 w-6" />,
  },
  {
    href: "/bookmarks",
    text: "Bookmarks",
    icon: <HiOutlineBookmark className="h-6 w-6" />,
  },
];

export default function SideNav() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="hidden flex-col p-4 min-[425px]:flex md:mr-6">
      <ul className="flex flex-1 flex-col items-start whitespace-nowrap ">
        {router.pathname !== "/" && (
          <li className="rounded-full p-4  hover:bg-slate-50">
            <NextLink href=".." className="flex items-center">
              <VscArrowLeft className="h-6 w-6" />
            </NextLink>
          </li>
        )}
        <li className="rounded-full p-4 hover:bg-slate-50">
          <NextLink href="/">
            <SiTwitter className="h-6 w-6" />
          </NextLink>
        </li>
        {session && (
          <li className="rounded-full p-4 hover:bg-slate-50">
            <NextLink
              href={`/profiles/${session.user.id}`}
              className="flex gap-4  "
            >
              <HiOutlineUser className="h-6 w-6 text-black" />
              <div className="hidden flex-none text-lg font-medium md:inline-flex">
                Profile
              </div>
            </NextLink>
          </li>
        )}
        {items.map(({ href, text, icon }, i) => (
          <li
            key={`header-${i}`}
            className="overflow-hidden rounded-full p-4 hover:bg-slate-50 focus:outline-none"
          >
            <NextLink href={href} className="flex gap-4  ">
              {icon}
              <div className="hidden flex-none text-lg font-medium md:inline-flex">
                {text}
              </div>
            </NextLink>
          </li>
        ))}
      </ul>
      {session == null ? (
        <Button
          onClick={() => void router.push("/signin")}
          className="h-12 w-full rounded-full bg-transparent hover:bg-transparent md:bg-black md:hover:bg-zinc-900"
        >
          <HiOutlineUser className="h-6 w-6 text-black md:hidden" />
          <span className="hidden text-lg md:inline">Sign in</span>
        </Button>
      ) : (
        <div className="mb-4 flex justify-center md:space-x-6">
          <div className="hidden space-x-2 md:flex">
            <Image
              src={session.user.image || ""}
              alt="Profile Image"
              quality={100}
              width={50}
              height={50}
              className=" rounded-full"
            />
            <div className=" flex flex-col">
              <h2 className="text-md font-medium">{session.user.name}</h2>
              <h2 className="text-sm font-medium text-gray-400">
                @{session.user.name}
              </h2>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" outline-none ring-transparent">
              <Button variant="ghost" className="h-12 w-12 p-0 md:h-8 md:w-8">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="hidden h-4 w-4 md:block" />
                <Image
                  src={session.user.image || ""}
                  alt="Profile Image"
                  quality={100}
                  width={50}
                  height={50}
                  className=" rounded-full md:hidden"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-4">
              <DropdownMenuItem
                onClick={() => void signOut()}
                className="cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
}
