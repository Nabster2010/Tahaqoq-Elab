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
import { getSuspensionResult, randomNumber } from "@/lib/helpers";
import { SuspensionSchema } from "@/lib/validations/suspension";
import { createNewSuspensionAction } from "@/app/_actions/_suspensionActions";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import LimitDescription from "./LimitDescription";

const SuspensionCreateForm = ({ vehicleId }: { vehicleId: number }) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SuspensionSchema>>({
    resolver: zodResolver(SuspensionSchema),
    defaultValues: {
      fl: randomNumber(60, 89),
      fr: randomNumber(60, 89),
      rl: randomNumber(50, 80),
      rr: randomNumber(50, 80),
      vehicleId: vehicleId,
      result: "PASS",
    },
  });
  function onSubmit(data: z.infer<typeof SuspensionSchema>) {
    const result = getSuspensionResult(data);
    startTransition(() => {
      createNewSuspensionAction({ ...data, result }).then((data) => {
        const res = JSON.parse(data);
        if (res.newSuspension) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Suspension Result Added Successfully</ToastDesc>
            ),
          });
          // return router.push(`/results/${vehicleId}`);
          return router.back();
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Adding Suspension Results!
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
          Add Suspension Level results
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
                  <TableCell className="font-medium">Front Right </TableCell>
                  <TableCell>
                    <LimitDescription limit="frontSuspension" />
                  </TableCell>
                  <TableCell className="px-0 md:px-3">
                    <FormField
                      control={form.control}
                      name="fr"
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
                              placeholder="Front Right "
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
                      value={form.watch("fr")}
                      test="frontSuspension"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Front Left </TableCell>
                  <TableCell>
                    <LimitDescription limit="frontSuspension" />
                  </TableCell>
                  <TableCell className="px-0 md:px-3">
                    <FormField
                      control={form.control}
                      name="fl"
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
                              placeholder="Front Left "
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
                      value={form.watch("fl")}
                      test="frontSuspension"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rear Right </TableCell>
                  <TableCell>
                    {" "}
                    <LimitDescription limit="rearSuspension" />
                  </TableCell>
                  <TableCell className="px-0 md:px-3">
                    <FormField
                      control={form.control}
                      name="rr"
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
                              placeholder="Rear Right "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-end">
                    <Indicator value={form.watch("rr")} test="rearSuspension" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rear Left </TableCell>
                  <TableCell>
                    <LimitDescription limit="rearSuspension" />
                  </TableCell>
                  <TableCell className="px-0 md:px-3">
                    <FormField
                      control={form.control}
                      name="rl"
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
                              placeholder="Rear Left "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-end">
                    <Indicator value={form.watch("rl")} test="rearSuspension" />
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

export default SuspensionCreateForm;
