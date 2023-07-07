"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
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

const FilterForm = () => {
  return (
    <form className="flex flex-col gap-4 lg:items-end lg:justify-start lg:flex-row">
      <div className="flex-1 space-y-2">
        <Label htmlFor="search" variant={"optional"}>
          Search:
        </Label>
        <Input
          id="search"
          type={"search"}
          name="search"
          placeholder={"Search"}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="from" variant={"optional"}>
            Date From:
          </Label>
          <Input id="from" type={"date"} name="from" placeholder={"From"} />
        </div>
        <div className="flex-1">
          <Label htmlFor="to" variant={"optional"}>
            Date To:
          </Label>
          <Input id="to" type={"date"} name="to" placeholder={"to"} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label variant={"optional"}>Sort By:</Label>
          <Select name="sortby">
            <SelectTrigger className="lg:w-[150px]">
              <SelectValue placeholder="order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">NO</SelectItem>
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

          <Select defaultValue="desc" name="order">
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
        <Link href={"/vehicles"} className={cn(buttonVariants({}))}>
          Clear
        </Link>
      </div>
    </form>
  );
};

export default FilterForm;
