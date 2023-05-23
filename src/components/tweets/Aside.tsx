import { api } from "@/utils/api";
import React from "react";
import ProfileImage from "../ui/ProfileImage";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import CardContainer from "../ui/CardContainer";
import TrendsItem from "../ui/TrendsItem";

const ProfileSkeleton = dynamic(
  () => import("@/components/tweets/ProfileSkeleton")
);

function Aside() {
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
    <section className="hidden p-4 min-[900px]:block lg:w-80 xl:w-96">
      <CardContainer title="What's Happening " href="/">
        <TrendsItem category="Development" stat="2.3M" title="React" />
        <TrendsItem category="Development" stat="45.7K" title="NextJS 13" />
        <TrendsItem category="Football" stat="12M" title="Boca Juniors" />
      </CardContainer>
      <CardContainer title="People to follow" href="/">
        <section className="pt-2">
          {profileToFollow.map((user) => (
            <NextLink
              key={user.id}
              className="flex min-h-[5rem] w-full justify-between p-2"
              href={`/profiles/${user.id}`}
            >
              <div className="flex px-2">
                <ProfileImage src={user.image} className="h-12 w-12" />
                <div className="ml-4 flex flex-col ">
                  <h2 className="text-sm font-bold text-slate-900 ">
                    {user.name}
                  </h2>
                  <h2 className="text-xs font-medium text-slate-700">
                    @{user.name}
                  </h2>
                </div>
              </div>
              <div className="hidden pr-2 xl:flex">
                <p className="text-sm font-medium text-slate-700">
                  {user._count.followers} Followers
                </p>
              </div>
            </NextLink>
          ))}
        </section>
      </CardContainer>
    </section>
  );
}

export default Aside;
