"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Customer } from "@prisma/client";

export default function CustomerSelectComboBox({
  customers,
  handleChange,
  defaultValue,
}: {
  customers: Customer[];
  handleChange: (id: Customer["id"]) => void;
  defaultValue?: Customer["id"];
}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(
    () => customers.find((c) => c.id === defaultValue)?.name ?? ""
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="flex w-full ">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between "
        >
          {name ? <span>{name}</span> : "Select Customer..."}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Command>
          <CommandInput placeholder="Search Customer..." />
          <CommandEmpty>No Customer found.</CommandEmpty>
          <CommandGroup>
            {customers.map((customer) => (
              <CommandItem
                key={customer.name}
                onSelect={(currentValue) => {
                  handleChange(customer.id);
                  setName(currentValue === name ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    name === customer.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {customer.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
