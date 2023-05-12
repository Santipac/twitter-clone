import { useSession } from "next-auth/react";
import React from "react";
import Button from "../ui/Button";

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
      className="bg-blue-500 text-white"
      disabled={isLoading}
      onClick={onClick}
      gray={isFollowing}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
