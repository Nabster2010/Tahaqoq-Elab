"use client";

import * as React from "react";
import { redirect, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { userAuthSchema } from "@/lib/validations/auth";
import ToastDesc from "./ToastDesc";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("from");
  const { data: session } = useSession();
  if (session) {
    redirect(callbackUrl || "/");
  }
  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);
      const signInResult = await signIn("credentials", {
        email: data.email.toLowerCase(),
        password: data.password,
        redirect: false,
        callbackUrl: callbackUrl || "/",
      });

      setIsLoading(false);
      if (!signInResult?.error) {
        return toast({
          title: "Success",
          description: (
            <ToastDesc>"You have successfully signed in."</ToastDesc>
          ),
        });
      }

      return toast({
        title: "Error:",
        description: (
          <ToastDesc error msg={signInResult.error}>
            Error signing in
          </ToastDesc>
        ),
        variant: "destructive",
      });
    } catch (error) {
      setIsLoading(false);
      return toast({
        title: "Error",
        description: (
          <ToastDesc error msg={error}>
            Something went wrong try again
          </ToastDesc>
        ),
        variant: "destructive",
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
