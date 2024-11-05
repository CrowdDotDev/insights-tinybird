"use client";

import { BarChart } from "@tinybirdco/charts";

export function ActiveContributors(params: {
  org_name?: string;
  repo_name?: string;
  timeframe?: string;
}) {
  return (
    <BarChart
      endpoint="https://api.tinybird.co/v0/pipes/active_contributors.json"
      token={process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}
      index="period"
      categories={["contributor_count"]}
      colorPalette={[
        "#27F795",
        "#037D5F",
        "#12C7D1",
        "#9263AF",
        "#5A6FC0",
        "#86BFDB",
        "#FFC145",
        "#FF6B6C",
        "#DC82C8",
        "#BE5EA9",
      ]}
      height="500px"
      params={params}
    />
  );
}
