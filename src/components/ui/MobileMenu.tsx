/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import { VscAccount } from "react-icons/vsc";
export default function MobileMenu() {
  const { data: session } = useSession();

  return (
    <div className="dropdown-end dropdown block md:hidden">
      <label tabIndex={0} className="m-1">
        {session?.user.image ? (
          <Image
            src={`${session.user.image}`}
            width={35}
            height={35}
            alt="Profile avatar image"
            className="rounded-full"
          />
        ) : (
          <VscAccount size="35px" />
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-52 bg-gray-100 p-2 text-gray-800 shadow"
      >
        {session ? (
          <>
            <li>
              <NextLink href="/">Home</NextLink>
            </li>
            <li>
              <NextLink href={`/profiles/${session.user.id}`}>Profile</NextLink>
            </li>
            <li>
              <span onClick={() => signOut()}>Sign Out</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NextLink href="/">Home</NextLink>
            </li>
            <li>
              <NextLink href="/signin">Sign in</NextLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
