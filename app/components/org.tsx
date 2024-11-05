"use client";

import { BarChart } from "@tinybirdco/charts";
import { ActiveContributors } from "./activeContributors";
import { useState, useEffect } from "react";

export default function Org({ name }: { name: string }) {
  const [dependencyPercent, setDependencyPercent] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchDependencyData = async () => {
      try {
        const response = await fetch(
          `https://api.tinybird.co/v0/pipes/top_51.json?org_name=${name}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setDependencyPercent(data.data[0]["contributors_for_51_percent"]);
      } catch (error) {
        console.error("Error fetching dependency data:", error);
      }
    };

    fetchDependencyData();
  }, [name]);

  return (
    <div className="">
      <h2 className="text-xl font-bold mt-6 mb-2">Active Contributors</h2>
      <ActiveContributors org_name={name} />

      <h2 className="text-xl font-bold mt-10 mb-2">Contributor Dependency</h2>
      {dependencyPercent !== null ? (
        <p>
          51% of the code contributions are done by {dependencyPercent} people.
        </p>
      ) : (
        <p>Loading dependency data...</p>
      )}
    </div>
  );
}
