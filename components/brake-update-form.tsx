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
import { BrakeSchema } from "@/lib/validations/brake";
import { updateBrakeTestAction } from "@/lib/serverActions/_brakeActions";
import { useRouter } from "next/navigation";
import { testLimits } from "@/config/testConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Indicator from "./Indicator";
import { getBrakeTestResult } from "@/lib/helpers";
import { Brake } from "@prisma/client";
import BackButton from "./back-button";
import ToastDesc from "./ToastDesc";
import { Card, CardContent } from "./ui/card";

const BrakeUpdateForm = ({ brakeTestResult }: { brakeTestResult: Brake }) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof BrakeSchema>>({
    resolver: zodResolver(BrakeSchema),
    defaultValues: {
      front: brakeTestResult.front,
      rear: brakeTestResult.rear,
      parking: brakeTestResult.parking,
      vehicleId: brakeTestResult.vehicleId,
    },
  });

  function onSubmit(data: z.infer<typeof BrakeSchema>) {
    const result = getBrakeTestResult(data);
    startTransition(() => {
      updateBrakeTestAction({ ...data, result }).then((res) => {
        if (res.updatedBrakeTest) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Brake Results Updated Successfully</ToastDesc>
            ),
          });

          return router.push(`/results/${brakeTestResult.vehicleId}`);
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating Brake Results!
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
                Update Brake Level results
              </h1>
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
            </div>{" "}
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
                <TableRow>
                  <TableCell className="font-medium">Front Brake</TableCell>
                  <TableCell> &ge; {testLimits.mainBrake}</TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="front"
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
                              placeholder="Front "
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
                        form.watch("front") >= testLimits.mainBrake
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rear Brake</TableCell>
                  <TableCell> &ge; {testLimits.mainBrake}</TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="rear"
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
                              placeholder="Rear "
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
                        form.watch("rear") >= testLimits.mainBrake
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Parking Brake</TableCell>
                  <TableCell> &ge; {testLimits.parkingBrake}</TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="parking"
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
                              placeholder="Parking"
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
                        form.watch("parking") >= testLimits.parkingBrake
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BrakeUpdateForm;
