import React from "react";
import { ssgHelper } from "@/server/api/ssgHelper";
import { api } from "@/utils/api";
import Head from "next/head";
import ErrorPage from "next/error";
import type { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import { getPlural } from "@/helpers";
import FollowButton from "@/components/tweets/FollowButton";
import InfiniteTweetsList from "@/components/tweets/InfiniteTweetsList";
import { PageLayout } from "@/components/layout/PageLayout";
import Image from "next/image";
import MobileMenu from "@/components/ui/MobileMenu";
interface Props {
  id: string;
}
const ProfileUserPage: NextPage<Props> = ({ id }) => {
  const { data: profile } = api.profile.getById.useQuery({ id });
  const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery(
    { userId: id },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  const trpcUtils = api.useContext();
  const toggleFollow = api.profile.toggleFollow.useMutation({
    onSuccess: ({ addedFollow }) => {
      trpcUtils.profile.getById.setData({ id }, (oldData) => {
        if (oldData == null) return;

        const countModifier = addedFollow ? 1 : -1;
        return {
          ...oldData,
          isFollowing: addedFollow,
          followersCount: oldData.followersCount + countModifier,
        };
      });
    },
  });
  if (profile == null || profile.name == null)
    return <ErrorPage statusCode={404} />;
  return (
    <section className="flex min-h-screen justify-center bg-white">
      <Head>
        <title>{`Socialize App Profile for ${profile.name}`}</title>
      </Head>
      <PageLayout>
        <section className="flex flex-1 flex-col border-x">
          <header className="sticky top-0 z-10 flex flex-col space-y-2 border-b bg-white">
            <div className="flex h-[6rem] w-full justify-end bg-slate-200">
              <MobileMenu />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={profile.image ?? ""}
                alt={`Profile Avatar for ${profile.name}`}
                width={80}
                height={80}
                className="-mt-12 rounded-full shadow-md"
              />
              <h2 className="text-lg font-bold">{profile.name}</h2>
            </div>
            <div className="flex justify-center gap-2">
              <p className="font-regular text-sm text-gray-500">
                {profile.followersCount}{" "}
                {getPlural(profile.followersCount, "Follower", "Followers")}
              </p>
              ·
              <p className="font-regular text-sm text-gray-500">
                {profile.followsCount} Following
              </p>
              ·
              <p className="font-regular text-sm text-gray-500">
                {profile.tweetsCount}{" "}
                {getPlural(profile.tweetsCount, "Tweet", "Tweets")}
              </p>
            </div>

            <div className="flex justify-center pb-4">
              <FollowButton
                isFollowing={profile.isFollowing}
                isLoading={toggleFollow.isLoading}
                userId={id}
                onClick={() => toggleFollow.mutate({ userId: id })}
              />
            </div>
          </header>
          <main>
            <InfiniteTweetsList
              tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
              isError={tweets.isError}
              isLoading={tweets.isLoading}
              hasNextPage={tweets.hasNextPage}
              fetchNewTweets={tweets.fetchNextPage}
            />
          </main>
        </section>
      </PageLayout>
    </section>
  );
};

/*
  

*/

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context.params?.id;

  if (id == null) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const ssg = ssgHelper();
  await ssg.profile.getById.prefetch({ id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default ProfileUserPage;
