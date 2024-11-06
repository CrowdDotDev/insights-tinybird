"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ActiveContributors } from "./activeContributors";
import { ContributorDependency } from "./contributorDependency";
import * as React from "react";

// Get default dates
const getDefaultDates = () => {
  const end = new Date();
  end.setDate(end.getDate() - 1); // yesterday
  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 1); // 1 year ago
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
  };
};

export default function Org({ name }: { name: string }) {
  const { start, end } = getDefaultDates();
  const [startDate, setStartDate] = React.useState<Date>(new Date(start));
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1); // yesterday

  return (
    <div className="">
      <div className="mb-4 flex items-center gap-2">
        <p className="">Start Date</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => date && setStartDate(date)}
              defaultMonth={startDate}
              disabled={{ after: endDate }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <h2 className="text-xl font-bold mt-6 mb-2">Active Contributors</h2>
      <ActiveContributors
        org_name={name}
        start_date={startDate.toISOString().split("T")[0]}
        end_date={end}
      />
      <ContributorDependency
        name={name}
        start_date={startDate.toISOString().split("T")[0]}
        end_date={end}
      />
    </div>
  );
}
