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

const VehiclesFilterForm = () => {
  const searchParams = useSearchParams();

  const defaultFilter = {
    searchBy: searchParams.get("searchBy") || "id",
    search: searchParams.get("search") || "",
    sortby: searchParams.get("sortby") || "id",
    order: searchParams.get("order") || "desc",
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
  };
  const router = useRouter();
  const [filter, setFilter] = React.useState(defaultFilter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/vehicles?${new URLSearchParams(
        removeEmptyStrings(filter) as any
      ).toString()}`
    );
  };
  const clearFilter = () => {
    setFilter(defaultFilter);
    router.push(`/vehicles`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 lg:items-end lg:flex-row">
        <div className="flex flex-col grow ">
          <Label htmlFor="search" variant={"optional"} className="mb-2">
            Search:{" "}
          </Label>
          <div className="flex rounded-md focus-within:ring-2 ring-ring ring-offset-2 ring-offset-background ">
            <div className="flex-1 ">
              <Input
                id="search"
                type={"search"}
                onChange={handleChange}
                value={filter.search}
                name="search"
                placeholder={"Search"}
                className="border-collapse rounded-r-none focus-visible:ring-0 "
              />
            </div>
            <div className="flex items-end ">
              <Select
                name="searchBy"
                onValueChange={(value) =>
                  setFilter((prev) => ({ ...prev, searchBy: value }))
                }
                defaultValue={String(filter.searchBy) || "id"}
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
                  <SelectItem value="bayanNo">Bayan No</SelectItem>
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
              value={filter.to}
              type={"date"}
              name="to"
              placeholder={"to"}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex-1 ">
            <Label variant={"optional"}>Sort By:</Label>
            <Select
              name="sortby"
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, sortby: value }))
              }
              defaultValue={String(filter.sortby)}
            >
              <SelectTrigger className="min-w-[120px]">
                <SelectValue placeholder="order by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Vehicle No</SelectItem>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="port">Port</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="broker">Broker</SelectItem>
                <SelectItem value="paymentType">Payment Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label variant={"optional"}>Order:</Label>
            <Select
              name="order"
              onValueChange={(value) =>
                setFilter((prev) => ({ ...prev, order: value }))
              }
              defaultValue={String(filter.order)}
            >
              <SelectTrigger className="">
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
        </div>

        <div className="flex ml-auto space-x-2 ">
          <Button type="submit">
            <Icons.search className="w-6 h-6" />
          </Button>
          <Button onClick={clearFilter} variant="destructive">
            <span>CLEAR</span>
            <Icons.close className="w-4 h-4 ml-2 " />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VehiclesFilterForm;
