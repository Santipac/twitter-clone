import { api } from "@/utils/api";
import React from "react";
import ProfileImage from "../ui/ProfileImage";
import NextLink from "next/link";
import { useSession } from "next-auth/react";

function FollowList() {
  const { data: session } = useSession();
  const { data: profiles, isLoading } = api.profile.getAll.useQuery();
  if (isLoading)
    return (
      <section className="sticky top-0 col-start-10 col-end-13 hidden py-4 md:block">
        <h2 className="pl-4 text-lg font-bold tracking-tight text-gray-600">
          People to follow
        </h2>
        <section className="mt-3 border-t ">
          <ProfileSkeleton /> <ProfileSkeleton /> <ProfileSkeleton />
        </section>
      </section>
    );
  if (!profiles)
    return (
      <p className="text-md text-center font-medium text-gray-400">
        No Users to Follow
      </p>
    );
  const profileToFollow = profiles.filter(
    (profile) => profile.id !== session?.user.id
  );
  return (
    <section className="sticky top-0 col-start-10 col-end-13 hidden py-4 md:block">
      <h2 className="pl-4 text-lg font-bold tracking-tight text-gray-600">
        People to follow
      </h2>
      <section className="mt-3 border-t ">
        {profileToFollow.map((user) => (
          <article
            key={user.id}
            className="flex min-h-[5rem] w-full justify-between border-b p-2"
          >
            <NextLink className="flex px-2" href={`/profiles/${user.id}`}>
              <ProfileImage src={user.image} className="h-12 w-12" />
              <div className="ml-4 flex flex-col space-y-1">
                <h2 className="text-md  font-medium text-gray-600">
                  {user.name}
                </h2>
                <p className="text-xs font-medium text-gray-600">
                  {user._count.followers} Followers
                </p>
                <p className="text-xs font-medium text-gray-600">
                  {user._count.tweets} Tweets
                </p>
              </div>
            </NextLink>
          </article>
        ))}
      </section>
    </section>
  );
}

function ProfileSkeleton() {
  return (
    <div>
      <div className="flex min-h-[5rem] w-full justify-between border-b p-2">
        <div className="flex px-2">
          <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
          <div className="ml-4 flex flex-col space-y-1">
            <div className="h-3 w-40 animate-pulse  rounded-full bg-gray-200" />
            <div className="h-2 w-14 animate-pulse  rounded-full bg-gray-200" />
            <div className="h-2 w-14 animate-pulse  rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowList;
