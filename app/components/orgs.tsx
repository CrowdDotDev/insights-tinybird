"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface OrgData {
  "o.ORG_NAME": string;
  commit_count: number;
  pr_count: number;
  lines_of_code: number;
}

interface ApiResponse {
  data: OrgData[];
}

export function Orgs() {
  const [orgs, setOrgs] = useState<OrgData[]>([]);

  useEffect(() => {
    async function fetchOrgs() {
      const response = await fetch(
        "https://api.tinybird.co/v0/pipes/get_orgs.json",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}`,
          },
        }
      );
      const data: ApiResponse = await response.json();
      setOrgs(data.data);
    }
    fetchOrgs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Organizations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orgs.map((org) => (
          <Card key={org["o.ORG_NAME"]} className="p-4">
            <h3 className="font-semibold text-lg mb-2">
              {org["o.ORG_NAME"].charAt(0).toUpperCase() +
                org["o.ORG_NAME"].slice(1)}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Commits:</span>
                <span>{org.commit_count.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">PRs:</span>
                <span>{org.pr_count.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lines of Code:</span>
                <span>{Math.abs(org.lines_of_code).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
