"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Icons } from "@/components/icons";
import { ColorSchema } from "@/lib/validations/colors";
import { updateColorAction } from "@/app/_actions/_colorActions";
import { Color } from "@prisma/client";
import { useRouter } from "next/navigation";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const ColorUpdateForm = ({ color }: { color: Color }) => {
  const { data: session } = useSession();
  const isAdminUser = session?.user?.role === "admin";
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      color: color.color || "",
      description: color.description || "",
    },
  });
  function onSubmit(data: z.infer<typeof ColorSchema>) {
    startTransition(() => {
      updateColorAction(data, color.id).then((data) => {
        const res = JSON.parse(data);
        if (res.updatedColor) {
          toast({
            title: "Success",
            description: <ToastDesc>Color Updated Successfully</ToastDesc>,
          });
          return router.back();
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating Color!
              </ToastDesc>
            ),
          });
        }
      });
    });
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="my-4 underline underline-offset-4">
          Update Color
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-4">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color:</FormLabel>
                    <FormControl>
                      <Input placeholder="Color " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description :</FormLabel>
                    <FormControl>
                      <Input placeholder="Arabic Representation " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 md:flex-row md:justify-between"
              )}
            >
              <Button
                disabled={isPending}
                className={cn("w-full sm:w-auto", !isAdminUser && "ml-auto")}
                type="submit"
              >
                {isPending && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                <span>Update Color</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ColorUpdateForm;
