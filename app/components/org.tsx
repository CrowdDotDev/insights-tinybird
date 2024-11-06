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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Counts } from "./counts";
import { StarsGraph } from "./starsGraph";

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

// Add this type definition
type Repo = {
  REPO_ID: number;
  REPO_NAME: string;
  ORG_NAME: string;
};

export default function Org({ name }: { name: string }) {
  const { start, end } = getDefaultDates();
  const [startDate, setStartDate] = React.useState<Date>(new Date(start));
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1); // yesterday

  // Add clear filters function
  const clearFilters = () => {
    setStartDate(new Date(start));
    setSelectedRepo("");
  };

  // Add this function to fetch repos
  const fetchRepos = async () => {
    const response = await fetch(
      `https://api.tinybird.co/v0/pipes/get_repos.json?org_name=${name}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data.data as Repo[];
  };

  useEffect(() => {
    fetchRepos().then(setRepos);
  }, []);

  return (
    <div className="">
      <div className="mb-4 flex items-center gap-2">
        <p className="">Start Date:</p>
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
        <p className="ml-4">Repository:</p>
        <Select value={selectedRepo} onValueChange={setSelectedRepo}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {repos.map((repo) => (
              <SelectItem key={repo.REPO_ID} value={repo.REPO_NAME}>
                {repo.REPO_NAME.replace(`${name}/`, "")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={clearFilters} className="ml-2">
          Clear
        </Button>
      </div>
      <div className="my-12">
        <Counts
          name={name}
          repo_name={selectedRepo || undefined}
          start_date={startDate.toISOString().split("T")[0]}
          end_date={end}
        />
        <ActiveContributors
          org_name={name}
          repo_name={selectedRepo || undefined}
          start_date={startDate.toISOString().split("T")[0]}
          end_date={end}
        />
        <ContributorDependency
          name={name}
          repo_name={selectedRepo || undefined}
          start_date={startDate.toISOString().split("T")[0]}
          end_date={end}
        />
        <StarsGraph
          org_name={name}
          repo_name={selectedRepo || undefined}
          start_date={startDate.toISOString().split("T")[0]}
          end_date={end}
        />
      </div>
    </div>
  );
}
