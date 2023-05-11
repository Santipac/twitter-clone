import React from "react";
import InfiniteTweetsList from "./InfiniteTweetsList";
import { api } from "@/utils/api";

export default function FollowingTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  return (
    <InfiniteTweetsList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasNextPage={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}
