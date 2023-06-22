import { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "@/components/signup-form";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function RegisterPage() {
  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo className="mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">Signup</p>
        </div>
        <SignUpForm />
        <p className="px-8 text-sm text-center text-muted-foreground">
          <Link
            href="/login"
            className="underline hover:text-brand underline-offset-4"
          >
            have an account? Login
          </Link>
        </p>
      </div>
    </div>
  );
}
