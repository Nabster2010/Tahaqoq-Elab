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
import { createNewBrakeTestAction } from "@/app/_actions/_brakeActions";
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
import { getBrakeTestResult, randomNumber } from "@/lib/helpers";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import LimitDescription from "./LimitDescription";

const BrakeCreateForm = ({ vehicleId }: { vehicleId: number }) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof BrakeSchema>>({
    resolver: zodResolver(BrakeSchema.omit({ vehicleId: true, result: true })),
    defaultValues: {
      front: 0,
      rear: 0,
      parking: 0,
      // front: randomNumber(65, 89),
      // rear: randomNumber(65, 89),
      // parking: randomNumber(20, 40),
    },
  });

  function onSubmit(data: z.infer<typeof BrakeSchema>) {
    const result = getBrakeTestResult(data);
    startTransition(() => {
      createNewBrakeTestAction({ ...data, result, vehicleId }).then((data) => {
        const res = JSON.parse(data);
        if (res.newBrakeTest) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Brake Results Added Successfully</ToastDesc>
            ),
          });
          form.reset();
          return router.back();
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Adding Brake Results!
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
          Add Brake Level results
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
                <TableRow>
                  <TableCell className="font-medium">Front Brake</TableCell>
                  <TableCell>
                    <LimitDescription limit="mainBrake" />
                  </TableCell>
                  <TableCell className="px-0 md:px-3">
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
                  <TableCell className="text-end">
                    <Indicator value={form.watch("front")} test="mainBrake" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rear Brake</TableCell>
                  <TableCell>
                    <LimitDescription limit="mainBrake" />
                  </TableCell>
                  <TableCell className="px-0 md:px-3">
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
                  <TableCell className="text-end">
                    <Indicator value={form.watch("rear")} test="mainBrake" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Parking Brake</TableCell>
                  <TableCell>
                    <LimitDescription limit="parkingBrake" />
                  </TableCell>
                  <TableCell className="px-0 md:px-3">
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
                  <TableCell className="text-end">
                    <Indicator
                      value={form.watch("parking")}
                      test="parkingBrake"
                    />
                  </TableCell>
                </TableRow>
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
                <span>Add Result</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BrakeCreateForm;
