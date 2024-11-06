import { ContributorCount } from "./contributorCount";

export function Counts({
  name,
  repo_name,
  start_date,
  end_date,
}: {
  name: string;
  repo_name?: string;
  start_date: string;
  end_date: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ContributorCount
        name={name}
        repo_name={repo_name}
        start_date={start_date}
        end_date={end_date}
      />
      <ContributorCount
        name={name}
        repo_name={repo_name}
        start_date={start_date}
        end_date={end_date}
      />
      <ContributorCount
        name={name}
        repo_name={repo_name}
        start_date={start_date}
        end_date={end_date}
      />
    </div>
  );
}
