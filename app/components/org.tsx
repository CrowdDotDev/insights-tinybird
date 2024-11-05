"use client";

import { BarChart } from "@tinybirdco/charts";
import { ActiveContributors } from "./activeContributors";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Org({ name }: { name: string }) {
  const [dependencyPercent, setDependencyPercent] = useState<number | null>(
    null
  );
  const [topContributors, setTopContributors] = useState<
    { login: string; avatar: string; commit_count: number }[]
  >([]);
  const [remainingContributors, setRemainingContributors] = useState<
    { login: string; avatar: string; commit_count: number }[]
  >([]);

  const [activeTab, setActiveTab] = useState("top");

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
          `https://api.tinybird.co/v0/pipes/top_n_contributors.json?number_of_contributors=${percent}&org_name=${name}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}`,
            },
          }
        );
        const contributorsData = await contributorsResponse.json();
        const logins = contributorsData.data.map(
          (contributor: {
            ACTOR_LOGIN: string;
            ACTOR_AVATAR_URL: string;
            commit_count: number;
          }) => ({
            login: contributor.ACTOR_LOGIN,
            avatar: contributor.ACTOR_AVATAR_URL,
            commit_count: contributor.commit_count,
          })
        );
        setTopContributors(logins);

        const remainingResponse = await fetch(
          `https://api.tinybird.co/v0/pipes/contributors_after_n.json?offset=${percent}&limit=${25}&org_name=${name}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}`,
            },
          }
        );
        const remainingData = await remainingResponse.json();
        const remainingLogins = remainingData.data.map(
          (contributor: {
            ACTOR_LOGIN: string;
            ACTOR_AVATAR_URL: string;
            commit_count: number;
          }) => ({
            login: contributor.ACTOR_LOGIN,
            avatar: contributor.ACTOR_AVATAR_URL,
            commit_count: contributor.commit_count,
          })
        );
        setRemainingContributors(remainingLogins);
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
          <div className="mt-10">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("top")}
                  className={`${
                    activeTab === "top"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                >
                  Top Contributors
                </button>
                <button
                  onClick={() => setActiveTab("other")}
                  className={`${
                    activeTab === "other"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                >
                  Other Contributors
                </button>
              </nav>
            </div>

            <div className="mt-4">
              {activeTab === "top" && (
                <div className="list-disc pl-6">
                  {topContributors.map((person) => (
                    <a
                      href={`https://github.com/${person.login}`}
                      key={person.login}
                      className="flex items-center gap-2 py-2 hover:bg-gray-50"
                    >
                      <Avatar>
                        <AvatarImage src={person.avatar} alt={person.login} />
                        <AvatarFallback>{person.login[0]}</AvatarFallback>
                      </Avatar>
                      <span>{person.login}</span>
                      <span className="text-gray-500">
                        ({person.commit_count} contributions)
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {activeTab === "other" && (
                <div className="list-disc pl-6">
                  {remainingContributors.map((person) => (
                    <a
                      href={`https://github.com/${person.login}`}
                      key={person.login}
                      className="flex items-center gap-2 py-2 hover:bg-gray-50"
                    >
                      <Avatar>
                        <AvatarImage src={person.avatar} alt={person.login} />
                        <AvatarFallback>{person.login[0]}</AvatarFallback>
                      </Avatar>
                      <span>{person.login}</span>
                      <span className="text-gray-500">
                        ({person.commit_count} contributions)
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
