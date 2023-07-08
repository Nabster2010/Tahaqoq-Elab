"use client";
import { removeEmptyStrings } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import React from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const defaultFilter = {
  search: "",
  sortby: "id",
  order: "desc",
  from: "",
  to: "",
};

const VehiclesFilterForm = () => {
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 lg:items-end lg:justify-start lg:flex-row"
    >
      <div className="flex-1 space-y-2 ">
        <Label htmlFor="search" variant={"optional"}>
          Search:{" "}
          <span className="text-xs text-muted-foreground">
            {" "}
            Vehicle No & Customer Name{" "}
          </span>
        </Label>
        <Input
          id="search"
          type={"search"}
          onChange={handleChange}
          value={filter.search}
          name="search"
          placeholder={"Search"}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1 space-y-2 ">
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
        <div className="flex-1 space-y-2 ">
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
      <div className="flex gap-2 ">
        <div className="flex-1 space-y-2 ">
          <Label variant={"optional"}>Sort By:</Label>
          <Select
            name="sortby"
            onValueChange={(value) =>
              setFilter((prev) => ({ ...prev, sortby: value }))
            }
            defaultValue={String(filter.sortby)}
          >
            <SelectTrigger className="lg:w-[150px]">
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
        <div className="flex-1 space-y-2 ">
          <Label variant={"optional"}>Order:</Label>

          <Select
            name="order"
            onValueChange={(value) =>
              setFilter((prev) => ({ ...prev, order: value }))
            }
            defaultValue={String(filter.order)}
          >
            <SelectTrigger className="lg:w-[100px]">
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
      <div className="flex gap-2 ml-auto">
        <Button type="submit">
          <Icons.filter className="w-6 h-6" />
        </Button>
        <Button onClick={clearFilter} variant="destructive">
          <Icons.close className="w-6 h-6 " />
        </Button>
      </div>
    </form>
  );
};

export default VehiclesFilterForm;
