"use client";
import { Broker, Customer, Vehicle } from "@prisma/client";
import { siteConfig } from "@/config/site";
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
import { VehicleSchema } from "@/lib/validations/vehicle";
import { useTransition } from "react";
import { Icons } from "@/components/icons";
import { arabicDateFormat, slugify } from "@/lib/helpers";
import { updateVehicleAction } from "@/app/_actions/_vehicleActions";
import CustomerSelectComboBox from "./select-customer-comboBox";
import { useRouter } from "next/navigation";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ports } from "@/config/ports";

type VehicleUpdateFormProps = {
  customers: Customer[];
  brokers: Broker[];
  vehicle: Vehicle;
};
const VehicleUpdateForm = ({
  customers,
  vehicle,
  brokers,
}: VehicleUpdateFormProps) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof VehicleSchema>>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      vin: vehicle.vin || "",
      reqNo: vehicle.reqNo || "",
      reqDate: vehicle.reqDate || "",
      bayanNo: vehicle.bayanNo || "",
      bayanDate: vehicle.bayanDate || "",
      port: vehicle.port || "",
      paymentType: vehicle.paymentType || "",
      price: vehicle.price || 300,
      tax: vehicle.tax || 45,
      customerId: vehicle.customerId!,
      brokerId: vehicle.brokerId || "",
    },
  });
  function onSubmit(data: z.infer<typeof VehicleSchema>) {
    startTransition(() => {
      updateVehicleAction(data, vehicle.id).then((data) => {
        const res = JSON.parse(data);
        if (res.updatedVehicle) {
          toast({
            title: "Success",
            description: <ToastDesc>Vehicle Updated Successfully</ToastDesc>,
          });
          return router.back();
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc
                error
                msg={
                  res.error && res.error?.code === "P2002"
                    ? "Vin Already Exist"
                    : null
                }
              >
                Error Updating Vehicle!
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
          Update Vehicle - {slugify(vehicle.id)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="mb-4 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Customer</FormLabel>

                    <FormControl>
                      <CustomerSelectComboBox
                        field={field}
                        customers={customers}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chassis No:</FormLabel>
                    <FormControl>
                      <Input placeholder="Chassis No " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reqNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request No:</FormLabel>
                    <FormControl>
                      <Input placeholder="Request No " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reqDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Date:</FormLabel>
                    <FormControl>
                      <Input
                        type={"date"}
                        placeholder="Request Date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bayanNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Declaration No:</FormLabel>
                    <FormControl>
                      <Input placeholder="Bayan No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bayanDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Declaration Date:</FormLabel>

                    <FormControl>
                      <Input
                        type={"date"}
                        placeholder="Bayan Date"
                        {...field}
                      />
                    </FormControl>
                    <div className="text-sm text-muted-foreground">
                      Hijri Date:{" "}
                      <span className="">
                        {arabicDateFormat(new Date(field.value))}
                      </span>{" "}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Port</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Port" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ports.map((port) => (
                          <SelectItem key={port.id} value={port.description}>
                            {port.name}
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
                name="brokerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel variant={"optional"}>Broker:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Broker" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brokers.map((broker) => (
                          <SelectItem key={broker.id} value={broker.id}>
                            {broker.name}
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
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Payment Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {siteConfig.paymentMethods.map((type) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price:</FormLabel>
                    <FormControl
                      onChange={(e: any) =>
                        field.onChange(Number(e.target.value))
                      }
                    >
                      <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vat Amount:</FormLabel>
                    <FormControl
                      onChange={(e: any) =>
                        field.onChange(Number(e.target.value))
                      }
                    >
                      <Input
                        type="number"
                        placeholder="Vat Amount"
                        {...field}
                      />
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
                <span>Update Vehicle</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleUpdateForm;
