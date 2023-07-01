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
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import CustomerCreateModal from "./CustomerCreateModal";
import { ControllerRenderProps } from "react-hook-form";

export default function CustomerSelectComboBox({
  customers,
  field,
}: {
  customers: Customer[];
  field: ControllerRenderProps<
    {
      vin: string;
      reqNo: string;
      reqDate: string;
      bayanNo: string;
      bayanDate: string;
      port: string;
      paymentType: string;
      price: number;
      tax: number;
      customerId: string;
    },
    "customerId"
  >;
}) {
  const [popOverOpen, setPopOverOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [name, setName] = React.useState(
    () => customers.find((c) => c.id === field.value)?.name ?? ""
  );
  const [inputValue, setInputValue] = React.useState("");

  const afterSaveCb = (newCustomer: Customer) => {
    field.onChange(newCustomer.id);
    setName(newCustomer.name);
    setDialogOpen(false);
  };

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
        <PopoverTrigger asChild className="flex w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={popOverOpen}
            className="justify-between "
          >
            {name ? <span>{name}</span> : "Select Customer..."}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit ">
          <Command>
            <CommandInput
              onValueChange={(search) => setInputValue(search)}
              placeholder="Search Customer..."
            />
            <CommandEmpty className="flex flex-col items-center justify-center gap-2 mt-2 ">
              <span className="text-sm text-muted-foreground">
                No Customer found.
              </span>
              <DialogTrigger asChild>
                <Button size={"sm"} className="w-full">
                  Add Customer
                </Button>
              </DialogTrigger>
            </CommandEmpty>

            <CommandGroup className="overflow-scroll max-h-64">
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  onSelect={(currentValue) => {
                    field.onChange(customer.id);
                    setName(currentValue === name ? "" : currentValue);
                    setPopOverOpen(false);
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
      <DialogContent className="sm:max-w-3xl">
        <CustomerCreateModal cb={afterSaveCb} name={inputValue} />
      </DialogContent>
    </Dialog>
  );
}
