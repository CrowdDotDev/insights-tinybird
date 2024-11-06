"use client";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

export function ContributorCount({
  name,
  repo_name,
  start_date,
  end_date,
}: {
  name: string;
  start_date: string;
  end_date: string;
  repo_name?: string;
}) {
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [previousCount, setPreviousCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      // Calculate previous period dates
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const periodDiff = endDate.getTime() - startDate.getTime();
      const previousStart = new Date(startDate.getTime() - periodDiff);
      const previousEnd = new Date(endDate.getTime() - periodDiff);

      // Fetch current period
      const currentResponse = await fetch(
        `https://api.tinybird.co/v0/pipes/total_contributors.json?name=${name}&start_date=${start_date}&end_date=${end_date}${
          repo_name ? `&repo_name=${repo_name}` : ""
        }`,
        {
          headers: {
            Authorization:
              "Bearer p.eyJ1IjogIjAzZDRiNDAxLWY5ZjgtNGM2ZS04MjBlLTgxZWU5ZWNlN2M4NyIsICJpZCI6ICJkNzQzNjNkNi02MWFjLTQ2NDQtYTI0OC1mOGE0YWMwZmRhNTIiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.mLKLtuNzffHRpfODI9bQfam6U_bo4RPYhAY8MC2PIkk",
          },
        }
      );

      // Fetch previous period
      const previousResponse = await fetch(
        `https://api.tinybird.co/v0/pipes/total_contributors.json?name=${name}&start_date=${
          previousStart.toISOString().split("T")[0]
        }&end_date=${previousEnd.toISOString().split("T")[0]}${
          repo_name ? `&repo_name=${repo_name}` : ""
        }`,
        {
          headers: {
            Authorization:
              "Bearer p.eyJ1IjogIjAzZDRiNDAxLWY5ZjgtNGM2ZS04MjBlLTgxZWU5ZWNlN2M4NyIsICJpZCI6ICJkNzQzNjNkNi02MWFjLTQ2NDQtYTI0OC1mOGE0YWMwZmRhNTIiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.mLKLtuNzffHRpfODI9bQfam6U_bo4RPYhAY8MC2PIkk",
          },
        }
      );

      const currentData = await currentResponse.json();
      const previousData = await previousResponse.json();

      setCurrentCount(currentData.data[0].total);
      setPreviousCount(previousData.data[0].total);
    };

    fetchCounts();
  }, [name, repo_name, start_date, end_date]);

  const percentageChange =
    previousCount === 0
      ? 100
      : ((currentCount - previousCount) / previousCount) * 100;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Contributors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">{currentCount}</div>
          <div
            className={`text-sm ${
              percentageChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {percentageChange >= 0 ? "↑" : "↓"}{" "}
            {Math.abs(percentageChange).toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
