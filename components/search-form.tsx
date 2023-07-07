"use client";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchForm = () => {
  return (
    <form className="flex gap-2">
      <Input id="search" type={"search"} name="search" placeholder={"Search"} />
      <Button type="submit" variant={"secondary"}>
        <Icons.search className="w-6 h-6" />
      </Button>
    </form>
  );
};

export default SearchForm;
