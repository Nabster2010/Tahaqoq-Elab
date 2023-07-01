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
import { ControllerRenderProps } from "react-hook-form";
import { ExtendedVehicleType } from "@/types";

export default function VehicleTypeSelectComboBox({
  vehicleTypes,
  field,
}: {
  vehicleTypes: ExtendedVehicleType[];
  field: ControllerRenderProps<
    {
      vehicleId: number;
      colorId: string;
      year: string;
      vehicleTypeId: string;
      category: string;
      condition: string;
      fuelType: string;
      engine: string;
      engineSize: string;
      gear: string;
      mileage: string;
      seats: string;
      remarks: string;
    },
    "vehicleTypeId"
  >;
}) {
  const [popOverOpen, setPopOverOpen] = React.useState(false);
  const [modelType, setModelType] = React.useState(
    () => vehicleTypes.find((type) => type.id === field.value)?.modelType ?? ""
  );

  return (
    <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
      <PopoverTrigger asChild className="flex w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={popOverOpen}
          className="justify-between "
        >
          {modelType ? (
            <span className="uppercase">{modelType}</span>
          ) : (
            "Select ModelType..."
          )}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit ">
        <Command>
          <CommandInput placeholder="Search ModelType..." />
          <CommandEmpty className="flex flex-col items-center justify-center gap-2 mt-2 ">
            <span className="text-sm text-muted-foreground">
              No Model Type found.
            </span>
          </CommandEmpty>

          <CommandGroup className="overflow-scroll max-h-64">
            {vehicleTypes.map((type) => (
              <CommandItem
                key={type.id}
                value={type.modelType}
                onSelect={(currentValue) => {
                  field.onChange(type.id);
                  setModelType(currentValue === modelType ? "" : currentValue);
                  setPopOverOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    modelType === type.modelType ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex items-center justify-between flex-1">
                  <span className="">{type.modelType}</span>
                  <span className="py-1 px-1.5  ml-10 text-[10px] rounded-md bg-foreground text-background font-bold">
                    {type.manufacturer.name}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
