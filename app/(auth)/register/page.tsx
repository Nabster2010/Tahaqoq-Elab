import { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "@/components/signup-form";
import Logo from "@/components/Logo";
import SubTitle from "@/components/SubTitle";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for new account",
};

export default function RegisterPage() {
  return (
    <ContactAdmin />
    //remove Register Page and replace it with contact Admin
    // <div className="container flex flex-col items-center justify-center w-screen h-screen">
    //   <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    //     <div className="flex flex-col space-y-2 text-center">
    //       <Logo className="mx-auto" />
    //       <SubTitle className="pb-4 text-3xl ">TAHAQOQ</SubTitle>
    //       <h1 className="text-xl font-semibold tracking-tight">Welcome back</h1>
    //       <p className="font-semibold text-muted-foreground">Signup</p>
    //     </div>

    //     <SignUpForm />
    //     <p className="px-8 text-sm text-center text-muted-foreground">
    //       <Link
    //         href="/login"
    //         className="underline hover:text-brand underline-offset-4"
    //       >
    //         have an account? Login
    //       </Link>
    //     </p>
    //   </div>
    // </div>
  );
}

const ContactAdmin = () => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto space-y-8 text-center">
          <h1 className="font-extrabold tracking-tight text-7xl lg:text-9xl">
            404
          </h1>
          <p className="text-3xl font-bold tracking-tight md:text-4xl">
            Page is Not Available
          </p>
          <p className="text-lg font-light ">
            {" "}
            Sorry, this page is not available.To register, Please contact admin.
          </p>
          <Link href="/login" className={cn(buttonVariants())}>
            Back to Login Page
          </Link>
        </div>
      </div>
    </section>
  );
};
