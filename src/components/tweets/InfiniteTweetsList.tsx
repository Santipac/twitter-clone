import React from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Tweet } from "@/types/tweet";
import { TweetCard } from "./TweetCard";

type Props = {
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

function InfiniteTweetsList({
  tweets,
  isError,
  isLoading,
  fetchNewTweets,
  hasNextPage = false,
}: Props) {
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Error...</h1>;

  if (tweets == null || tweets.length == 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }
  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasNextPage}
        loader={<LoadingSpinner />}
      >
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </InfiniteScroll>
    </ul>
  );
}

export default InfiniteTweetsList;
