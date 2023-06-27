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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { createNewCustomerAction } from "@/lib/serverActions/_customerActions";
import { Icons } from "@/components/icons";
import { CustomerSchema } from "@/lib/validations/customer";
import { useRouter } from "next/navigation";
import ToastDesc from "./ToastDesc";
import SubTitle from "./SubTitle";
import { stopPropagate } from "@/lib/helpers";
import { Customer } from "@prisma/client";

const CustomerCreateForm = ({
  name,
  cb,
}: {
  name: string;
  cb: (customer: Customer) => void;
}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CustomerSchema>>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: name,
      email: "",
      phone: "",
      website: "",
      address: "",
      taxId: "",
      customerType: "INDIVIDUAL",
    },
  });
  async function onSubmit(data: z.infer<typeof CustomerSchema>) {
    startTransition(() => {
      createNewCustomerAction(data).then((res) => {
        if (res.newCustomer) {
          toast({
            title: "Success",
            description: <ToastDesc>Customer Added Successfully</ToastDesc>,
          });
          cb(res.newCustomer);
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Adding Customer!
              </ToastDesc>
            ),
          });
        }
      });
    });
    form.reset();
    router.refresh();
  }
  return (
    <>
      <SubTitle className="my-4 underline underline-offset-4">
        Create New Customer
      </SubTitle>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={stopPropagate(form.handleSubmit(onSubmit))}
        >
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer name " {...field} />
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="optional">Customer Address:</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel variant="optional">Custom Website:</FormLabel>
                  <FormControl>
                    <Input placeholder=" Customer website" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Type:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Customer Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INDIVIDUAL">INDIVIDUAL</SelectItem>
                      <SelectItem value="COMPANY">COMPANY</SelectItem>
                    </SelectContent>
                  </Select>
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
              <span>Add Customer</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CustomerCreateForm;
