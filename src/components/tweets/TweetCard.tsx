/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";
import NextLink from "next/link";
import type { Tweet } from "@/types/tweet";
import ProfileImage from "../ui/ProfileImage";
import { dateTimeFormatter } from "@/helpers";
import { useSession } from "next-auth/react";
import { IconHoverEffect } from "../ui/IconHoverEffect";
import { api } from "@/utils/api";
import { HeartIcon as HeartOutlined } from "@heroicons/react/24/outline";
import { HeartIcon as HeartFilled } from "@heroicons/react/24/solid";
export function TweetCard({
  id,
  likeCount,
  content,
  user,
  createdAt,
  likedByMe,
}: Tweet) {
  const { mutate: deleteTweet, isLoading } = api.tweet.delete.useMutation({
    onSuccess: () => {
      trpcUtils.tweet.infiniteFeed.refetch();
    },
  });
  const { data: session } = useSession();
  const trpcUtils = api.useContext();
  // The function toggleLike modifies the number of likes the tweet has and changes its styles if we liked it or not. Instead of refetching every time tweets (likes) change, it only modifies the tweet in question and keeps the others in cache.
  const toggleLike = api.tweet.toggleLike.useMutation({
    onSuccess: ({ addedLike }) => {
      // Takes the typeof of data through the parameters of the function
      const updateData: Parameters<
        typeof trpcUtils.tweet.infiniteFeed.setInfiniteData
      >[1] = (oldData) => {
        if (oldData == null) return;
        const countModifier = addedLike ? 1 : -1;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              tweets: page.tweets.map((tweet) => {
                if (tweet.id === id) {
                  return {
                    ...tweet,
                    likeCount: tweet.likeCount + countModifier,
                    likedByMe: addedLike,
                  };
                }
                return tweet;
              }),
            };
          }),
        };
      };
      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, updateData);
      trpcUtils.tweet.infiniteFeed.setInfiniteData(
        { onlyFollowing: true },
        updateData
      );
      trpcUtils.tweet.infiniteProfileFeed.setInfiniteData(
        { userId: user.id },
        updateData
      );
    },
  });
  function handleToggleLike() {
    toggleLike.mutate({ id });
  }

  return (
    <li className="flex gap-4 border-b p-4">
      <NextLink href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </NextLink>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <div className="flex w-full items-center justify-between">
            <div>
              <NextLink
                className="focus-visible: font-bold text-gray-600 "
                href={`/profiles/${user.id}`}
              >
                {user.name}
              </NextLink>
              <span className="mx-2 text-gray-500">-</span>
              <span className="text-gray-500">
                {dateTimeFormatter.format(createdAt)}
              </span>
            </div>
            {session?.user.id === user.id && (
              <button
                className="text-md mx-2 cursor-pointer text-red-500 disabled:cursor-not-allowed disabled:text-red-400"
                onClick={() => deleteTweet({ tweetId: id })}
                disabled={isLoading}
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <p className="whitespace-pre-wrap text-gray-600">{content}</p>
        <HeartButton
          likedByMe={likedByMe}
          likeCount={likeCount}
          onClick={handleToggleLike}
          isLoading={toggleLike.isLoading}
        />
      </div>
    </li>
  );
}

type HearButtonProps = {
  likedByMe: boolean;
  likeCount: number;
  isLoading: boolean;
  onClick: () => void;
};

function HeartButton({
  likedByMe,
  likeCount,
  isLoading,
  onClick,
}: HearButtonProps) {
  const session = useSession();
  const Icon = likedByMe ? HeartFilled : HeartOutlined;
  if (session.status !== "authenticated") {
    return (
      <div className="my-1 flex items-center gap-3 self-start text-gray-500">
        <Icon className="h-4 w-4 text-gray-500" />
        <span>{likeCount}</span>
      </div>
    );
  }
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`group -ml-2 flex items-center gap-1 self-start transition-colors duration-200 ${
        likedByMe
          ? "text-red-500"
          : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
      }`}
    >
      <IconHoverEffect red>
        <Icon
          className={` h-4 w-4 transition-colors duration-200 ${
            likedByMe
              ? "fill-red-500"
              : "text-gray-500 hover:text-red-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
          }`}
        />
      </IconHoverEffect>
      <span>{likeCount}</span>
    </button>
  );
}
