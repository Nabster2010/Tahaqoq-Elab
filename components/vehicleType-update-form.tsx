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
import { VehicleTypeSchema } from "@/lib/validations/vehicleType";
import { VehicleManufacturer, VehicleType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateVehicleTypeAction } from "@/lib/serverActions/_vehicleTypeActions";
import { useRouter } from "next/navigation";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const VehicleTypeUpdateForm = ({
  manufacturers,
  vehicleType,
}: {
  manufacturers: VehicleManufacturer[];
  vehicleType: VehicleType;
}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof VehicleTypeSchema>>({
    resolver: zodResolver(VehicleTypeSchema),
    defaultValues: {
      manufacturerId: vehicleType.manufacturerId || "",
      modelType: vehicleType.modelType || "",
      description: vehicleType.description || "",
    },
  });
  function onSubmit(data: z.infer<typeof VehicleTypeSchema>) {
    startTransition(() => {
      updateVehicleTypeAction(data, vehicleType.id).then((res) => {
        if (res.updatedVehicleType) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Vehicle Type Updated Successfully</ToastDesc>
            ),
          });

          return router.push(`/vehicleTypes`);
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating Vehicle Type !
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
        <CardTitle className="underline underline-offset-4">
          Update Vehicle Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
              <FormField
                control={form.control}
                name="manufacturerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Manufacturer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {manufacturers.map((manufacturer) => (
                          <SelectItem
                            key={manufacturer.id}
                            value={manufacturer.id}
                          >
                            {manufacturer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Type:</FormLabel>
                    <FormControl>
                      <Input placeholder="Model Type " {...field} />
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
                    <FormLabel>Model Type Description:</FormLabel>
                    <FormControl>
                      <Input placeholder="Arabic Representation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isPending}
              className="w-full sm:w-auto"
              type="submit"
            >
              {isPending && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              <span>Update Type</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleTypeUpdateForm;
