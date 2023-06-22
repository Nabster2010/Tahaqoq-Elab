"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Icons } from "@/components/icons";
import { EmissionSchema } from "@/lib/validations/emission";
import { createNewEmissionAction } from "@/lib/serverActions/_emissionTestActions";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { testLimits } from "@/config/testConfig";
import Indicator from "./Indicator";
import { getEmissionResult } from "@/lib/helpers";
import BackButton from "./back-button";
import ToastDesc from "./ToastDesc";
import { Card, CardContent } from "./ui/card";

const EmissionCreateForm = ({
  vehicleId,
  fuelType,
}: {
  vehicleId: number;
  fuelType: string;
}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof EmissionSchema>>({
    resolver: zodResolver(EmissionSchema),
    defaultValues: {
      co: 0.0,
      diesel: 0.0,
      hc: 0.0,
      vehicleId: vehicleId,
      result: "PASS",
    },
  });
  function onSubmit(data: z.infer<typeof EmissionSchema>) {
    if (fuelType === "HYBIRD") {
      return toast({
        title: "HYBIRD Vehicles is not supported",
      });
    }
    const result = getEmissionResult(data, fuelType);
    startTransition(() => {
      createNewEmissionAction({ ...data, result }).then((res) => {
        if (res.newEmission) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Emission Result Added Successfully</ToastDesc>
            ),
          });
          form.reset();
          return router.push(`/results/${vehicleId}`);
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Adding Emission Result!
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
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="mt-8 mb-8 text-xl font-bold ">
                Add Emission results
              </h1>
              <Button
                disabled={isPending}
                className="w-full sm:w-auto"
                type="submit"
              >
                {isPending && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                <span>Add Result</span>
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">Test</TableHead>
                  <TableHead>Limit</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-right">Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fuelType === "PETROL" && (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">
                        Carbon Monoxide{" "}
                      </TableCell>
                      <TableCell> &le; {testLimits.co}</TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name="co"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl
                                onChange={(e) => {
                                  //@ts-ignore
                                  field.onChange(Number(e.target.value));
                                }}
                              >
                                <Input
                                  type={"number"}
                                  placeholder="co "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <Indicator
                          value={
                            form.watch("co")
                              ? form.watch("co") <= testLimits.co
                              : true
                          }
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Hydrocarbons{" "}
                      </TableCell>
                      <TableCell> &le; {testLimits.hc}</TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name="hc"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl
                                onChange={(e) =>
                                  //@ts-ignore
                                  field.onChange(Number(e.target.value))
                                }
                              >
                                <Input
                                  type={"number"}
                                  placeholder="hc "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <Indicator
                          value={
                            form.watch("hc")
                              ? form.watch("hc") <= testLimits.hc
                              : true
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </>
                )}
                {fuelType === "DIESEL" && (
                  <TableRow>
                    <TableCell className="font-medium">
                      Diesel Carbon Particles
                    </TableCell>
                    <TableCell> &le; {testLimits.diesel}</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="diesel"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl
                              onChange={(e) =>
                                //@ts-ignore
                                field.onChange(Number(e.target.value))
                              }
                            >
                              <Input
                                type={"number"}
                                placeholder="Diesel"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="">
                      <Indicator
                        value={
                          form.watch("diesel")
                            ? form.watch("diesel") <= testLimits.diesel
                            : true
                        }
                      />
                    </TableCell>
                  </TableRow>
                )}
                {fuelType === "HYBRID" && (
                  <TableRow>
                    <TableCell colSpan={4} className="font-medium text-center">
                      HYBRID Vehicles is not supported
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmissionCreateForm;
