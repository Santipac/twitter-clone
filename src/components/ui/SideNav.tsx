import React from "react";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
export default function SideNav() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <NextLink href="/">Home</NextLink>
        </li>
        {session != null && (
          <li>
            <NextLink href={`/profiles/${session.user.id}`}>Profile</NextLink>
          </li>
        )}
        {session == null ? (
          <li>
            <button onClick={() => void signIn()}>Sign in</button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>Sign out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
