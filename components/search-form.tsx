"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";

const SearchForm = () => {
  const path = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();
  const [search, setSearch] = React.useState(
    decodeURIComponent(searchParams?.get("search") ?? "")
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedSearch = encodeURIComponent(search.trim() as string);

    router.push(`${path}?${new URLSearchParams({ search: encodedSearch })}`);
  };
  const clearFilter = () => {
    setSearch("");
    router.push(path || "/");
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-1 gap-2">
      <div className="relative w-full md:w-auto">
        <Icons.search className="absolute w-6 h-6 text-muted-foreground top-2 bottom-2 left-2" />
        <Input
          id="search"
          type={"text"}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="block w-full pl-10 md:w-[400px]"
          name="search"
          placeholder={"Search ..."}
        />
        <Button
          className={cn(
            "opacity-0 transition-opacity duration-300 absolute h-8 px-2 py-2 top-1 bottom-1 right-1",
            search && "opacity-100"
          )}
          onClick={clearFilter}
          variant="destructive"
          size="sm"
        >
          <Icons.close className="w-5 h-4 " />
        </Button>
      </div>

      <Button variant={"secondary"} type="submit">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
