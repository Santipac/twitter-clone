import { type NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SkeletonTweet from "@/components/tweets/SkeletonTweet";
import { PageLayout } from "@/components/layout/PageLayout";
import favicon from "../../public/favicon.png";
const MobileMenu = dynamic(() => import("@/components/ui/MobileMenu"), {
  loading: () => <></>,
  ssr: false,
});
const NewTweetForm = dynamic(() => import("@/components/tweets/NewTweetForm"), {
  loading: () => <></>,
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

const TABS = ["Recent", "Following"] as const;
const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");
  const session = useSession();
  return (
    <section className="flex justify-center bg-white">
      <Head>
        <title>Twitter UI Clone</title>
        <meta name="description" content="Application created with T3 Stack" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <PageLayout>
        <main className=" min-h-screen flex-1 border-x">
          <header className="sticky top-0 z-10 border-b bg-white pt-2">
            <div className="flex w-full items-center px-4 py-4 md:py-2">
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
      </PageLayout>
    </section>
  );
};

export default Home;
