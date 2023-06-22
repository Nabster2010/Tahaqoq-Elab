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
import { testLimits } from "@/config/testConfig";
import Indicator from "./Indicator";
import { getSuspensionResult } from "@/lib/helpers";
import { Suspension } from "@prisma/client";
import { SuspensionSchema } from "@/lib/validations/suspension";
import { updateSuspensionAction } from "@/lib/serverActions/_suspensionActions";
import BackButton from "./back-button";
import ToastDesc from "./ToastDesc";
import { Card, CardContent } from "./ui/card";

const SuspensionUpdateForm = ({
  suspensionResult,
}: {
  suspensionResult: Suspension;
}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SuspensionSchema>>({
    resolver: zodResolver(SuspensionSchema),
    defaultValues: {
      fl: suspensionResult.fl || 0,
      fr: suspensionResult.fr || 0,
      rl: suspensionResult.rl || 0,
      rr: suspensionResult.rr || 0,
      vehicleId: suspensionResult.vehicleId,
      result: suspensionResult.result || "PASS",
    },
  });
  function onSubmit(data: z.infer<typeof SuspensionSchema>) {
    const result = getSuspensionResult(data);
    startTransition(() => {
      updateSuspensionAction({ ...data, result }).then((res) => {
        if (res.updatedSuspension) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>Suspension Result Updated Successfully</ToastDesc>
            ),
          });
          return router.push(`/results/${suspensionResult.vehicleId}`);
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating Suspension Results!
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
                Update Suspension Level results
              </h1>
              <Button
                disabled={isPending}
                className="w-full sm:w-auto"
                type="submit"
              >
                {isPending && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                <span>Update Result</span>
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
                  <TableCell className="font-medium">Front Right </TableCell>
                  <TableCell> &ge; {testLimits.frontSuspension}</TableCell>
                  <TableCell>
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
                  <TableCell className="flex justify-end">
                    <Indicator
                      value={
                        form.watch("fr") >= testLimits.frontSuspension
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Front Left </TableCell>
                  <TableCell> &ge; {testLimits.frontSuspension}</TableCell>
                  <TableCell>
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
                  <TableCell className="flex justify-end">
                    <Indicator
                      value={
                        form.watch("fl") >= testLimits.frontSuspension
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rear Right </TableCell>
                  <TableCell> &ge; {testLimits.rearSuspension}</TableCell>
                  <TableCell>
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
                  <TableCell className="flex justify-end">
                    <Indicator
                      value={
                        form.watch("rr") >= testLimits.rearSuspension
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rear Left </TableCell>
                  <TableCell> &le; {testLimits.rearSuspension}</TableCell>
                  <TableCell>
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
                  <TableCell className="flex justify-end">
                    <Indicator
                      value={
                        form.watch("rl") >= testLimits.rearSuspension
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

export default SuspensionUpdateForm;
