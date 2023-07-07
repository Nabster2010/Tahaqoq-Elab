"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const FilterForm = () => {
  return (
    <form className="flex flex-col gap-4 md:flex-row">
      <div className="flex items-center flex-1 gap-4">
        <Input type={"search"} name="search" placeholder={"Search"} />
        <Input type={"date"} name="from" placeholder={"From"} />
        <Input type={"date"} name="to" placeholder={"To"} />
      </div>
      <div className="flex items-center gap-4">
        <Select name="sortby">
          <SelectTrigger className="w-[150px]">
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
        <Select defaultValue="desc" name="order">
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="DESC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem defaultChecked value="desc">
              DESC
            </SelectItem>
            <SelectItem value="asc">ASC</SelectItem>
          </SelectContent>
        </Select>
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
