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
import { getSideSlipResult } from "@/lib/helpers";
import { SideSlipSchema } from "@/lib/validations/sideSlip";
import { createNewSideSlipAction } from "@/lib/serverActions/_sideSlipAction";
import BackButton from "./back-button";
import ToastDesc from "./ToastDesc";
import { Card, CardContent } from "./ui/card";
import { Subtitles } from "lucide-react";
import SubTitle from "./SubTitle";
import LimitDescription from "./LimitDescription";

const SideSlipCreateForm = ({ vehicleId }: { vehicleId: number }) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SideSlipSchema>>({
    resolver: zodResolver(SideSlipSchema),
    defaultValues: {
      reading: 0,
      vehicleId: vehicleId,
      result: "PASS",
    },
  });
  function onSubmit(data: z.infer<typeof SideSlipSchema>) {
    const result = getSideSlipResult(data);
    startTransition(() => {
      createNewSideSlipAction({ ...data, result }).then((res) => {
        if (res.newSideSlip) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>SideSlip Result Added Successfully</ToastDesc>
            ),
          });
          return router.push(`/results/${vehicleId}`);
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Adding SideSlip Results!
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
              <SubTitle>Add SideSlip Result</SubTitle>
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
                  <TableCell className="font-medium">Reading </TableCell>
                  <TableCell>
                    <LimitDescription limit="sideSlip" />
                  </TableCell>
                  <TableCell className="px-0 md:px-3">
                    <FormField
                      control={form.control}
                      name="reading"
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
                              placeholder="Reading "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Indicator value={form.watch("reading")} test="sideSlip" />
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

export default SideSlipCreateForm;
