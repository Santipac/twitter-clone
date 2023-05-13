import React from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Tweet } from "@/types/tweet";
import { TweetCard } from "./TweetCard";
import SkeletonTweet from "./SkeletonTweet";

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
  if (isLoading)
    return (
      <>
        <SkeletonTweet />
        <SkeletonTweet />
        <SkeletonTweet />
        <SkeletonTweet />
      </>
    );
  if (isError)
    return <h2 className="py-4 text-center">Something went wrong</h2>;

  if (tweets == null || tweets.length == 0) {
    return (
      <h2 className="my-4 text-center text-xl text-gray-500">No Tweets</h2>
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
