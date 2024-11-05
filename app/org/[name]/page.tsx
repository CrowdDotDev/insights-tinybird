import Org from "@/app/components/org";

export default async function OrgPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <Org name={name} />
    </div>
  );
}
