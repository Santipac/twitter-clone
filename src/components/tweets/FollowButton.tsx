import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../primitives/button";

export default function FollowButton({
  userId,
  isFollowing,
  isLoading,
  onClick,
}: {
  userId: string;
  isFollowing: boolean;
  isLoading: boolean;
  onClick: () => void;
}) {
  const session = useSession();

  if (session.status !== "authenticated" || session.data.user.id === userId) {
    return null;
  }

  return (
    <Button
      className={`rounded-full bg-blue-500 text-white hover:bg-sky-600`}
      disabled={isLoading}
      onClick={onClick}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
