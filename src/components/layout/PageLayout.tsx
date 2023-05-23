import dynamic from "next/dynamic";
import React from "react";

const SideNav = dynamic(() => import("@/components/ui/SideNav"), {
  loading: () => <></>,
});
const Aside = dynamic(() => import("@/components/tweets/Aside"), {
  loading: () => <></>,
});

export const PageLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <section className="flex w-full justify-center md:max-w-7xl">
      <SideNav />
      {children}
      <Aside />
    </section>
  );
};
