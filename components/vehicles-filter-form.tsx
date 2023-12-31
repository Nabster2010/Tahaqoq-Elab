"use client";
import React from "react";
import { removeEmptyStrings } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PageSearchParams, VehiclesFilterProps } from "@/types";
import { defaultConfig } from "next/dist/server/config-shared";

const VehiclesFilterForm = () => {
  const defaultFilter = {
    searchBy: "id",
    search: "",
    sortby: "id",
    order: "desc",
    pageSize: "10",
    from: "",
    to: "",
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterValuesFromUrl = searchParams
    ? Object.fromEntries(searchParams)
    : (defaultConfig as PageSearchParams & VehiclesFilterProps);
  const [filter, setFilter] = React.useState({
    searchBy: filterValuesFromUrl.searchBy || "id",
    search: filterValuesFromUrl.search
      ? decodeURIComponent(filterValuesFromUrl.search)
      : "",
    sortby: filterValuesFromUrl.sortby || "id",
    order: filterValuesFromUrl.order || "desc",
    pageSize: filterValuesFromUrl.pageSize || "10",
    from: filterValuesFromUrl.from || "",
    to: filterValuesFromUrl.to || "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/vehicles?${new URLSearchParams(
        removeEmptyStrings({
          ...filter,
          search: encodeURIComponent(filter.search.trim() as string),
        }) as PageSearchParams & VehiclesFilterProps
      ).toString()}`
    );
  };
  const resetForm = () => {
    setFilter(defaultFilter);
    router.replace(`/vehicles`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 lg:items-end lg:flex-row">
        <div className="flex flex-col grow ">
          <Label htmlFor="search" variant={"optional"} className="mb-2">
            Search:{" "}
          </Label>
          <div className="flex rounded-md focus-within:ring-2 ring-ring ring-offset-2 ring-offset-background ">
            <div className="relative flex-1 ">
              <Icons.search className="absolute w-6 h-6 text-muted-foreground top-2 bottom-2 left-2" />

              <Input
                id="search"
                type={"search"}
                onChange={handleChange}
                value={filter.search}
                name="search"
                placeholder={"Search"}
                className="pl-10 rounded-r-none outline-none ring-0 focus-visible:ring-0"
              />
            </div>
            <div className="flex items-end ">
              <Select
                name="searchBy"
                value={filter.searchBy}
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, searchBy: value }))
                }
              >
                <SelectTrigger
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "min-w-[120px] rounded-l-none focus-visible:ring-0 focus:ring-0 "
                  )}
                >
                  <SelectValue placeholder="Search by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Vehicle No</SelectItem>
                  <SelectItem value="reqNo">Request No</SelectItem>
                  <SelectItem defaultChecked value="bayanNo">
                    Bayan No
                  </SelectItem>
                  <SelectItem value="vin">Vin</SelectItem>
                  <SelectItem value="port">Port</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="broker">Broker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-end space-x-2">
          <div className="flex-1 ">
            <Label htmlFor="from" variant={"optional"}>
              Date From:
            </Label>

            <Input
              id="from"
              className="lg:max-w-[130px] "
              onChange={handleChange}
              value={filter.from}
              type={"date"}
              name="from"
              placeholder={"From"}
            />
          </div>
          <div className="flex-1 ">
            <Label htmlFor="to" variant={"optional"}>
              Date To:
            </Label>
            <Input
              id="to"
              onChange={handleChange}
              className="lg:max-w-[130px] "
              value={filter.to}
              type={"date"}
              name="to"
              placeholder={"to"}
            />
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="flex-1 ">
            <Label variant={"optional"}>Sort By:</Label>
            <Select
              name="sortby"
              value={filter.sortby}
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, sortby: value }))
              }
              defaultValue={String(filter.sortby)}
            >
              <SelectTrigger className="min-w-[110px]">
                <SelectValue placeholder="order by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">No</SelectItem>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="port">Port</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="broker">Broker</SelectItem>
                <SelectItem value="paymentType">Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label variant={"optional"}>Order:</Label>
            <Select
              name="order"
              value={filter.order}
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, order: value }))
              }
              defaultValue={String(filter.order)}
            >
              <SelectTrigger className="min-w-[80px]">
                <SelectValue placeholder="DESC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem defaultChecked value="desc">
                  DESC
                </SelectItem>
                <SelectItem value="asc">ASC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label className="whitespace-nowrap" variant={"optional"}>
              Page Size:
            </Label>
            <Select
              name="pageSize"
              value={filter.pageSize}
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, pageSize: value }))
              }
              defaultValue={String(filter.pageSize)}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Per Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem defaultChecked value="10">
                  {"10"}
                </SelectItem>
                <SelectItem value="20">{"20"}</SelectItem>
                <SelectItem value="50">{"50"}</SelectItem>
                <SelectItem value="100">{"100"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex ml-auto space-x-2 ">
          <Button title="Search" type="submit">
            Search
          </Button>
          <Button
            title="Clear Filters"
            variant="destructive"
            type="button"
            onClick={resetForm}
          >
            <Icons.close className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VehiclesFilterForm;
