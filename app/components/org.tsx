"use client";

import { ActiveContributors } from "./activeContributors";
import { ContributorDependency } from "./contributorDependency";

export default function Org({ name }: { name: string }) {
  return (
    <div className="">
      <h2 className="text-xl font-bold mt-6 mb-2">Active Contributors</h2>
      <ActiveContributors org_name={name} />
      <ContributorDependency name={name} />
    </div>
  );
}
