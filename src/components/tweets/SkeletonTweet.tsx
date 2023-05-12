import React from "react";

function SkeletonTweet() {
  return (
    <div className="item flex h-[7rem] w-full animate-pulse border-b-2">
      <div className="ml-3 mt-3 h-12 w-12 animate-pulse rounded-full bg-gray-200" />
      <div className="flex flex-col gap-4">
        <div className="ml-6 mt-4 flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>
        <div className="ml-6 h-4 w-72 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export default SkeletonTweet;
