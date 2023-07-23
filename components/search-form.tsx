"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchForm = () => {
  const path = usePathname();
  const router = useRouter();
  const [search, setSearch] = React.useState("");

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col flex-1 gap-4 md:max-w-md md:flex-row "
    >
      <Input
        id="search"
        type={"text"}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        name="search"
        placeholder={"Search ..."}
      />

      <div className="flex gap-2 ml-auto">
        <Button type="submit">
          <Icons.search className="w-6 h-6" />
        </Button>
        <Button onClick={clearFilter} variant="destructive">
          <Icons.close className="w-6 h-6 " />
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
