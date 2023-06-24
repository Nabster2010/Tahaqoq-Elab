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
import { Fragment, useTransition } from "react";
import { Icons } from "@/components/icons";
import {
  categorizedVisualInspectionData,
  visualInspectionData,
} from "@/config/visualInspectionConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { VisualInspectionSchema } from "@/lib/validations/visualInspection";
import { updateVisualInspectionAction } from "@/lib/serverActions/_visualInspectionActions";
import { VisualInspection } from "@prisma/client";
import { transferObjects } from "@/lib/helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import BackButton from "./back-button";
import ToastDesc from "./ToastDesc";
import SubTitle from "./SubTitle";

const VisualInspectionUpateForm = ({
  visualInspectionResult,
}: {
  visualInspectionResult: VisualInspection;
}) => {
  const defaultValues = transferObjects(
    visualInspectionData,
    visualInspectionResult
  );
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof VisualInspectionSchema>>({
    resolver: zodResolver(VisualInspectionSchema),
    defaultValues: {
      ...defaultValues,
      vehicleId: visualInspectionResult.vehicleId,
    },
  });
  function onSubmit(data: z.infer<typeof VisualInspectionSchema>) {
    startTransition(() => {
      updateVisualInspectionAction(data).then((res) => {
        if (res.updatedVisualInspection) {
          toast({
            title: "Success",
            description: (
              <ToastDesc>
                Visual Inspection Results Updated Successfully
              </ToastDesc>
            ),
          });

          return router.push(`/results/${visualInspectionResult.vehicleId}`);
        } else {
          toast({
            variant: "destructive",
            title: "Error ",
            description: (
              <ToastDesc error msg={res.error}>
                Error Updating Visual Inspection Result !
              </ToastDesc>
            ),
          });
        }
      });
    });
    router.refresh();
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <SubTitle>Update Visual Inspection test results</SubTitle>

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
        </div>
        <Tabs defaultValue="exteriorInspection" className="w-full">
          <TabsList className="grid w-full h-auto grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-y-1 gap-x-2">
            <TabsTrigger value="exteriorInspection">
              Exterior Inspection
            </TabsTrigger>
            <TabsTrigger value="interiorInspection">
              Interior Inspection
            </TabsTrigger>
            <TabsTrigger value="saftyRequirements">
              Safty Requirements
            </TabsTrigger>
            <TabsTrigger value="modernSystems">Modern Systems</TabsTrigger>
            <TabsTrigger value="fuelEconomy">Fuel Economy</TabsTrigger>
            <TabsTrigger value="otherRequierments">
              Other Requierments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="exteriorInspection">
            <Card>
              <CardHeader>
                <CardTitle className="w-full py-2 my-8 text-2xl font-bold text-center rounded-md bg-border">
                  Exterior Inspection
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-20 md:table-cell">
                        Standard
                      </TableHead>
                      <TableHead className="hidden w-20 md:table-cell">
                        Item
                      </TableHead>
                      <TableHead>Technical Requirements</TableHead>
                      <TableHead className="w-16 ">Result</TableHead>
                      <TableHead className="w-8 ">More</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorizedVisualInspectionData.exteriorInspection.map(
                      (item) => (
                        <Fragment key={item.name}>
                          <TableRow key={item.name}>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.standard}
                            </TableCell>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.item}
                            </TableCell>
                            <TableCell className={cn("capitalize")}>
                              {item.technicalRequirements}
                            </TableCell>
                            <TableCell className={cn()}>
                              <FormField
                                key={item.name}
                                control={form.control}
                                //@ts-ignore
                                name={item.name as string}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value as string}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue
                                            placeholder={item.placeholder}
                                          />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value={"PASS"}>
                                          PASS
                                        </SelectItem>
                                        <SelectItem value={"FAIL"}>
                                          FAIL
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell />
                          </TableRow>
                          {item.itemsToCheck &&
                            item.itemsToCheck.length > 0 && (
                              <TableRow className="relative border-none">
                                <TableCell colSpan={5} className="p-0 m-0">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem
                                      value={item.name}
                                      className="border-b-0"
                                    >
                                      <AccordionTrigger className="absolute p-0 right-4 -top-12 " />

                                      <AccordionContent className="p-4 pl-8">
                                        <ul className="space-y-2 ">
                                          {item.itemsToCheck?.map((item) => (
                                            <li
                                              key={item.id}
                                              className="text-muted-foreground"
                                            >
                                              <span className="font-medium ">
                                                {item.no}:
                                              </span>
                                              {"  "}
                                              <span className="">
                                                {item.description}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </TableCell>
                              </TableRow>
                            )}
                        </Fragment>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="interiorInspection">
            <Card>
              <CardHeader>
                <CardTitle className="w-full py-2 my-8 text-2xl font-bold text-center rounded-md bg-border">
                  Interior Inspection
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-20 md:table-cell">
                        Standard
                      </TableHead>
                      <TableHead className="hidden w-20 md:table-cell">
                        Item
                      </TableHead>
                      <TableHead>Technical Requirements</TableHead>
                      <TableHead className="w-16">Result</TableHead>
                      <TableHead className="w-8">More</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorizedVisualInspectionData.interiorInspection.map(
                      (item) => (
                        <Fragment key={item.name}>
                          <TableRow key={item.name}>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.standard}
                            </TableCell>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.item}
                            </TableCell>
                            <TableCell className={cn("capitalize")}>
                              {item.technicalRequirements}
                            </TableCell>
                            <TableCell className={cn()}>
                              <FormField
                                key={item.name}
                                control={form.control}
                                //@ts-ignore
                                name={item.name as string}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value as string}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue
                                            placeholder={item.placeholder}
                                          />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value={"PASS"}>
                                          PASS
                                        </SelectItem>
                                        <SelectItem value={"FAIL"}>
                                          FAIL
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell />
                          </TableRow>
                          {item.itemsToCheck &&
                            item.itemsToCheck.length > 0 && (
                              <TableRow className="relative border-none">
                                <TableCell colSpan={5} className="p-0 m-0">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem
                                      value={item.name}
                                      className="border-b-0"
                                    >
                                      <AccordionTrigger className="absolute p-0 right-4 -top-12 " />

                                      <AccordionContent className="p-4 pl-8">
                                        <ul className="space-y-2 ">
                                          {item.itemsToCheck?.map((item) => (
                                            <li
                                              key={item.id}
                                              className="text-muted-foreground"
                                            >
                                              <span className="font-medium ">
                                                {item.no}:
                                              </span>
                                              {"  "}
                                              <span className="">
                                                {item.description}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </TableCell>
                              </TableRow>
                            )}
                        </Fragment>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="saftyRequirements">
            <Card>
              <CardHeader>
                <CardTitle className="w-full py-2 my-8 text-2xl font-bold text-center rounded-md bg-border">
                  Safty Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-20 md:table-cell">
                        Standard
                      </TableHead>
                      <TableHead className="hidden w-20 md:table-cell">
                        Item
                      </TableHead>
                      <TableHead>Technical Requirements</TableHead>
                      <TableHead className="w-16">Result</TableHead>
                      <TableHead className="w-8">More</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorizedVisualInspectionData.saftyRequirements.map(
                      (item) => (
                        <Fragment key={item.name}>
                          <TableRow key={item.name}>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.standard}
                            </TableCell>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.item}
                            </TableCell>
                            <TableCell className={cn("capitalize")}>
                              {item.technicalRequirements}
                            </TableCell>
                            <TableCell className={cn()}>
                              <FormField
                                key={item.name}
                                control={form.control}
                                //@ts-ignore
                                name={item.name as string}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value as string}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue
                                            placeholder={item.placeholder}
                                          />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value={"PASS"}>
                                          PASS
                                        </SelectItem>
                                        <SelectItem value={"FAIL"}>
                                          FAIL
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell />
                          </TableRow>
                          {item.itemsToCheck &&
                            item.itemsToCheck.length > 0 && (
                              <TableRow className="relative border-none">
                                <TableCell colSpan={5} className="p-0 m-0">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem
                                      value={item.name}
                                      className="border-b-0"
                                    >
                                      <AccordionTrigger className="absolute p-0 right-4 -top-12 " />

                                      <AccordionContent className="p-4 pl-8">
                                        <ul className="space-y-2 ">
                                          {item.itemsToCheck?.map((item) => (
                                            <li
                                              key={item.id}
                                              className="text-muted-foreground"
                                            >
                                              <span className="font-medium ">
                                                {item.no}:
                                              </span>
                                              {"  "}
                                              <span className="">
                                                {item.description}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </TableCell>
                              </TableRow>
                            )}
                        </Fragment>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="modernSystems">
            <Card>
              <CardHeader>
                <CardTitle className="w-full py-2 my-8 text-2xl font-bold text-center rounded-md bg-border">
                  Modern Systems
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-20 md:table-cell">
                        Standard
                      </TableHead>
                      <TableHead className="hidden w-20 md:table-cell">
                        Item
                      </TableHead>
                      <TableHead>Technical Requirements</TableHead>
                      <TableHead className="w-16">Result</TableHead>
                      <TableHead className="w-8">More</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorizedVisualInspectionData.modernSystems.map(
                      (item) => (
                        <Fragment key={item.name}>
                          <TableRow key={item.name}>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.standard}
                            </TableCell>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.item}
                            </TableCell>
                            <TableCell className={cn("capitalize")}>
                              {item.technicalRequirements}
                            </TableCell>
                            <TableCell className={cn()}>
                              <FormField
                                key={item.name}
                                control={form.control}
                                //@ts-ignore
                                name={item.name as string}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value as string}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue
                                            placeholder={item.placeholder}
                                          />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value={"PASS"}>
                                          PASS
                                        </SelectItem>
                                        <SelectItem value={"FAIL"}>
                                          FAIL
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell />
                          </TableRow>
                          {item.itemsToCheck &&
                            item.itemsToCheck.length > 0 && (
                              <TableRow className="relative border-none">
                                <TableCell colSpan={5} className="p-0 m-0">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem
                                      value={item.name}
                                      className="border-b-0"
                                    >
                                      <AccordionTrigger className="absolute p-0 right-4 -top-12 " />

                                      <AccordionContent className="p-4 pl-8">
                                        <ul className="space-y-2 ">
                                          {item.itemsToCheck?.map((item) => (
                                            <li
                                              key={item.id}
                                              className="text-muted-foreground"
                                            >
                                              <span className="font-medium ">
                                                {item.no}:
                                              </span>
                                              {"  "}
                                              <span className="">
                                                {item.description}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </TableCell>
                              </TableRow>
                            )}
                        </Fragment>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="fuelEconomy">
            <Card>
              <CardHeader>
                <CardTitle className="w-full py-2 my-8 text-2xl font-bold text-center rounded-md bg-border">
                  Fuel Economy
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-20 md:table-cell">
                        Standard
                      </TableHead>
                      <TableHead className="hidden w-20 md:table-cell">
                        Item
                      </TableHead>
                      <TableHead>Technical Requirements</TableHead>
                      <TableHead className="w-16">Result</TableHead>
                      <TableHead className="w-8">More</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorizedVisualInspectionData.fuelEconomy.map((item) => (
                      <Fragment key={item.name}>
                        <TableRow key={item.name}>
                          <TableCell
                            className={cn("hidden font-medium md:table-cell")}
                          >
                            {item.standard}
                          </TableCell>
                          <TableCell
                            className={cn("hidden font-medium md:table-cell")}
                          >
                            {item.item}
                          </TableCell>
                          <TableCell className={cn("capitalize")}>
                            {item.technicalRequirements}
                          </TableCell>
                          <TableCell className={cn()}>
                            <FormField
                              key={item.name}
                              control={form.control}
                              //@ts-ignore
                              name={item.name as string}
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value as string}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue
                                          placeholder={item.placeholder}
                                        />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value={"PASS"}>
                                        PASS
                                      </SelectItem>
                                      <SelectItem value={"FAIL"}>
                                        FAIL
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell />
                        </TableRow>
                        {item.itemsToCheck && item.itemsToCheck.length > 0 && (
                          <TableRow className="relative border-none">
                            <TableCell colSpan={5} className="p-0 m-0">
                              <Accordion type="single" collapsible>
                                <AccordionItem
                                  value={item.name}
                                  className="border-b-0"
                                >
                                  <AccordionTrigger className="absolute p-0 right-4 -top-12 " />

                                  <AccordionContent className="p-4 pl-8">
                                    <ul className="space-y-2 ">
                                      {item.itemsToCheck?.map((item) => (
                                        <li
                                          key={item.id}
                                          className="text-muted-foreground"
                                        >
                                          <span className="font-medium ">
                                            {item.no}:
                                          </span>
                                          {"  "}
                                          <span className="">
                                            {item.description}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="otherRequierments">
            <Card>
              <CardHeader>
                <CardTitle className="w-full py-2 my-8 text-2xl font-bold text-center rounded-md bg-border">
                  Other Requierments
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-20 md:table-cell">
                        Standard
                      </TableHead>
                      <TableHead className="hidden w-20 md:table-cell">
                        Item
                      </TableHead>
                      <TableHead>Technical Requirements</TableHead>
                      <TableHead className="w-16">Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorizedVisualInspectionData.otherRequierments.map(
                      (item) => (
                        <Fragment key={item.name}>
                          <TableRow key={item.name}>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.standard}
                            </TableCell>
                            <TableCell
                              className={cn("hidden font-medium md:table-cell")}
                            >
                              {item.item}
                            </TableCell>
                            <TableCell className={cn("capitalize")}>
                              {item.technicalRequirements}
                            </TableCell>
                            <TableCell className={cn()}>
                              <FormField
                                key={item.name}
                                control={form.control}
                                //@ts-ignore
                                name={item.name as string}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value as string}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue
                                            placeholder={item.placeholder}
                                          />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value={"PASS"}>
                                          PASS
                                        </SelectItem>
                                        <SelectItem value={"FAIL"}>
                                          FAIL
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default VisualInspectionUpateForm;
