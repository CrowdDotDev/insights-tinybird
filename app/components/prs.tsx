"use client";

import { TimeToClosePRGraph } from "./timeToClosePRGraph";

export function PRs(params: {
  org_name?: string;
  repo_name?: string;
  timeframe?: string;
  start_date: string;
  end_date: string;
}) {
  return (
    <div className="mt-12 mb-12">
      <h2 className="text-xl font-bold mb-2">Pull Requests</h2>
      <TimeToClosePRGraph
        org_name={params.org_name}
        repo_name={params.repo_name}
        timeframe={params.timeframe}
        start_date={params.start_date}
        end_date={params.end_date}
      />
    </div>
  );
}
