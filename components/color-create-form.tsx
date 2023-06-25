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
import { createNewColorAction } from "@/lib/serverActions/_colorActions";
import { useRouter } from "next/navigation";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ColorCreateForm = () => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      color: "",
      description: "",
    },
  });
  function onSubmit(data: z.infer<typeof ColorSchema>) {
    startTransition(() => {
      createNewColorAction(data).then((res) => {
        if (res.newColor) {
          toast({
            title: "Success",
            description: <ToastDesc>Color Added Successfully</ToastDesc>,
          });
          form.reset();
          return router.push("/colors");
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Adding Color!
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
          Create New Color
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
            <div className="flex justify-end">
              <Button
                disabled={isPending}
                className="w-full sm:w-auto"
                type="submit"
              >
                {isPending && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                <span>Add Color</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ColorCreateForm;
