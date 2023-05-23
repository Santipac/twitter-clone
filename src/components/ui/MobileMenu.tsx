/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";
import { Button } from "../primitives/button";
import { useRouter } from "next/router";
import { HiOutlineUser } from "react-icons/hi2";
export default function MobileMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="block min-[425px]:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none ring-transparent">
          <Button variant="ghost" className="h-12 w-12 p-0 md:h-8 md:w-8">
            <span className="sr-only">Open menu</span>
            {session ? (
              <Image
                src={session.user.image || ""}
                alt="Profile Image"
                quality={100}
                width={35}
                height={35}
                className=" rounded-full md:hidden"
              />
            ) : (
              <HiOutlineUser className="h-6 w-6 text-black" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-4">
          {session ? (
            <>
              <DropdownMenuItem
                onClick={() => void router.push("/")}
                className="cursor-pointer"
              >
                Home
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => void router.push(`/profiles/${session.user.id}`)}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => void signOut()}
                className="cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => void router.push("/signin")}
              className="cursor-pointer"
            >
              Sign in
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
