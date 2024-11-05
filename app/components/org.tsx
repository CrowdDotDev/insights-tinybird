"use client";

import { BarChart } from "@tinybirdco/charts";
import { ActiveContributors } from "./activeContributors";
import { useState, useEffect } from "react";

export default function Org({ name }: { name: string }) {
  const [dependencyPercent, setDependencyPercent] = useState<number | null>(
    null
  );
  const [topContributors, setTopContributors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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
        const percent = data.data[0]["contributors_for_51_percent"];
        setDependencyPercent(percent);

        const contributorsResponse = await fetch(
          `https://api.tinybird.co/v0/pipes/top_n_contributors.json?n=${percent}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}`,
            },
          }
        );
        const contributorsData = await contributorsResponse.json();
        const logins = contributorsData.data.map(
          (contributor: { ACTOR_LOGIN: string }) => contributor.ACTOR_LOGIN
        );
        setTopContributors(logins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div className="">
      <h2 className="text-xl font-bold mt-6 mb-2">Active Contributors</h2>
      <ActiveContributors org_name={name} />

      <h2 className="text-xl font-bold mt-10 mb-2">Contributor Dependency</h2>
      {dependencyPercent !== null ? (
        <div>
          <p>
            51% of the code contributions are done by {dependencyPercent}{" "}
            people:
          </p>
          <ul className="list-disc pl-6 mt-2">
            {topContributors.map((login) => (
              <li key={login}>{login}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading dependency data...</p>
      )}
    </div>
  );
}
