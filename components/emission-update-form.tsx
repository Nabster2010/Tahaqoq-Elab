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
import { updateEmissionAction } from "@/lib/serverActions/_emissionTestActions";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Indicator from "./Indicator";
import { getEmissionResult } from "@/lib/helpers";
import { Emission } from "@prisma/client";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import LimitDescription from "./LimitDescription";

const EmissionUpdateForm = ({
  emissionResult,
  fuelType,
}: {
  emissionResult: Emission;
  fuelType: string;
}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof EmissionSchema>>({
    resolver: zodResolver(EmissionSchema),
    defaultValues: {
      co: fuelType === "PETROL" ? emissionResult.co! : 0.0,
      hc: fuelType === "PETROL" ? emissionResult.hc! : 0.0,
      diesel: fuelType === "DIESEL" ? emissionResult.diesel! : 0.0,
      vehicleId: emissionResult.vehicleId,
      result: emissionResult.result || "PASS",
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
      updateEmissionAction({ ...data, result }).then((res) => {
        if (res.updatedEmission) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Emission Result Updated Successfully</ToastDesc>
            ),
          });
          return router.back();
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating Emission Result!
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
          Update Emission Result
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Test</TableHead>
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
                        Carbon Monoxide
                      </TableCell>
                      <TableCell>
                        <LimitDescription limit="co" />
                      </TableCell>
                      <TableCell className="px-0 md:px-3">
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
                      <TableCell className="text-end">
                        <Indicator value={form.watch("co")} test="co" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Hydrocarbons
                      </TableCell>
                      <TableCell>
                        <LimitDescription limit="hc" />
                      </TableCell>
                      <TableCell className="px-0 md:px-3">
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
                      <TableCell className="text-end">
                        <Indicator value={form.watch("hc")} test="hc" />
                      </TableCell>
                    </TableRow>
                  </>
                )}
                {fuelType === "DIESEL" && (
                  <TableRow>
                    <TableCell className="font-medium">
                      Diesel Carbon Particles
                    </TableCell>
                    <TableCell>
                      <LimitDescription limit="diesel" />
                    </TableCell>
                    <TableCell className="px-0 md:px-3">
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
                      <Indicator value={form.watch("diesel")} test="diesel" />
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

export default EmissionUpdateForm;
