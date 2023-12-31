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
import { getHighBeamLevelResult } from "@/lib/helpers";
import { HighBeamLevel } from "@prisma/client";
import { HighBeamLevelSchema } from "@/lib/validations/highBeamLevel";
import { updateHighBeamLevelAction } from "@/app/_actions/_highBeamLevelAction";
import ToastDesc from "./ToastDesc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import LimitDescription from "./LimitDescription";

const HighBeamLevelUpdateForm = ({
  highBeamLevelResult,
}: {
  highBeamLevelResult: HighBeamLevel;
}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof HighBeamLevelSchema>>({
    resolver: zodResolver(HighBeamLevelSchema),
    defaultValues: {
      left: highBeamLevelResult.left || 0,
      right: highBeamLevelResult.right || 0,
      vehicleId: highBeamLevelResult.vehicleId,
      result: highBeamLevelResult.result || "PASS",
    },
  });
  function onSubmit(data: z.infer<typeof HighBeamLevelSchema>) {
    const result = getHighBeamLevelResult(data);

    startTransition(() => {
      updateHighBeamLevelAction({ ...data, result }).then((data) => {
        const res = JSON.parse(data);
        if (res.updatedHighBeamLevel) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>HighBeam Result Updated Successfully</ToastDesc>
            ),
          });
          // return router.push(`/results/${highBeamLevelResult.vehicleId}`);
          return router.back();
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating HighBeam Result!
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
          Update HighBeam Level Result
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
                <span>Update</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HighBeamLevelUpdateForm;
