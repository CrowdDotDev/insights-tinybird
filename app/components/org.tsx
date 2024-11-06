"use client";

import { ActiveContributors } from "./activeContributors";
import { ContributorDependency } from "./contributorDependency";

// Get default dates
const getDefaultDates = () => {
  const end = new Date();
  end.setDate(end.getDate() - 1); // yesterday
  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 1); // 1 year ago
  return { 
    start: start.toISOString().split('T')[0], 
    end: end.toISOString().split('T')[0] 
  };
};

export default function Org({ name }: { name: string }) {
  const { start, end } = getDefaultDates();
  
  return (
    <div className="">
      <h2 className="text-xl font-bold mt-6 mb-2">Active Contributors</h2>
      <ActiveContributors org_name={name} start_date={start} end_date={end} />
      <ContributorDependency name={name} start_date={start} end_date={end} />
    </div>
  );
}
