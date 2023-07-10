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
import { getHighBeamLevelResult, randomNumber } from "@/lib/helpers";
import { HighBeamLevelSchema } from "@/lib/validations/highBeamLevel";
import { createNewHighBeamLevelAction } from "@/app/_actions/_highBeamLevelAction";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import LimitDescription from "./LimitDescription";

const HighBeamLevelCreateForm = ({ vehicleId }: { vehicleId: number }) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof HighBeamLevelSchema>>({
    resolver: zodResolver(HighBeamLevelSchema),
    defaultValues: {
      left: randomNumber(90, 170),
      right: randomNumber(90, 170),
      vehicleId: vehicleId,
      result: "PASS",
    },
  });
  function onSubmit(data: z.infer<typeof HighBeamLevelSchema>) {
    const result = getHighBeamLevelResult(data);
    startTransition(() => {
      createNewHighBeamLevelAction({ ...data, result }).then((data) => {
        const res = JSON.parse(data);
        if (res.newHighBeamLevel) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>HighBeam Result Added Successfully</ToastDesc>
            ),
          });
          //return router.push(`/results/${vehicleId}`);
          return router.back();
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Adding HighBeam Result!
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
          Add HighBeam Level Result
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
                  <TableCell className="font-medium">Left </TableCell>
                  <TableCell>
                    <LimitDescription limit="highBeam" />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="left"
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
                              placeholder="Left "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-end">
                    <Indicator value={form.watch("left")} test="highBeam" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Right </TableCell>
                  <TableCell>
                    <LimitDescription limit="highBeam" />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="right"
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
                              placeholder="Right "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-end">
                    <Indicator value={form.watch("right")} test="highBeam" />
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
                <span>Create</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HighBeamLevelCreateForm;
