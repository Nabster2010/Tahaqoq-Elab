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
import { createNewBrokerAction } from "@/app/_actions/_brokerActions";
import { Icons } from "@/components/icons";
import { BrokerSchema } from "@/lib/validations/broker";
import { useRouter } from "next/navigation";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const BrokerCreateForm = () => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof BrokerSchema>>({
    resolver: zodResolver(BrokerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      percentage: 0,
    },
  });
  function onSubmit(data: z.infer<typeof BrokerSchema>) {
    startTransition(() => {
      createNewBrokerAction(data).then((data) => {
        const res = JSON.parse(data);
        if (res.newBroker) {
          toast({
            title: "Success",
            description: <ToastDesc>Broker Added Successfully</ToastDesc>,
          });
          form.reset();
          return router.push("/brokers");
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc
                error
                msg={
                  res.error && res.error?.code === "P2002"
                    ? "Broker Name Already Exists"
                    : null
                }
              >
                Error Adding Broker!
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
          Create New Broker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Broker Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="Broker name " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel variant="optional">Phone No:</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone No " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel variant="optional">Email :</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel variant="optional">Broker Percentage:</FormLabel>
                    <FormControl
                      onChange={(e) =>
                        //@ts-ignore
                        field.onChange(Number(e.target.value))
                      }
                    >
                      <Input placeholder=" Broker percentage" {...field} />
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
                <span>Add Broker</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BrokerCreateForm;
