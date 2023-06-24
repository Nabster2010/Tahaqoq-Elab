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
import { getHighBeamLevelResult } from "@/lib/helpers";
import { HighBeamLevelSchema } from "@/lib/validations/highBeamLevel";
import { createNewHighBeamLevelAction } from "@/lib/serverActions/_highBeamLevelAction";
import BackButton from "./back-button";
import ToastDesc from "./ToastDesc";
import { Card, CardContent } from "./ui/card";
import SubTitle from "./SubTitle";
import LimitDescription from "./LimitDescription";

const HighBeamLevelCreateForm = ({ vehicleId }: { vehicleId: number }) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof HighBeamLevelSchema>>({
    resolver: zodResolver(HighBeamLevelSchema),
    defaultValues: {
      left: 0,
      right: 0,
      level: 0,
      vehicleId: vehicleId,
      result: "PASS",
    },
  });
  function onSubmit(data: z.infer<typeof HighBeamLevelSchema>) {
    const result = getHighBeamLevelResult(data);
    startTransition(() => {
      createNewHighBeamLevelAction({ ...data, result }).then((res) => {
        if (res.newHighBeamLevel) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>HighBeam Result Added Successfully</ToastDesc>
            ),
          });
          return router.push(`/results/${vehicleId}`);
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
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <SubTitle>Add HighBeam Level Result</SubTitle>
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
            </div>{" "}
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
                  <TableCell className="flex justify-end">
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
                  <TableCell className="flex justify-end">
                    <Indicator value={form.watch("right")} test="highBeam" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Level</TableCell>
                  <TableCell>
                    <LimitDescription limit="highBeam" />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="level"
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
                              placeholder="Level"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Indicator value={form.watch("level")} test="highBeam" />
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

export default HighBeamLevelCreateForm;
