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
import { ManufacturerSchema } from "@/lib/validations/manufacturer";
import { updateManufacturerAction } from "@/lib/serverActions/_manufacturerActions";
import { VehicleManufacturer } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countries } from "@/config/countries";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ManufacturerUpdateForm = ({
  manufacturer,
}: {
  manufacturer: VehicleManufacturer;
}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ManufacturerSchema>>({
    resolver: zodResolver(ManufacturerSchema),
    defaultValues: {
      name: manufacturer.name || "",
      description: manufacturer.description || "",
      country: manufacturer.country || "",
    },
  });
  function onSubmit(data: z.infer<typeof ManufacturerSchema>) {
    startTransition(() => {
      updateManufacturerAction(data, manufacturer.id).then((res) => {
        if (res.updatedManufacturer) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Manufacturer Updated Successfully</ToastDesc>
            ),
          });
          return router.back();
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating Manufacturer!
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
          Update Manufacturer
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
                    <FormLabel>Manufacturer:</FormLabel>
                    <FormControl>
                      <Input placeholder="Manufacturer " {...field} />
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
                    <FormLabel>Manufacturer Description:</FormLabel>
                    <FormControl>
                      <Input placeholder="Arabic Representation " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="overflow-auto h-60">
                        {countries.map((country) => (
                          <SelectItem
                            key={country.id}
                            value={country.description}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
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
                <span>Update Manufacturer</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ManufacturerUpdateForm;
