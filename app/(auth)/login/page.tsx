import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/components/login-form";
import Logo from "@/components/Logo";
import SubTitle from "@/components/SubTitle";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <section className="container flex flex-col items-center justify-center w-screen h-screen">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo className="mx-auto" />
          <SubTitle className="pb-4 text-3xl ">TAHAQOQ</SubTitle>
          <h1 className="text-xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-sm text-center text-muted-foreground">
          <Link
            href="/register"
            className="underline hover:text-brand underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
