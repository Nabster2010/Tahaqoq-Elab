"use client";
import { Color, VehicleInfo, VehicleType } from "@prisma/client";
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
import { useTransition } from "react";
import { Icons } from "@/components/icons";
import { VehicleInfoSchema } from "@/lib/validations/vehicleInfo";
import { updateVehicleInfoAction } from "@/lib/serverActions/_vehicleInfoActions";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type VehicleInfoUpdateFormProps = {
  colors: Color[];
  vehicleTypes: VehicleType[];
  vehicleInfo: VehicleInfo;
};
const VehicleInfoUpdateForm = ({
  colors,
  vehicleTypes,
  vehicleInfo,
}: VehicleInfoUpdateFormProps) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof VehicleInfoSchema>>({
    resolver: zodResolver(VehicleInfoSchema),
    defaultValues: {
      category: vehicleInfo.category,
      colorId: vehicleInfo.colorId,
      condition: vehicleInfo.condition,
      engine: vehicleInfo.engine || "",
      engineSize: vehicleInfo.engineSize || "",
      fuelType: vehicleInfo.fuelType,
      gear: vehicleInfo.gear || "AUTOMATIC",
      mileage: vehicleInfo.mileage,
      seats: vehicleInfo.seats,
      vehicleId: vehicleInfo.vehicleId,
      vehicleTypeId: vehicleInfo.vehicleTypeId,
      year: vehicleInfo.year,
      remarks: vehicleInfo.remarks || "",
    },
  });
  function onSubmit(data: z.infer<typeof VehicleInfoSchema>) {
    startTransition(() => {
      updateVehicleInfoAction(data).then((res) => {
        if (res.updatedVehicleInfo) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Vehicle Info Updated Successfully</ToastDesc>
            ),
          });

          return router.push(`/results/${vehicleInfo.vehicleId}`);
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating Vehicle Info !
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
          Update vehicleInfo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Year:</FormLabel>
                    <FormControl>
                      <Input placeholder="Year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mileage:</FormLabel>
                    <FormControl>
                      <Input placeholder="Mileage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. of Seats:</FormLabel>
                    <FormControl>
                      <Input placeholder="Seats" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.color}
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
                name="vehicleTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Model Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.modelType}
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
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Fuel Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {siteConfig.fuelTypes.map((type) => (
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {siteConfig.categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
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
                name="gear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gearbox</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select GearBox Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {siteConfig.gearTypes.map((type) => (
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
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition :</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {siteConfig.conditions.map((condition) => (
                          <SelectItem key={condition.id} value={condition.name}>
                            {condition.name}
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
                name="engine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel variant="optional">Engine:</FormLabel>
                    <FormControl>
                      <Input placeholder="Engine " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engineSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel variant="optional">Engine Size:</FormLabel>
                    <FormControl>
                      <Input placeholder="Engine Size " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Remarks...."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                disabled={isPending}
                className="w-full sm:w-auto"
                type="submit"
              >
                {isPending && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                <span>Update</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleInfoUpdateForm;
