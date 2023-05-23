/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useCallback } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import type { GetServerSideProps } from "next";
import { Button } from "@/components/primitives/button";

function SignIn() {
  const signInWithGoogle = useCallback(async () => {
    await signIn("google");
  }, []);
  const signInWithGithub = useCallback(async () => {
    await signIn("github");
  }, []);
  const signInWithDiscord = useCallback(async () => {
    await signIn("discord");
  }, []);

  return (
    <section className="flex h-screen justify-center bg-slate-50">
      <div className="flex w-full flex-col items-center justify-center px-1 min-[425px]:max-w-2xl">
        <div className="min-h-min w-full space-y-4 rounded-md bg-white px-4 py-8 shadow min-[425px]:w-[25rem]">
          <h2 className="text-center text-3xl font-bold tracking-tighter text-black ">
            Sign in
          </h2>
          <p className="text-center text-xs text-gray-500">
            Sign in with one of this social media.
          </p>
          <section className="space-y-4">
            <Button
              className="flex w-full items-center justify-center gap-x-2 rounded-xl bg-slate-100 font-medium text-gray-600 hover:bg-slate-200"
              onClick={signInWithGoogle}
            >
              <FcGoogle size="22px" /> Sign in With Google
            </Button>
            <Button
              className="flex w-full items-center justify-center gap-x-2 rounded-xl bg-[#1D1D1B] font-medium text-gray-100 hover:bg-black"
              onClick={signInWithGithub}
            >
              <VscGithubInverted size="22px" /> Sign in With Github
            </Button>
            <Button
              className="flex w-full items-center justify-center gap-x-2 rounded-xl bg-[#7289DA] font-medium text-gray-100 hover:bg-[#6276be]"
              onClick={signInWithDiscord}
            >
              <FaDiscord size="22px" /> Sign in With Discord
            </Button>
          </section>
        </div>
      </div>
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  const { page = "/" } = ctx.query;

  if (session) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default SignIn;
