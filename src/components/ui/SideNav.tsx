import React from "react";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IconHoverEffect } from "./IconHoverEffect";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
export default function SideNav() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 hidden py-4 md:block">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <NextLink href="/">
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscHome className="h-8 w-8 text-gray-600" />
                <span className="hidden text-lg text-gray-600 md:inline">
                  Home
                </span>
              </span>
            </IconHoverEffect>
          </NextLink>
        </li>
        {session != null && (
          <li>
            <NextLink href={`/profiles/${session.user.id}`}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscAccount className="h-8 w-8 text-gray-600" />
                  <span className="hidden text-lg text-gray-600 md:inline">
                    Profile
                  </span>
                </span>
              </IconHoverEffect>
            </NextLink>
          </li>
        )}
        {session == null ? (
          <li>
            <NextLink href="/signin">
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscSignIn className="h-8 w-8 fill-green-700" />
                  <span className="hidden text-lg text-green-700 md:inline">
                    Sign in
                  </span>
                </span>
              </IconHoverEffect>
            </NextLink>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscSignOut className="h-8 w-8 fill-red-700" />
                  <span className="hidden text-lg text-red-700 md:inline">
                    Sign out
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
