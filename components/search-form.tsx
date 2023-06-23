"use client";
import React from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type SearchFormProps = {
  action?: (data: FormData) => Promise<void> | void;
  defaultValue?: number | string;
  path?: string;
  searchParams: { [key: string]: string | undefined };
};
const SearchForm = ({ action, defaultValue }: SearchFormProps) => {
  return (
    <form
      // action={action}
      className="flex items-center w-full gap-2 md:max-w-lg"
    >
      <Input
        type={"search"}
        name="search"
        // defaultValue={defaultValue}
        placeholder={"Search"}
      />

      <Button variant={"secondary"} type={"submit"}>
        <Icons.search className="w-6 h-6" />
      </Button>
    </form>
  );
};

export default SearchForm;
