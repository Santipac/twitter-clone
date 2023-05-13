import { type NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MobileMenu from "@/components/ui/MobileMenu";
import SkeletonTweet from "@/components/tweets/SkeletonTweet";
import ProfileSkeleton from "@/components/tweets/ProfileSkeleton";
const SideNav = dynamic(() => import("@/components/ui/SideNav"), {
  loading: () => <p>Loading...</p>,
});
const NewTweetForm = dynamic(() => import("@/components/tweets/NewTweetForm"), {
  loading: () => <p>Loading...</p>,
});
const RecentTweets = dynamic(() => import("@/components/tweets/RecentTweets"), {
  loading: () => (
    <>
      <SkeletonTweet />
      <SkeletonTweet />
      <SkeletonTweet />
    </>
  ),
});
const FollowingTweets = dynamic(
  () => import("@/components/tweets/FollowingTweets"),
  {
    loading: () => (
      <>
        <SkeletonTweet />
        <SkeletonTweet />
        <SkeletonTweet />
      </>
    ),
  }
);
const FollowList = dynamic(() => import("@/components/tweets/FollowList"), {
  loading: () => (
    <>
      <ProfileSkeleton />
      <ProfileSkeleton />
      <ProfileSkeleton />
    </>
  ),
});

const TABS = ["Recent", "Following"] as const;
const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");
  const session = useSession();
  return (
    <section className="flex justify-center bg-white">
      <Head>
        <title>Socialize App</title>
        <meta name="description" content="Social App created with T3 Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="grid w-full grid-cols-12 justify-center md:max-w-5xl">
        <SideNav />
        <main className="col-start-1 col-end-13 min-h-screen  border-x md:col-start-3  md:col-end-10">
          <header className="sticky top-0 z-10 border-b bg-white pt-2">
            <div className="flex w-full items-center px-4 md:py-2">
              <h1 className="flex-1 text-lg font-bold text-gray-800 md:mb-1 ">
                Home
              </h1>
              <MobileMenu />
            </div>
            {session.status === "authenticated" && (
              <div className="flex">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    className={` flex-grow p-2 text-gray-800 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                      tab === selectedTab
                        ? "border-b-4 border-b-blue-500 font-bold"
                        : ""
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </header>
          <NewTweetForm />
          {selectedTab === "Recent" ? <RecentTweets /> : <FollowingTweets />}
        </main>
        <FollowList />
      </section>
    </section>
  );
};

export default Home;
