import React from "react";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { IconHoverEffect } from "../tweets/IconHoverEffect";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
export default function SideNav() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <NextLink href="/">
            <IconHoverEffect>
              <span className="flex items-center gap-4">
                <VscHome className="h-8 w-8" />
                <span className="hidden text-lg md:inline">Home</span>
              </span>
            </IconHoverEffect>
          </NextLink>
        </li>
        {session != null && (
          <li>
            <NextLink href={`/profiles/${session.user.id}`}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscAccount className="h-8 w-8" />
                  <span className="hidden text-lg md:inline">Profile</span>
                </span>
              </IconHoverEffect>
            </NextLink>
          </li>
        )}
        {session == null ? (
          <li>
            <button onClick={() => void signIn()}>
              <IconHoverEffect>
                <span className="flex items-center gap-4">
                  <VscSignIn className="h-8 w-8 fill-green-700" />
                  <span className="hidden text-lg text-green-700 md:inline">
                    Sign in
                  </span>
                </span>
              </IconHoverEffect>
            </button>
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
