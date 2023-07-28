import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const DatePicker = ({ field }: any) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? format(field.value, "P") : <span>Pick a date</span>}
            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
