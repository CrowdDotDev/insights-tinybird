import { BarChart } from "@tinybirdco/charts";
import { ActiveContributors } from "./activeContributors";

export default function Org({ name }: { name: string }) {
  return (
    <div className="">
      <h2 className="text-xl font-bold mt-6 mb-2">Contributors</h2>
      <ActiveContributors org_name={name} />
    </div>
  );
}
