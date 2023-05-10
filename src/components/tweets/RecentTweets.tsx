import React from "react";
import InfiniteTweetsList from "./InfiniteTweetsList";
import { api } from "@/utils/api";

function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
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

export default RecentTweets;
